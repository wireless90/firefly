import { checkOrConnectLedger } from '@core/ledger'
import { isActiveLedgerProfile, isSoftwareProfile, ProfileType, UnableToFindProfileTypeError } from '@core/profile'
import { checkOrUnlockStronghold } from '@core/stronghold'
import { get } from 'svelte/store'

export type ProfileAuthCheckResult = Promise<unknown>

export type ProfileAuthCheckCallback = () => ProfileAuthCheckResult

export type ProfileAuthCheckFunction = (
    callback?: ProfileAuthCheckCallback,
    reopenPopup?: boolean
) => ProfileAuthCheckResult

export const DEFAULT_PROFILE_AUTH_CHECK_CALLBACK: ProfileAuthCheckCallback = async () => {}

export interface IProfileAuthCheckConfiguration {
    profileType: ProfileType
    callback?: ProfileAuthCheckCallback
    reopenPopup?: boolean
}

export function getAuthCheckFunction(profileType: ProfileType): ProfileAuthCheckFunction {
    switch (profileType) {
        case ProfileType.Ledger:
            return checkOrConnectLedger
        case ProfileType.Software:
            return checkOrUnlockStronghold
        default:
            return async () => {}
    }
}

export function checkActiveProfileAuthV2(config: IProfileAuthCheckConfiguration): ProfileAuthCheckResult {
    const { profileType, callback, reopenPopup } = deconstructProfileAuthCheckConfiguration(config)
    const authCheckFunction = getAuthCheckFunction(profileType)
    return authCheckFunction(callback, reopenPopup)
}

export function deconstructProfileAuthCheckConfiguration(
    config: IProfileAuthCheckConfiguration
): IProfileAuthCheckConfiguration {
    const profileType = config?.profileType
    if (profileType) {
        const callback = config?.callback ?? DEFAULT_PROFILE_AUTH_CHECK_CALLBACK
        const reopenPopup = false
        return {
            profileType,
            callback,
            reopenPopup,
        }
    } else {
        throw new UnableToFindProfileTypeError()
    }
}

export function checkActiveProfileAuth(
    callback: () => Promise<unknown> = async () => {},
    reopenPopup?: { stronghold?: boolean; ledger?: boolean }
): Promise<unknown> {
    if (get(isSoftwareProfile)) {
        return checkOrUnlockStronghold(callback, reopenPopup?.stronghold)
    } else if (get(isActiveLedgerProfile)) {
        return checkOrConnectLedger(callback, reopenPopup?.ledger)
    }
}
