export type AppTheme = 'light' | 'dark' | 'system'

export interface AppSettings {
    deepLinking: boolean
    language: string
    theme: AppTheme
    darkMode: boolean
    notifications: boolean
    sendCrashReports: boolean
}

/**
 * Extra metadata to show in Sentry error reports
 * https://docs.sentry.io/platforms/javascript/guides/electron/enriching-events/tags/
 * https://docs.sentry.io/platforms/rust/enriching-events/tags/
 *
 * Max key length is 32 chars, max value length is 200 chars
 */
export type SentryTags = {
    profileType: string
}
