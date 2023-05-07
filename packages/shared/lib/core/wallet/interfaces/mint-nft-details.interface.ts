import { IIrc27Metadata } from '@core/nfts'
import { OutputType } from '../enums'

export interface IMintNftDetails {
    issuer: string
    outputType: OutputType.Nft | OutputType.Alias
    metadata: IIrc27Metadata
    quantity: number
}
