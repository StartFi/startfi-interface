export interface Auction {
  id: number
  nft: number
  listingPrice: number
  seller: string
  expireTimestamp: number
  buyer?: string
  isForSale: boolean
  isForBid: boolean
  bids?: number[]
  listTime: number
  purchaseTime?: Date
  listingTxt: string
  purchaseTxt?: string
  soldPrice?: number
}
