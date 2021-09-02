import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { addInventoryItem  ,getInventory} from "services/Inventory";

export const addToInventory= createAsyncThunk('inventory/addItemAction', addInventoryItem)
export const getUserInventory = createAsyncThunk('inventory/getInventory',  getInventory)
export const clearInvPopup = createAction<void>('inventory/clearInvPopup')