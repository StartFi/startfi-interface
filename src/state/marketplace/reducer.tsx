import { createReducer } from '@reduxjs/toolkit'

// import { getNFTS } from 'services/database/Database'

import { PopupContent } from './../../constants'

import { AuctionNFT } from 'services/models/AuctionNFT'
import {
  mintNFTAction,
  buyNFTAction,
  clearMarketplacePopup,
  getAuctionNFTAction,
  getMarketplaceAction,
  placeBidAction,
  setBidOrBuy
} from './actions'
import { NFT } from 'services/models/NFT'

export interface MarketplaceState {
  marketplace: AuctionNFT[]
  loadtime: number
  auctionNFT: AuctionNFT | null
  bidOrBuy: boolean
  bidOrBuyValue: number
  confirmationLoading: boolean
  NftDetails: NFT | null
  popup: PopupContent | null
}

const initialState: MarketplaceState = {
  marketplace: [],
  loadtime: 0,
  auctionNFT: null,
  bidOrBuy: false,
  bidOrBuyValue: 0,
  confirmationLoading: false,

  NftDetails: null,

  popup: null
}

export default createReducer(initialState, builder =>
  builder
    .addCase(getMarketplaceAction.pending, (state, action) => {})
    .addCase(getMarketplaceAction.fulfilled, (state, action) => {
      state.auctionNFT = null
      state.marketplace = action.payload.onMarket
      state.loadtime = action.payload.loadtime
    })
    .addCase(getMarketplaceAction.rejected, (state, action) => {
      state.popup = { success: false, message: action.error.message || 'Error occured while getting marketplace NFTs' }
    })
    .addCase(mintNFTAction.pending, (state, action) => {})
    .addCase(mintNFTAction.fulfilled, (state, action) => {
      const success = action.payload.status === 'success'
      state.popup = { success, type: 'MintNFT', message: success ? 'NFT minted successfully' : getFirstError(action.payload) }
    })
    .addCase(mintNFTAction.rejected, (state, action) => {
      state.popup = { success: false, message: action.error.message || 'Error occured while minting NFT' }
    })
    .addCase(getAuctionNFTAction.pending, (state, action) => {})
    .addCase(getAuctionNFTAction.fulfilled, (state, action) => {
      state.auctionNFT = action.payload.auctionNFT
    })
    .addCase(getAuctionNFTAction.rejected, (state, action) => {
      state.popup = { success: false, message: action.error.message || 'Error occured while getting NFT' }
    })
    .addCase(placeBidAction.pending, (state, action) => {
      state.confirmationLoading = true
    })
    .addCase(placeBidAction.fulfilled, (state, action) => {
      state.confirmationLoading = false
      const success = action.payload.status === 'success'
      state.popup = { success, message: success ? 'Bid placed successfully' : getFirstError(action.payload) }
    })
    .addCase(placeBidAction.rejected, (state, action) => {
      state.popup = { success: false, message: action.error.message || 'Error occured while placing bid' }
    })
    .addCase(buyNFTAction.pending, (state, action) => {
      state.confirmationLoading = true
    })
    .addCase(buyNFTAction.fulfilled, (state, action) => {
      state.confirmationLoading = false
      const success = action.payload.status === 'success'
      state.popup = { success, message: success ? 'NFT bought successfully' : getFirstError(action.payload) }
    })
    .addCase(buyNFTAction.rejected, (state, action) => {
      state.popup = { success: false, message: action.error.message || 'Error occured while buying NFT' }
    })
    .addCase(setBidOrBuy, (state, { payload: { bidOrBuy, value } }) => {
      state.bidOrBuy = bidOrBuy
      state.bidOrBuyValue = value
    })

    .addCase(clearMarketplacePopup, (state, action) => {
      state.popup = null
    })
)

const getFirstError = (object: any): string => {
  const keys = Object.keys(object)
  for (var key in keys) if (object[key] !== 'success' && ['status', 'hash'].includes(object)) return object[key]
  return 'success'
}
