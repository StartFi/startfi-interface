import { createReducer } from '@reduxjs/toolkit'
import { PopupContent } from '../../constants'
import { Inventory, InventoryType } from 'services/models/Inventory'
import { addToInventory } from './actions'
import { initialInventory } from './initial'

export interface InventoryState {
  inventory: Inventory[]
  popup: PopupContent | null
}

const initialState: InventoryState = {
  inventory: [],
  popup: null
}

export default createReducer(initialState, builder => {
  builder
    .addCase(addToInventory.pending, (state, action) => {})
    .addCase(addToInventory.fulfilled, (state, action) => {
      console.log('reducer', action.payload)
      const success = action.payload.status === 'success'
      if (action.payload.type === InventoryType.Draft) {
        state.popup = {
          success: true,
          type: 'SaveDraft',
          message: success ? 'Draft saved successfully' : action.payload.itemAdded
        }
      }
    })
    .addCase(addToInventory.rejected, (state, action) => {
      state.popup = { success: false, message: action.error.message || 'Error occured while saving NFT to drafts' }
    })
})
