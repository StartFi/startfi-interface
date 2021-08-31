import { Auction } from './Auction'
import { NFT } from './NFT'

    //type: must choose type : draft onMarket ofMarket
export interface Inventory {
    id: any
    ethAddress: string
    nft?: any
    auction?: any
    type: string
}
