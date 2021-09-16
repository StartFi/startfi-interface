import { NftInterface } from './../Nft/initial'
export interface InventoryInterface {
  draft: NftInterface[]
  myNft: NftInterface[]
  myNftOnMarketplace: NftInterface[]
}

export const initialState: InventoryInterface = {
  draft: [],
  myNft: [],
  myNftOnMarketplace: []
}
