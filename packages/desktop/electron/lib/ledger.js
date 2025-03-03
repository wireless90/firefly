/**
 * The utility process for ledger runs in a Node.js environment,
 * meaning it has the ability to require modules and use all of Node.js APIs.
 * This approach doesn't block the main process when interacting with the ledger device.
 *
 * https://www.electronjs.org/docs/latest/tutorial/process-model#the-utility-process
 */

const TransportNodeHid = require('@ledgerhq/hw-transport-node-hid').default
const AppEth = require('@ledgerhq/hw-app-eth').default
const { listen } = require('@ledgerhq/logs')

const { RLP } = require('@ethereumjs/rlp')
const { Transaction } = require('@ethereumjs/tx')
const { bufArrToArr } = require('@ethereumjs/util')

let transport

process.parentPort.on('message', async (message) => {
    try {
        await openTransport()

        let data
        switch (message.data.method) {
            case 'generate-evm-address': {
                data = await getEvmAddress(...message.data.parameters)
                break
            }
            case 'sign-evm-transaction': {
                data = await signTransactionData(...message.data.parameters)
                break
            }
            default:
                break
        }

        await closeTransport()

        process.parentPort.postMessage({ data })
    } catch (error) {
        process.parentPort.postMessage({ error })
    }
})

async function openTransport() {
    if (!transport) {
        transport = await TransportNodeHid.open('')
        listen((log) => {
            process.parentPort.postMessage({ data: log })
        })
    }
}

async function closeTransport() {
    if (transport) {
        await transport.close()
        transport = undefined
    }
}

async function getEvmAddress(bip32Path, verify) {
    const appEth = new AppEth(transport)
    const data = await appEth.getAddress(bip32Path)

    return { evmAddress: data.address, bip32Path }
}

async function signTransactionData(data, bip32Path) {
    const appEth = new AppEth(transport)

    const unsignedTransactionObject = Transaction.fromTxData(data)
    const unsignedTransaction = unsignedTransactionObject.getMessageToSign(false)

    const serializedUnsignedTransaction = Buffer.from(RLP.encode(bufArrToArr(unsignedTransaction)))
    const signature = await appEth.signTransaction(bip32Path, serializedUnsignedTransaction, null)

    const signedTransactionObject = Transaction.fromTxData({
        ...data,
        v: '0x' + signature.v,
        r: '0x' + signature.r,
        s: '0x' + signature.s,
    })
    const serializedSignedTransaction = Buffer.from(RLP.encode(bufArrToArr(signedTransactionObject.raw())))
    const serializedSignedTransactionString = '0x' + serializedSignedTransaction.toString('hex')

    return { signedTransaction: serializedSignedTransactionString }
}
