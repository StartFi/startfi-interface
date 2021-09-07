import { createReducer } from '@reduxjs/toolkit'
import { PopupContent } from '../../constants'
import { Inventory, InventoryType } from 'services/models/Inventory'
import { addToInventory, clearInvPopup, deleteInventoryAction, editInventoryAction, getUserInventory } from './actions'


export interface InventoryState {
  inventory: Inventory[]
  draft:Inventory[]
  onMarket:Inventory[]
  offMarket:Inventory[]
  popup: PopupContent | null
}

const initialState: InventoryState = {
  inventory: [],
  draft:[],
  onMarket:[],
  offMarket:[],
  popup: null
}

export default createReducer(initialState, builder => {
  builder
    .addCase(getUserInventory.pending, (state, action) => {})
    .addCase(getUserInventory.fulfilled, (state, action) => {
      console.log('state updated')
      state.inventory = action.payload.inventory
      state.draft=action.payload.draft
      state.onMarket=action.payload.onMarket
      state.offMarket=action.payload.offMarket
    })
    .addCase(addToInventory.rejected, (state, action) => {})
    .addCase(addToInventory.pending, (state, action) => {})
    .addCase(addToInventory.fulfilled, (state, action) => {
      const success = action.payload.status === 'success'
      console.log('inv add reducer',action.payload)
      if (action.payload.type === InventoryType.Draft) {
        state.popup = {
          success,
          type: 'SaveDraft',
          message: success ? 'Draft saved successfully' : action.payload.itemAdded
        }
      }
    })
    .addCase(deleteInventoryAction.rejected, (state, action) => {
      console.log(state)
    })
    .addCase(deleteInventoryAction.pending, (state, action) => {})
    .addCase(deleteInventoryAction.fulfilled, (state, action) => {

      console.log('inv delete reducer',action.payload)

    })
    .addCase(editInventoryAction.rejected, (state, action) => {})
    .addCase(editInventoryAction.pending, (state, action) => {})
    .addCase(editInventoryAction.fulfilled, (state, action) => {
      console.log(action.payload)
      // const success = action.payload.status === 'success'
      // if (action.payload.type === InventoryType.Draft) {
      //   state.popup = {
      //     success,
      //     type: 'SaveDraft',
      //     message: success ? 'Draft saved successfully' : action.payload.itemAdded
      //   }
      // }
    })
    .addCase(getUserInventory.rejected, (state, action) => {
      state.popup = { success: false, message: action.error.message || 'Error occured while saving NFT to drafts' }
    })
    .addCase(clearInvPopup, (state, action) => {
      state.popup = null
    })
})
