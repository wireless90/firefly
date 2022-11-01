import { DestinationNetwork } from '@core/network'
import { generateRandomId } from '@core/utils'

import { IPersistedContact } from '../interfaces'
import { addPersistedContactForActiveProfile } from '../stores'

export function createNewContact(name: string, destinationNetwork: DestinationNetwork, address: string): void {
    // validate contact details (at least address)

    const id = generateRandomId()

    const addresses = {
        [destinationNetwork]: address,
    }
    const nowDate = new Date(Date.now())

    const contact: IPersistedContact = {
        id,
        name,
        addresses,
        createdAt: nowDate,
        lastModifiedAt: nowDate,
    }

    // Save contact
    addPersistedContactForActiveProfile(contact)
}
