import { Dictionary } from './../../constants'
import { addDocument, editDocument, getDocument, getDocuments } from 'services/database/Database'
import { Inventory } from 'services/models/Inventory'

const COLLECTION = 'inventory'

export const addInventory = async (inventory: Inventory): Promise<string> => {
    return addDocument(COLLECTION, inventory.id, inventory)
}

export const getInventories = async (filters: Dictionary, orders?: Dictionary): Promise<Inventory[]> => {
    return (await getDocuments(COLLECTION, filters, orders)) as Inventory[]
}

export const getInventory = async (id: string): Promise<Inventory> => {
    return (await getDocument(COLLECTION, id)) as Inventory
}

export const editInventory = async (inventory: any): Promise<string> => {
     return editDocument(COLLECTION, inventory.id, inventory)
}

