import { createReducer } from '@reduxjs/toolkit'
import { Inventory } from 'services/models/Inventory'
import { initialInventory } from './initial'

export interface InventoryState {
  inventory: Inventory[]
}

const initialState: InventoryState = {
  inventory: []
}

export default createReducer(initialState, builder=>{
    
})