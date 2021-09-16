import { MarketplaceListings } from './MarketplaceListings'
import { NFT } from './NFT'

export interface AuctionNFT {
  nft: NFT
  auction: MarketplaceListings
  ownername: string
  issuername: string
  ownerdetails: string
}
