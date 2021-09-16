export interface BidInterface {
  auctionId: string
  bidId: string
  bidPrice: number
  bidder: string
  timeStamp: number
  txtHash: string
  isPurchased?: boolean
}
export interface BidsInterface {
  bids: BidInterface[]
}
export const initialState: BidsInterface = {
  bids: []
}
