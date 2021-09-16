import { NftInterface } from './../Nft/initial'

export enum AuctionStatus {
  Sold,
  Fulfilled,
  Disputed,
  Waiting,
  Delisted
}

export interface AuctionInterface {
  minBid?: number
  insuranceAmount?: number
  status?: AuctionStatus
  soldPrice?: number
  sellForPrice?: number
  disputeTime: Date
  auctionTime: string
}
export interface ItemDetails {
  chainId: number
  seller: string
  timeStamp: number
  releaseTime: Date
  listTime: Date
  listingTxt: string
  buyer?: string
  purchaseTime?: Date
}
export interface ItemInterface {
  listingId: string
  type: MarketplaceType
  nft: NftInterface
  itemDetails: ItemDetails
  auction?: AuctionInterface
}

export enum MarketplaceType {
  Sell,
  Auction,
  AuctionWithSell
}
export interface MarketplaceInterface {
  items: ItemInterface[]
}
export const initialState: MarketplaceInterface = {
  items: []
}
