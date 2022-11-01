import { get } from 'svelte/store'

import { activeProfile } from '@core/profile'
import { persistent } from '@core/utils'

import { IPersistedContact } from '../interfaces'
import { ContactMap } from '../types'

export const persistedContacts = persistent<ContactMap>('persistedContacts', {})

export function addPersistedContactForActiveProfile(newContact: IPersistedContact): void {
    persistedContacts.update((state) => {
        const profileId = get(activeProfile)?.id
        if (!state[profileId]) {
            state[profileId] = {}
        }
        state[profileId][newContact.id] = newContact
        return state
    })
}
