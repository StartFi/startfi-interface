export interface MarketplaceListings {
  id: string
  nFTContractAddress: string
  nftTokenId: string
  listingPrice?: number
  endPrice?: number // purchased price , if auction it might be different from listing price
  seller: string
  expireTimestamp: number
  buyer?: string
  isSellForEnabled: boolean
  isBedEnabled: boolean
  bids: string[]
  listTime: Date
  purchaseTime?: Date
  listingTxt: string
  purchaseTxt?: string
  soldPrice?: number
  status: string
  minBid?: number
  insuranceAmount?: number
  chainId: number
  requiredStakes: number
}
