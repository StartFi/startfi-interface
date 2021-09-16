import { MarketplaceListings } from './MarketplaceListings'
import { Drafts } from './Draft'
import { NFT } from './NFT'
import { Bids } from './Bid'
import { Users } from './User'

export type Document = Users | NFT | MarketplaceListings | Bids | Drafts
