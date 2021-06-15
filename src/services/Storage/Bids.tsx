import { placeBidItem } from 'services/firebase/bidsStore'

export type BidItem = {
  NFTId: string
  bidPrice: number
  bidderId: string
  txtHash: string
  expiry: string
}

export const placeBid = async (bidItem: BidItem) => {
  const data = await placeBidItem(bidItem)
  return { data }
}
