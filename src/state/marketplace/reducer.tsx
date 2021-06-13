import { createReducer } from '@reduxjs/toolkit'
import { AuctionNFT } from 'services/models/AuctionNFT'
import { NFT } from 'services/models/NFT'
import { fulfilledHandler } from 'utils'
import {
  addNFTAction,
  buyNFTAction,
  getAuctionNFTAction,
  getNFTsAction,
  placeBidAction,
  setBidOrBuy,
  setConfirmationLoading
} from './actions'

export interface MarketplaceState {
  nfts: NFT[]
  loadtime: number
  search: string
  category: string
  auctionNFT: AuctionNFT | null
  bidOrBuy: boolean
  bidOrBuyValue: number
  confirmationLoading: boolean
}

const initialState: MarketplaceState = {
  nfts: [],
  loadtime: 0,
  search: '',
  category: 'all',
  auctionNFT: null,
  bidOrBuy: false,
  bidOrBuyValue: 0,
  confirmationLoading: false
}

export default createReducer(initialState, builder =>
  builder
    .addCase(getNFTsAction.pending, (state, action) => {})
    .addCase(getNFTsAction.fulfilled, (state, action) => {
      state.auctionNFT = null
      state.nfts = action.payload.nfts
      state.loadtime = action.payload.loadtime
      if (action.payload.search) state.search = action.payload.search
      else state.search = ''
      if (action.payload.category) state.category = action.payload.category
      else state.category = ''
    })
    .addCase(getNFTsAction.rejected, (state, action) => {})
    .addCase(addNFTAction.pending, (state, action) => {})
    .addCase(addNFTAction.fulfilled, (state, action) => {
      fulfilledHandler(action.payload, 'NFT minted txtHash ' + action.payload.txtHash)
    })
    .addCase(addNFTAction.rejected, (state, action) => {})
    .addCase(getAuctionNFTAction.pending, (state, action) => {})
    .addCase(getAuctionNFTAction.fulfilled, (state, action) => {
      state.auctionNFT = action.payload.auctionNFT
    })
    .addCase(getAuctionNFTAction.rejected, (state, action) => {})
    .addCase(placeBidAction.pending, (state, action) => {})
    .addCase(placeBidAction.fulfilled, (state, action) => {
      fulfilledHandler(action.payload, 'Bid placed txtHash ' + action.payload.txtHash)
      state.confirmationLoading = false
    })
    .addCase(placeBidAction.rejected, (state, action) => {})
    .addCase(buyNFTAction.pending, (state, action) => {})
    .addCase(buyNFTAction.fulfilled, (state, action) => {
      fulfilledHandler(action.payload, 'NFT bought purchaseTxt ' + action.payload.purchaseTxt)
      state.confirmationLoading = false
    })
    .addCase(setBidOrBuy, (state, { payload: { bidOrBuy, value } }) => {
      state.bidOrBuy = bidOrBuy
      state.bidOrBuyValue = value
    })
    .addCase(setConfirmationLoading, (state, { payload: { isOpen } }) => {
      state.confirmationLoading = isOpen
    })
)
