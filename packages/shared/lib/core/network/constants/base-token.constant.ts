import { ITokenMetadata } from '@core/wallet'
import { NetworkId } from '../enums'

export const BASE_TOKEN: Readonly<{ [key in NetworkId]?: ITokenMetadata }> = {
    [NetworkId.Iota]: {
        name: 'IOTA',
        tickerSymbol: 'MIOTA',
        unit: 'i',
        decimals: 0,
        subunit: null,
        useMetricPrefix: true,
        primaryColor: '#6E82A4',
    },
    [NetworkId.Shimmer]: {
        name: 'Shimmer',
        tickerSymbol: 'SMR',
        unit: 'SMR',
        decimals: 6,
        subunit: 'glow',
        useMetricPrefix: false,
        primaryColor: '#25DFCA',
        url: 'https://shimmer.network/',
    },
}
