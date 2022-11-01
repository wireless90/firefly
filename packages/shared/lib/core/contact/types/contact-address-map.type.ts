import { DestinationNetwork } from '@core/network'

export type ContactAddressMap = {
    [network in DestinationNetwork]?: string
}
