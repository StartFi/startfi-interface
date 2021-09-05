import { Auction } from './Auction'
import { NFT } from './NFT'

//type: must choose type : draft onMarket offMarket
export interface Inventory {
  id: any
  ethAddress: string
  nft: NFT
  issueDate: any
  auction?: any
  type: InventoryType
}

export enum InventoryType {
  Draft = 'draft',
  OnMarket = 'onMarket',
  offMarket = 'offMarket'
}
