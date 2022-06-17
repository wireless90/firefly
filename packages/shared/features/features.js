import onboardingFeatures from './onboardingFeatures'
import settingsFeatures from './settingsFeatures'

const features = {
    onboarding: onboardingFeatures,
    settings: settingsFeatures,
    wallet: {
        enabled: true,
        accountSummaryAndAssets: {
            enabled: true,
        },
        activityHistory: {
            enabled: true,
            sync: {
                enabled: false,
            },
            search: {
                enabled: true,
            },
        },
        portfolioChart: {
            enabled: false,
        },
        activityChart: {
            enabled: false,
        },
    },
    staking: {
        enabled: false,
    },
    governance: {
        enabled: false,
    },
    collectibles: {
        enabled: false,
    },
}

export default features
