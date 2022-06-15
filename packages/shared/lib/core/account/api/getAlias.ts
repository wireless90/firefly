import { getAccount } from '@core/profile-manager'
import { AccountId } from '@iota/wallet'

export async function getAlias(id: AccountId): Promise<string> {
    return (await getAccount(Number(id)))?.getAlias()
}
