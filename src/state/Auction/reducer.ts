import { createReducer } from '@reduxjs/toolkit'

import { createNft, editNft, deleteNft } from './actions'
import { initialState } from './initial'

export default createReducer(initialState, builder =>
  builder
    .addCase(createNft, (state, action) => {
      state[action.payload.nft.id].id = action.payload.nft.id
      state[action.payload.nft.id].nft = action.payload.nft
    })
    .addCase(editNft, (state, action) => {
      state[action.payload.nft.id].nft = action.payload.nft
    })
    .addCase(deleteNft, (state, action) => {
      delete state[action.payload.id]
    })
)
