import { WalletPlugin } from 'wallet-rs-capacitor-plugin'
import { AccountManagerOptions, CreateAccountPayload } from '@iota/wallet'

import { IAccount } from '@core/account'
import { IApi, IProfileManager, RecoverAccountsPayload } from '@core/profile-manager'

const profileManagers = {}

export const WalletBindings: IApi = {
    createAccountManager: (id: string, options: AccountManagerOptions): IProfileManager => {
        const manager = WalletPlugin.createAccountManager(options)
        manager.id = id
        profileManagers[id] = manager
        return manager
    },
    createAccount: async (managerId: string, payload: CreateAccountPayload): Promise<IAccount> => {
        const manager = profileManagers[managerId]
        const account = await manager.createAccount(payload)
        return account
    },
    deleteAccountManager: (id: string): void => {
        if (id && id in profileManagers) {
            delete profileManagers[id]
        }
    },
    getAccount: async (managerId: string, index: number): Promise<IAccount> => {
        const manager = profileManagers[managerId]
        const account = await manager.getAccount(index)
        return account
    },
    getAccounts: async (managerId: string): Promise<IAccount[]> => {
        const manager = profileManagers[managerId]
        const accounts = await manager.getAccounts()
        return accounts
    },
    recoverAccounts: async (managerId: string, payload: RecoverAccountsPayload): Promise<IAccount[]> => {
        const manager = profileManagers[managerId]
        const accounts = await manager.recoverAccounts(...Object.values(payload))
        return accounts
    },
}
