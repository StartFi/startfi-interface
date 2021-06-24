import { Auction } from './Auction'
import { NFT } from './NFT'

export interface AuctionNFT {
  nft: NFT
  auction: Auction
  ownername: string
  issuername: string
  ownerdetails: string
}
