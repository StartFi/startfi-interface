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
  setStep,
  setAuction,
  setNFT,
  setMissing,
  removeMissing,
  getBids,
  getTopBid
} from './actions'
import { NFT } from 'services/models/NFT'
import { Auction } from 'services/models/Auction'
import { STEP } from './types'
import { initialAuction, initialNFT } from './initial'
import { Bid } from 'services/models/Bid'

const getFirstError = (object: any): string => {
  const keys = Object.keys(object)
  for (const key in keys) if (object[key] !== 'success' && ['status', 'hash'].includes(object)) return object[key]
  return 'success'
}

export interface MarketplaceState {
  marketplace: AuctionNFT[]
  loadtime: number
  auctionNFT: AuctionNFT | null
  bidOrBuy: boolean
  bidOrBuyValue: number
  walletConfirmation: string | null
  popup: PopupContent | null
  minted: boolean
  nft: NFT
  auction: Auction
  NftDetails: NFT | null
  loading: boolean
  currentPage: number
  lastAuctions: any[]
  delisted: boolean
  step: STEP
  missing: string[]
  NftBids: Bid[]
  topNftBid: number
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
  nft: initialNFT,
  auction: initialAuction,
  NftDetails: null,
  loading: false,
  currentPage: 0,
  lastAuctions: [],
  delisted: false,
  step: 1,
  missing: [],
  NftBids: [],
  topNftBid: 0
}

export default createReducer(initialState, builder =>
  builder
    .addCase(getMarketplaceAction.pending, state => {
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
    .addCase(addToMarketplaceAction.fulfilled, (state, action) => {
      state.walletConfirmation = null
      state.nft = initialNFT
      state.auction = initialAuction
      const success = action.payload.status === 'success'
      state.popup = {
        success,
        type: 'AddToMarketplace',
        message: success ? 'NFT added to Marketplace successfully' : getFirstError(action.payload)
      }
    })
    .addCase(addToMarketplaceAction.rejected, (state, action) => {
      state.popup = { success: false, message: action.error.message || 'Error occurred while Adding NFT to Marketplace' }
    })
    .addCase(getAuctionNFTAction.fulfilled, (state, action) => {
      state.auctionNFT = action.payload.auctionNFT
    })
    .addCase(getAuctionNFTAction.rejected, (state, action) => {
      state.popup = { success: false, message: action.error.message || 'Error occurred while getting NFT' }
    })
    .addCase(placeBidAction.pending, state => {
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

    .addCase(clearMarketplacePopup, state => {
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
    .addCase(clearNFT, state => {
      state.nft = initialNFT
    })
    .addCase(delistAuctionAction.pending, state => {
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
      state.walletConfirmation = action.payload.type
    })
    .addCase(setStep, (state, action) => {
      state.step = action.payload.step
      if (action.payload.step === STEP.AUCTION_DETAILS) state.minted = false
    })
    .addCase(setAuction, (state, action) => {
      if (state.auction) state.auction[action.payload.name] = action.payload.value
    })
    .addCase(setNFT, (state, action) => {
      if (state.nft) state.nft[action.payload.name] = action.payload.value
    })
    .addCase(setMissing, (state, action) => {
      state.missing = action.payload.missing
    })
    .addCase(removeMissing, (state, action) => {
      const newMissing = [...state.missing]
      newMissing.splice(newMissing.indexOf(action.payload.name), 1)
      state.missing = newMissing
    })
    // fix: Linting Unexpected empty arrow function
    //.addCase(getBids.pending, (state, action) => {})
    .addCase(getBids.fulfilled, (state, action) => {
      state.NftBids = action.payload.bids
    })
    // fix: Linting Unexpected empty arrow function

    //.addCase(getBids.rejected, (state, action) => {})
    .addCase(getTopBid, (state, action) => {
      state.topNftBid = action.payload.topBid
    })
)
