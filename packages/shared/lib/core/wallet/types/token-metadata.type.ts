import { TokenStandard } from '../enums'
import { IBaseToken } from '../interfaces/base-token.interface'
import { IIrc30Metadata } from '../interfaces/irc30-metadata.interface'

export type TokenMetadata = (IBaseToken & { standard: TokenStandard.BaseToken }) | IIrc30Metadata
