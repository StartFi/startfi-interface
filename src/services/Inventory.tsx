import { inventoryTypes } from 'components/invHome/CardHeader'
import { checkSuccess } from 'utils'
import { addInventory, getInventories } from './database/Inventory'
import { Inventory, InventoryType } from './models/Inventory'


// add inventory item
export const addInventoryItem = async (item: Inventory) => {
  const itemAdded = await addInventory(item)
  const status = checkSuccess({ itemAdded })
  return { status, itemAdded, type: item.type }
}

// get inventory
export const getInventory = async (
  ethAddress: string
) => {
  console.log('service called=>',ethAddress)
  let draft,onMarket,offMarket
  const inventory = await getInventories({ ethAddress })
  if(inventory){
     draft=inventory.filter(item=>item.type===InventoryType.Draft)
     onMarket=inventory.filter(item=>item.type===InventoryType.OnMarket)
     offMarket=inventory.filter(item=>item.type===InventoryType.offMarket)
  }

  return { inventory,draft,onMarket,offMarket }
}
