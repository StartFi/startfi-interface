import { createReducer } from '@reduxjs/toolkit'
import { addNFT, getNFTs } from './actions'

export interface NFT {
  id: number
  name: string
  description: string
  category: string
  owner: string
  onAuction: boolean
  issueDate: number
  image: string
  price: number
  hash: string
  // tags: string[]
}

export type NFTS = Array<NFT>

export interface NFTState {
  nfts: NFTS
  loadtime: number
  search: string
  category: string
  nftAdded: boolean
}

const initialState: NFTState = {
  nfts: [],
  loadtime: 0,
  search: '',
  category: 'all',
  nftAdded: false
}

export default createReducer(initialState, builder =>
  builder
    .addCase(getNFTs.pending, (state, action) => {})
    .addCase(getNFTs.fulfilled, (state, action) => {
      state.nfts = action.payload.nfts
      state.loadtime = action.payload.loadtime
      if (action.payload.search) state.search = action.payload.search
      else state.search = ''
      if (action.payload.category) state.category = action.payload.category
      else state.category = ''
    })
    .addCase(getNFTs.rejected, (state, action) => {})
    .addCase(addNFT.pending, (state, action) => {})
    .addCase(addNFT.fulfilled, (state, action) => {
      state.nftAdded = true
    })
    .addCase(addNFT.rejected, (state, action) => {})
)
