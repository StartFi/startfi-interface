import { checkSuccess } from 'utils'
import { addInventory, getInventories } from './database/Inventory'
import { Inventory } from './models/Inventory'


// add inventory item
export const addInventoryItem = async (item: Inventory) => {
  const itemAdded = await addInventory(item)
  const status = checkSuccess({ itemAdded })
  return { status, itemAdded, type: item.type }
}

// get inventory 
export const getInventory = async (
  ethAddress: string
): Promise<{
  inventory: Inventory[]
}> => {
  const inventory = await getInventories({ ethAddress })

  return { inventory }
}
