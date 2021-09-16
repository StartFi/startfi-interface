import { createReducer } from '@reduxjs/toolkit'

import { addToDraft, addToMyNft, addMyNftOnMarketplace } from './actions'
import { initialState } from './initial'

export default createReducer(initialState, builder =>
  builder
    .addCase(addToDraft, (state, action) => {
      state.draft.push(action.payload.nft)
    })
    .addCase(addToMyNft, (state, action) => {
      state.myNft.push(action.payload.nft)
    })
    .addCase(addMyNftOnMarketplace, (state, action) => {
      state.myNft.push(action.payload.nft)
    })
)
