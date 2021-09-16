import { createReducer } from '@reduxjs/toolkit'

import { addForListing, addForAuction, addForAuctionWithSelling } from './actions'
import { initialState, MarketplaceStatus } from './initial'

export default createReducer(initialState, builder =>
  builder
    .addCase(addForListing, (state, action) => {
      state.items.push({ status: MarketplaceStatus.Sell, nft: action.payload.nft })
    })
    .addCase(addForAuction, (state, action) => {
      state.items.push({
        status: MarketplaceStatus.Auction,
        nft: action.payload.nft,
        auctionTime: action.payload.auctionTime
      })
    })
    .addCase(addForAuctionWithSelling, (state, action) => {
      state.items.push({
        status: MarketplaceStatus.AuctionWithSell,
        nft: action.payload.nft,
        auctionTime: action.payload.auctionTime
      })
    })
)
