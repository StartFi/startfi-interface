import { NftInterface } from '../Nft/initial'
import { createAction } from '@reduxjs/toolkit'

export const addForListing = createAction<{ nft: NftInterface }>('marketplace/sell')
export const addForAuction = createAction<{ nft: NftInterface; auctionTime: string }>('marketplace/auction')
export const addForAuctionWithSelling = createAction<{
  nft: NftInterface
  auctionTime: string
}>('marketplace/auction/sell')
