import { Output, Subject } from '@core/wallet/types'
import { getSenderFromOutput } from '../outputs/getSenderFromOutput'

export function getSenderFromTransaction(isIncoming: boolean, accountAddress: string, output: Output): Subject {
    if (isIncoming) {
        return getSenderFromOutput(output) ?? { type: 'address', address: accountAddress }
    } else {
        return { type: 'address', address: accountAddress }
    }
}
