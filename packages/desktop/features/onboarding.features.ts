import { IFeatureFlag } from './feature-flag.interface'

interface IOnboardingFeaturesForNetwork extends IFeatureFlag {
    newProfile: IFeatureFlag & {
        softwareProfile: IFeatureFlag
        ledgerProfile: IFeatureFlag
    }
    restoreProfile: IFeatureFlag & {
        recoveryPhrase: IFeatureFlag
        strongholdBackup: IFeatureFlag
        ledgerBackup: IFeatureFlag
    }
    claimRewards: IFeatureFlag & {
        recoveryPhrase: IFeatureFlag
        strongholdBackup: IFeatureFlag
        ledgerBackup: IFeatureFlag
    }
}

interface IOnboardingFeatures extends IFeatureFlag {
    iota: IOnboardingFeaturesForNetwork
    shimmer: IOnboardingFeaturesForNetwork
    testnet: IOnboardingFeaturesForNetwork
    custom: IOnboardingFeaturesForNetwork
    strongholdVersionCheck: IFeatureFlag
}

const onboardingFeatures: IOnboardingFeatures = {
    enabled: true,
    iota: {
        enabled: true,
        newProfile: {
            enabled: false,
            softwareProfile: {
                enabled: false,
            },
            ledgerProfile: {
                enabled: false,
            },
        },
        restoreProfile: {
            enabled: false,
            recoveryPhrase: {
                enabled: false,
            },
            strongholdBackup: {
                enabled: false,
            },
            ledgerBackup: {
                enabled: false,
            },
        },
        claimRewards: {
            enabled: false,
            hidden: true,
            recoveryPhrase: {
                enabled: false,
            },
            strongholdBackup: {
                enabled: false,
            },
            ledgerBackup: {
                enabled: false,
            },
        },
    },
    shimmer: {
        enabled: true,
        claimRewards: {
            enabled: true,
            hidden: false,
            recoveryPhrase: {
                enabled: true,
            },
            strongholdBackup: {
                enabled: true,
            },
            ledgerBackup: {
                enabled: true,
            },
        },
        newProfile: {
            enabled: true,
            softwareProfile: {
                enabled: true,
            },
            ledgerProfile: {
                enabled: true,
            },
        },
        restoreProfile: {
            enabled: true,
            recoveryPhrase: {
                enabled: true,
            },
            strongholdBackup: {
                enabled: true,
            },
            ledgerBackup: {
                enabled: true,
            },
        },
    },
    testnet: {
        enabled: true,
        claimRewards: {
            enabled: true,
            hidden: false,
            recoveryPhrase: {
                enabled: true,
            },
            strongholdBackup: {
                enabled: true,
            },
            ledgerBackup: {
                enabled: true,
            },
        },
        newProfile: {
            enabled: true,
            softwareProfile: {
                enabled: true,
            },
            ledgerProfile: {
                enabled: true,
            },
        },
        restoreProfile: {
            enabled: true,
            recoveryPhrase: {
                enabled: true,
            },
            strongholdBackup: {
                enabled: true,
            },
            ledgerBackup: {
                enabled: true,
            },
        },
    },
    custom: {
        enabled: true,
        claimRewards: {
            enabled: true,
            hidden: false,
            recoveryPhrase: {
                enabled: true,
            },
            strongholdBackup: {
                enabled: true,
            },
            ledgerBackup: {
                enabled: true,
            },
        },
        newProfile: {
            enabled: true,
            softwareProfile: {
                enabled: true,
            },
            ledgerProfile: {
                enabled: true,
            },
        },
        restoreProfile: {
            enabled: true,
            recoveryPhrase: {
                enabled: true,
            },
            strongholdBackup: {
                enabled: true,
            },
            ledgerBackup: {
                enabled: true,
            },
        },
    },
    strongholdVersionCheck: {
        enabled: false,
    },
}

export default onboardingFeatures
