import { getAccount } from '@core/profile-manager'
import { AccountId } from '@iota/wallet'

export async function setAlias(id: AccountId, alias: string): Promise<void> {
    return (await getAccount(Number(id)))?.setAlias(alias)
}
