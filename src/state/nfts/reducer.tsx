import { createReducer } from '@reduxjs/toolkit'
import {  addNFT, getNFTs } from './actions'

export interface NFT {
  //  id=txt hash
  id: number
  //  =ehAddress of user
  owner:string
  issueDate:number
  onAuction:boolean
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
  nftAdded:boolean
}

const initialState: NFTState = {
  nfts: [],
  loadtime: 0,
  nftAdded:false
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
    .addCase(addNFT.pending, (state, action) => {})
    .addCase(addNFT.fulfilled, (state, action) => {
      state.nftAdded  =true

    })
    .addCase(addNFT.rejected, (state, action) => {
      //notify
    })
)
