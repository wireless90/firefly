import { writable } from 'svelte/store'
import { IMintNftDetails } from '../interfaces'
import { OutputType, TokenStandard } from '../enums'

export const mintNftDetails = writable<IMintNftDetails>({
    issuer: '',
    outputType: OutputType.Nft,
    metadata: {
        standard: TokenStandard.Irc27,
        version: 'v1.0',
        type: 'image/jpeg',
        uri: '',
        name: '',
        collectionName: undefined,
        royalties: undefined,
        issuerName: undefined,
        description: undefined,
        attributes: undefined,
    },
    quantity: 1,
})

export function setMintNftDetails(payload: IMintNftDetails): void {
    mintNftDetails.set(payload)
}

export function resetMintNftDetails(): void {
    mintNftDetails.set({
        issuer: '',
        outputType: OutputType.Nft,
        metadata: {
            standard: TokenStandard.Irc27,
            version: 'v1.0',
            type: 'image/jpeg',
            uri: '',
            name: '',
            collectionName: undefined,
            royalties: undefined,
            issuerName: undefined,
            description: undefined,
            attributes: undefined,
        },
        quantity: 1,
    })
}
