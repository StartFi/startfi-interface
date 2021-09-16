import { MarketplaceListings } from './MarketplaceListings'
import { Bid } from './Bid'
import { Draft } from './Draft'
import { NFT } from './NFT'
import { Users } from './User'
import { Inventory } from './Inventory'

export type Document = Users | NFT | MarketplaceListings | Bid | Draft | Inventory
