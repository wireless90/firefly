import { IIrc27Metadata } from '@core/nfts/interfaces'
import { Converter } from '@core/utils'
import type { FeatureTypes, UnlockConditionTypes } from '@iota/types'
import type { BuildAliasOutputData } from '@iota/wallet'
import {
    ADDRESS_TYPE_ED25519,
    EMPTY_HEX_ID,
    FEATURE_TYPE_METADATA,
    UNLOCK_CONDITION_GOVERNOR_ADDRESS,
    UNLOCK_CONDITION_STATE_CONTROLLER_ADDRESS,
} from '../constants'
import { convertBech32ToHexAddress } from './convertBech32ToHexAddress'

export function buildAliasOutputData(metadata: IIrc27Metadata, address: string): BuildAliasOutputData {
    const unlockConditions: UnlockConditionTypes[] = [
        {
            type: UNLOCK_CONDITION_GOVERNOR_ADDRESS,
            address: {
                type: ADDRESS_TYPE_ED25519,
                pubKeyHash: convertBech32ToHexAddress(address),
            },
        },
        {
            type: UNLOCK_CONDITION_STATE_CONTROLLER_ADDRESS,
            address: {
                type: ADDRESS_TYPE_ED25519,
                pubKeyHash: convertBech32ToHexAddress(address),
            },
        },
    ]

    const immutableFeatures: FeatureTypes[] = [
        {
            type: FEATURE_TYPE_METADATA,
            data: Converter.utf8ToHex(JSON.stringify(metadata)),
        },
    ]

    return {
        aliasId: EMPTY_HEX_ID,
        immutableFeatures,
        unlockConditions,
    }
}
