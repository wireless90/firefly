/* eslint-disable no-console */

import { WebSocket } from 'ws'

function main() {
    const ws = connectToWebSocket()
    registerEventHandlers(ws)

    setTimeout(() => {
        ws.close()
        process.exit(0)
    }, 5000)
}

function connectToWebSocket() {
    return new WebSocket('ws://localhost:5052')
}

function registerEventHandlers(ws) {
    /**
     * Emitted when the connection is closed. The status is a code
     * explaining why the connection was closed.
     */
    ws.on('close', (status) => {
        console.log('[WebSocket Client] CLOSED')
        console.log('Status: ', status)
    })

    /**
     * Emitted when the connection is established.
     */
    ws.on('open', () => {
        console.log('[WebSocket Client] OPEN')
        ws.send(
            JSON.stringify({
                amount: 10,
                address: 'rms1qpgn2aelvx6qgxyvyyuvk5qrj6ps9mv7s5zlx5gygdzlgh7gpg3cwr536uv',
            })
        )
    })

    /**
     * Emitted when messages are sent from the server.
     */
    ws.on('message', (data, isBinary) => {
        console.log('[WebSocket Client] MESSAGE')
        console.log(isBinary, data, data.toString())
    })
}

main()
