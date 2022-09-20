import { get } from 'svelte/store'

import { login, ProfileType, UnableToFindProfileSetupTypeError, UnableToFindProfileTypeError } from '@core/profile'

import { ProfileSetupType } from '../enums'
import { onboardingProfile } from '../stores'

import { addOnboardingProfile } from './addOnboardingProfile'
import { cleanupOnboarding } from './cleanupOnboarding'

export async function completeOnboardingProcess(): Promise<void> {
    addOnboardingProfile()

    const { setupType, type } = get(onboardingProfile)
    if (!setupType) {
        throw new UnableToFindProfileSetupTypeError()
    }

    if (!type) {
        throw new UnableToFindProfileTypeError()
    }

    const shouldRecoverAccounts = setupType === ProfileSetupType.Recovered
    const shouldCreateAccount = setupType === ProfileSetupType.New
    if (type === ProfileType.Ledger) {
        checkOnboardingProfileAuth()
        void login({ isFromOnboardingFlow: true, shouldRecoverAccounts, shouldCreateAccount })
    } else if (type === ProfileType.Software) {
        void login({ isFromOnboardingFlow: true, shouldRecoverAccounts, shouldCreateAccount })
    }

    await cleanupOnboarding()
}
