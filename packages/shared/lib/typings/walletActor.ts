import { IActorHandler } from './bridge'
import { LoggerConfig } from './wallet'
import { IWalletApi } from './walletApi'
import { SentryTags } from './app'

export interface IWalletActor {
    api: IWalletApi

    init(
        id: string,
        storagePath: string,
        sendCrashReports: boolean,
        machineId: string,
        sentryTags: SentryTags
    ): IActorHandler
    onMessage(callback: (payload: unknown) => void): void
    initLogger(config: LoggerConfig): void
}
