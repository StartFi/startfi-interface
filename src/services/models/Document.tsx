import { Auction } from './Auction'
import { Bid } from './Bid'
import { Draft } from './Draft'
import { NFT } from './NFT'
import { User } from './User'
import { Inventory } from './Inventory'

export type Document = User | NFT | Auction | Bid | Draft | Inventory
