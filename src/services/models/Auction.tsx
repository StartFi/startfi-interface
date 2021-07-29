export interface Auction {
  id: string
  nft: number
  listingPrice: number
  seller: string
  expireTimestamp: number
  buyer?: string
  isForSale: boolean
  isForBid: boolean
  bids: string[]
  listTime: Date
  purchaseTime?: Date
  listingTxt: string
  purchaseTxt?: string
  soldPrice?: number
  status: string
  minBid?: number
  qualifyAmount?: number
  chainId: number
}
