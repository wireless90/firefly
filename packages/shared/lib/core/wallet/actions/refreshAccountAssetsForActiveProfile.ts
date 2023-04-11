import { activeAccounts, activeProfile } from '@core/profile'
import { get } from 'svelte/store'
import {
    clearPersistedAssetForActiveProfile,
    addPersistedAsset,
    persistedAssets,
} from '../stores/persisted-assets.store'
import { getOrRequestAssetFromPersistedAssets } from '../actions'
import { VerifiedStatus, TokenStandard } from '../enums'
import { IPersistedAsset } from '../interfaces'

export async function refreshAccountAssetsForActiveProfile(
    clearPersistedAssets = false,
    keepVerificationStatus = false
): Promise<void> {
    const storedVerificationStates = {}
    if (keepVerificationStatus) {
        const assets = get(persistedAssets)?.[get(activeProfile)?.id] ?? {}
        for (const [id, asset] of Object.entries(assets)) {
            storedVerificationStates[id] = asset.verification
        }
    }
    clearPersistedAssets && clearPersistedAssetForActiveProfile()

    const network = get(activeProfile)?.network
    const baseToken = network.baseToken

    const persistedBaseCoin: IPersistedAsset = {
        id: String(network.coinType),
        standard: TokenStandard.BaseCoin,
        metadata: {
            ...baseToken,
        },
        hidden: false,
        verification: { verified: true, status: VerifiedStatus.Official },
    }

    const assets: IPersistedAsset[] = []
    const accounts = get(activeAccounts)
    for (const account of accounts) {
        const tokens = account?.balances?.nativeTokens ?? []
        for (const token of tokens) {
            try {
                const persistedAsset = await getOrRequestAssetFromPersistedAssets(token.tokenId)
                if (persistedAsset) {
                    if (keepVerificationStatus) {
                        const verificationStatus = storedVerificationStates[persistedAsset.id]
                        persistedAsset.verification = verificationStatus
                    }
                    assets.push(persistedAsset)
                }
            } catch (err) {
                console.error(err)
            }
        }
    }
    addPersistedAsset(persistedBaseCoin, ...assets)
}
