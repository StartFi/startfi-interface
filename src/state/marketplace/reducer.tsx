import { createReducer } from '@reduxjs/toolkit'
import { PopupContent } from './../../constants'
import { AuctionNFT } from 'services/models/AuctionNFT'
import {
  mintNFTAction,
  buyNFTAction,
  clearMarketplacePopup,
  getAuctionNFTAction,
  getMarketplaceAction,
  placeBidAction,
  setBidOrBuy,
  saveNFT,
  saveAuction,
  addToMarketplaceAction,
  clearNFT,
  delistAuctionAction,
  setWalletConfirmation,
} from './actions'
import { NFT } from 'services/models/NFT'
import { Auction } from 'services/models/Auction'

export interface MarketplaceState {
  marketplace: AuctionNFT[]
  loadtime: number
  auctionNFT: AuctionNFT | null
  bidOrBuy: boolean
  bidOrBuyValue: number
  walletConfirmation: string | null
  popup: PopupContent | null
  minted: boolean
  nft: NFT | null
  auction: Auction | null
  NftDetails: NFT | null
  loading: boolean
  currentPage: number
  lastAuctions: any[]
  delisted: boolean
}

const initialState: MarketplaceState = {
  marketplace: [],
  loadtime: 0,
  auctionNFT: null,
  bidOrBuy: false,
  bidOrBuyValue: 0,
  walletConfirmation: null,
  popup: null,
  minted: false,
  nft: null,
  auction: null,
  NftDetails: null,
  loading: false,
  currentPage: 0,
  lastAuctions: [],
  delisted: false
}

export default createReducer(initialState, builder =>
  builder
    .addCase(getMarketplaceAction.pending, (state, action) => {
      state.loading = true
    })
    .addCase(getMarketplaceAction.fulfilled, (state, action) => {
      state.auctionNFT = null
      state.marketplace = action.payload.onMarket
      state.loadtime = action.payload.loadtime
      state.loading = false
      state.lastAuctions.push(action.payload.newLastAuction)
      if (action.payload.newPage !== undefined) state.currentPage = action.payload.newPage
    })
    .addCase(getMarketplaceAction.rejected, (state, action) => {
      state.popup = { success: false, message: action.error.message || 'Error occured while getting marketplace NFTs' }
    })
    .addCase(mintNFTAction.pending, (state, action) => {
      state.minted = false
    })
    .addCase(mintNFTAction.fulfilled, (state, action) => {
      state.walletConfirmation = null
      const success = action.payload.status === 'success'
      if (success) state.minted = true
      state.popup = {
        success,
        type: 'MintNFT',
        message: success ? 'NFT minted successfully' : getFirstError(action.payload)
      }
    })
    .addCase(mintNFTAction.rejected, (state, action) => {
      state.popup = { success: false, message: action.error.message || 'Error occured while minting NFT' }
    })
    .addCase(addToMarketplaceAction.pending, (state, action) => {
    })
    .addCase(addToMarketplaceAction.fulfilled, (state, action) => {
      state.walletConfirmation = null
      state.nft = null
      state.auction = null
      const success = action.payload.status === 'success'
      state.popup = {
        success,
        type: 'AddToMarketplace',
        message: success ? 'NFT added to Marketplace successfully' : getFirstError(action.payload)
      }
    })
    .addCase(addToMarketplaceAction.rejected, (state, action) => {
      state.popup = { success: false, message: action.error.message || 'Error occured while Adding NFT to Marketplace' }
    })
    .addCase(getAuctionNFTAction.pending, (state, action) => {})
    .addCase(getAuctionNFTAction.fulfilled, (state, action) => {
      state.auctionNFT = action.payload.auctionNFT
    })
    .addCase(getAuctionNFTAction.rejected, (state, action) => {
     
      state.popup = { success: false, message: action.error.message || 'Error occured while getting NFT' }
    })
    .addCase(placeBidAction.pending, (state, action) => {
      state.walletConfirmation = 'Bidding'
    })
    .addCase(placeBidAction.fulfilled, (state, action) => {
      state.walletConfirmation = null
      const success = action.payload.status === 'success'
      state.popup = { success, message: success ? 'Bid placed successfully' : getFirstError(action.payload) }
    })
    .addCase(placeBidAction.rejected, (state, action) => {
      state.popup = { success: false, message: action.error.message || 'Error occured while placing bid' }
    })
    .addCase(buyNFTAction.pending, (state, action) => {
      state.walletConfirmation = 'Payment'
    })
    .addCase(buyNFTAction.fulfilled, (state, action) => {
      state.walletConfirmation = null
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
    .addCase(saveNFT, (state, action) => {
      state.nft = action.payload.nft
      state.minted = false
    })
    .addCase(saveAuction, (state, action) => {
      state.auction = action.payload.auction
      state.minted = false
    })
    .addCase(clearNFT, (state, action) => {
      state.nft = null
    })
    .addCase(delistAuctionAction.pending, (state, action) => {
      state.delisted = false
    })
    .addCase(delistAuctionAction.fulfilled, (state, action) => {
      const success = action.payload.status === 'success'
      if (success) state.delisted = true
      state.popup = {
        success,
        type: 'DelistAuction',
        message: success ? 'Auction delisted successfully' : getFirstError(action.payload)
      }
    })
    .addCase(delistAuctionAction.rejected, (state, action) => {
      state.popup = { success: false, message: action.error.message || 'Error occured while Delisting Auction' }
    })
    .addCase(setWalletConfirmation, (state, action) => {
        state.walletConfirmation = 'Bidding'
    })
)

const getFirstError = (object: any): string => {
  const keys = Object.keys(object)
  for (var key in keys) if (object[key] !== 'success' && ['status', 'hash'].includes(object)) return object[key]
  return 'success'
}
