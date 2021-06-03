import { createReducer } from '@reduxjs/toolkit'
import { BidItem } from 'services/Storage/Bids'
import { addBid } from './actions'

export interface BidState {
  BidsState: Array<BidItem>
  bidsAdded: boolean
}

const initialState: BidState = {
  BidsState: [],
  bidsAdded: false
}

export default createReducer(initialState, builder =>
  builder
    .addCase(addBid.pending, (state, action) => {})
    .addCase(addBid.fulfilled, (state, action) => {
      state.bidsAdded = true
    })
    .addCase(addBid.rejected, (state, action) => {})
)
