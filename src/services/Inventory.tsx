import { checkSuccess } from "utils";
import { addInventory } from "./database/Inventory";
import { Inventory } from "./models/Inventory";


export const addInventoryItem= async (item:Inventory)=>{
    const itemAdded  =await  addInventory(item)
    const status = checkSuccess({ itemAdded })
    return { status, itemAdded  }
}