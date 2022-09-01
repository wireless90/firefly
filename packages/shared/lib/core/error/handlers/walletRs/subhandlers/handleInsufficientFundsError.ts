import { WALLET_RS_ERROR_PARAMETERS } from '../../../constants'
import { WalletRsError } from '../../../enums'
import { logAndNotifyError } from '../../../actions'

export function handleInsufficientFundsError(): void {
    const errorObject = WALLET_RS_ERROR_PARAMETERS?.[WalletRsError.InsufficientFunds]
    logAndNotifyError(errorObject)
}
