import { createReducer } from '@reduxjs/toolkit'

import { addForListing, addForAuction, addForAuctionWithSelling } from './actions'
import { initialState } from './initial'

export default createReducer(initialState, builder =>
  builder
    .addCase(addForListing, (state, action) => {
      state.items.push(action.payload.item)
    })
    .addCase(addForAuction, (state, action) => {
      state.items.push(action.payload.item)
    })
    .addCase(addForAuctionWithSelling, (state, action) => {
      state.items.push(action.payload.item)
    })
)
