import { createReducer } from '@reduxjs/toolkit'
import {  getNFTs } from './actions'

export interface NFT {
  id: number
  name: string
  image: string
  price: number
  category: string
  description: string
}

export type NFTS = Array<NFT>

export interface NFTState {
  nfts: NFTS
  loadtime: number
}

const initialState: NFTState = {
  nfts: [],
  loadtime: 0
}

export default createReducer(initialState, builder =>
  builder
    .addCase(getNFTs.pending, (state, action) => {})
    .addCase(getNFTs.fulfilled, (state, action) => {
      state.nfts = action.payload.nfts
      state.loadtime = action.payload.loadtime
    })
    .addCase(getNFTs.rejected, (state, action) => {
      //notify
    })
)
