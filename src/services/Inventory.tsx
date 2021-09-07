import { checkSuccess } from 'utils'
import { addInventory,editInventory ,getInventories,deleteInventory } from './database/Inventory'
import { Inventory, InventoryType } from './models/Inventory'

// add inventory item
export const addInventoryItem = async (item: Inventory) => {
  console.log('item id=>=>',item.id)
  const itemAdded = await addInventory(item)
  const status = checkSuccess({ itemAdded })
  return { status, itemAdded, type: item.type }
}

// editInvItem
export const editInvItem=async (item: Inventory)=>{
  const itemEdited = await editInventory(item)
  const status = checkSuccess({ itemEdited })
  return { status, itemEdited, type: item.type }

}

// editInvItem
export const deleteInvItem=async (id: string)=>{
  const itemDeleted = await  deleteInventory(id)
  const status = checkSuccess({ itemDeleted })
  return { status,itemDeleted}

}

// get inventory
export const getInventory = async (ethAddress: string) => {
  let draft: Inventory[] = []
  let onMarket: Inventory[] = []
  let offMarket: Inventory[] = []
  const inventory = await getInventories({ ethAddress })
  if (inventory) {
    draft = inventory.filter(item => item.type === InventoryType.Draft)
    onMarket = inventory.filter(item => item.type === InventoryType.OnMarket)
    offMarket = inventory.filter(item => item.type === InventoryType.offMarket)
  }

  return { inventory, draft, onMarket, offMarket }
}
