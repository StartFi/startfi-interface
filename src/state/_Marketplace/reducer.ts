import { createReducer } from '@reduxjs/toolkit'

import { addForListing, addForAuction, addForAuctionWithSelling } from './actions'
import { initialState, MarketplaceType } from './initial'

export default createReducer(initialState, builder =>
  builder
    .addCase(addForListing, (state, action) => {
      state.items.push({ listingId: action.payload.listingId, type: MarketplaceType.Sell, nft: action.payload.nft })
    })
    .addCase(addForAuction, (state, action) => {
      state.items.push({
        listingId: action.payload.listingId,
        type: MarketplaceType.Auction,
        nft: action.payload.nft,
        auction: action.payload.auction
      })
    })
    .addCase(addForAuctionWithSelling, (state, action) => {
      state.items.push({
        listingId: action.payload.listingId,
        type: MarketplaceType.AuctionWithSell,
        nft: action.payload.nft,
        auction: action.payload.auction
      })
    })
)
