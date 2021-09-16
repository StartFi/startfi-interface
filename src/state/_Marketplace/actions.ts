import { NftInterface } from '../Nft/initial'
import { createAction } from '@reduxjs/toolkit'
import { AuctionInterface } from './initial'

export const addForListing = createAction<{ listingId: string; nft: NftInterface }>('marketplace/sell')
export const addForAuction = createAction<{ listingId: string; nft: NftInterface; auction: AuctionInterface }>(
  'marketplace/auction'
)
export const addForAuctionWithSelling = createAction<{
  listingId: string
  nft: NftInterface
  auction: AuctionInterface
}>('marketplace/auction/sell')
