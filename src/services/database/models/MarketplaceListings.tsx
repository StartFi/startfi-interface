import { Bids } from './Bid'
export interface MarketplaceListings {
  id: string
  nFTContractAddress: string
  nftTokenId: string
  seller: string
  timeStamp: number
  buyer?: string
  isBedEnabled: boolean
  auction?: Auction // only if isBedEnabled is true
  listForSale?: ListForSale // only if isBedEnabled is false
  releaseTime: Date
  listTime: Date
  purchaseTime?: Date
  listingTxt: string
  purchaseTxt?: string
  chainId: number
}
export interface ListForSale {
  listingPrice?: number
  status: MarketplaceStatus
}
export interface Auction {
  minBid?: number
  insuranceAmount?: number
  status?: AuctionStatus
  soldPrice?: number
  isSellForEnabled: boolean
  sellForPrice?: number
  disputeTime: Date
  bids: Bids[]
}
export enum MarketplaceStatus {
  Sold,
  OnMarket,
  onAuction,
  Canceled
}
export enum AuctionStatus {
  Sold,
  Fulfilled,
  Disputed,
  Waiting,
  Delisted
}
