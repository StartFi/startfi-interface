export interface Bid {
  id: string
  nft: number
  bidPrice: number
  bidder: string
  expireTimestamp: number
  txtHash: string
  chainId: number
}

export interface PlaceBid {
  listingId: string
  userAddress: string
  bid: Bid
}
