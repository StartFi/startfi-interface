import { checkSuccess } from "utils";
import { addInventory } from "./database/Inventory";
import { Inventory } from "./models/Inventory";


export const addInventoryItem= async (item:Inventory)=>{
    console.log('save Inv service',item)
    const itemAdded  =await  addInventory(item)
    console.log('added',itemAdded)
    const status = checkSuccess({ itemAdded })
    return { status, itemAdded,type:item.type  }
}