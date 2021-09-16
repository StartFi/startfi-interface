import { NFT } from './NFT'
import { MarketplaceListings } from './MarketplaceListings'

export interface Drafts {
  user: string
  draftsNFT?: NFT[]
  draftsListing?: MarketplaceListings[]
}
