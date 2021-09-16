import { NftInterface } from './../Nft/initial'
export enum MarketplaceStatus {
  Sell,
  Auction,
  AuctionWithSell
}
export interface ItemInterface {
  status: MarketplaceStatus
  nft: NftInterface
  auctionTime?: string
}
export interface MarketplaceInterface {
  items: ItemInterface[]
}
export const initialState: MarketplaceInterface = {
  items: []
}
