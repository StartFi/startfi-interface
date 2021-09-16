import { createAction } from '@reduxjs/toolkit'
import { ItemInterface } from './initial'

export const addForListing = createAction<{ item: ItemInterface }>('marketplace/sell')
export const addForAuction = createAction<{ item: ItemInterface }>('marketplace/auction')
export const addForAuctionWithSelling = createAction<{
  item: ItemInterface
}>('marketplace/auction/sell')
