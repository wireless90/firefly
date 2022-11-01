import { IPersistedContact } from '../interfaces'

export type ContactMap = {
    [profileId: string]: {
        [contactId: string]: IPersistedContact
    }
}
