import { IErrorParameters } from '../interfaces'

import { localize } from '@core/i18n'
import { showAppNotification } from '@lib/notifications'
import { addError } from '../stores'

export function logAndNotifyError(errorParameters: Partial<IErrorParameters>): void {
    const localisedMessage = errorParameters?.localizationKey
        ? localize(errorParameters?.localizationKey)
        : errorParameters?.message
        ? `Error: ${errorParameters.message}`
        : localize('error.global.generic')

    if (errorParameters?.logToConsole) {
        console.error(localisedMessage)
    }

    if (errorParameters?.saveToErrorLog) {
        addError(errorParameters)
    }

    if (errorParameters?.showNotification) {
        showAppNotification({
            alert: true,
            type: 'error',
            message: localisedMessage,
        })
    }
}
