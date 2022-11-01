import { ContactAddressMap } from '../types'

export interface IPersistedContact {
    id: string
    name: string
    addresses: ContactAddressMap
    createdAt: Date
    lastModifiedAt: Date
}
