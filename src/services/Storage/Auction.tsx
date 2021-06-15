import { AddAuctionItem } from 'services/firebase/auctionStore'

export type AuctionItem = {
  listingPrice: number
  seller: string
  buyer: string
  isForSale: boolean
  isForBid: boolean
  bids: Array<number>
  listTime: string
  purchaseTime: string
  expireTimestamp: string
  listingTxt: string
  purchaseTxt: string
  soldPrice: number
}

export const addToAuction = async (auctionItem: AuctionItem) => {
  const data = await AddAuctionItem(auctionItem)
  return { data }
}
