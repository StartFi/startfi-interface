import { createAsyncThunk } from "@reduxjs/toolkit";
import { addInventoryItem } from "services/Inventory";

export const addToInventory= createAsyncThunk('inventory/addItemAction', addInventoryItem)