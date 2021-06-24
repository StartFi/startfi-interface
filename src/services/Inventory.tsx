


import { getNFTsOnAuction } from './Marketplace';


import { NFT } from './models/NFT'

// get user NFTS
export const getInventoryInMarketPlace = async (ethAddress: string): Promise<NFT[]> => {
  const nfts = await getNFTsOnAuction()
  return nfts.nfts.filter(e => e.owner === ethAddress)
}

// get user Drafts
// export const getInventoryDraft = async (ethAddress: string): Promise<NFT[]> => {
//   const userDrafts = await getUserDrafts(ethAddress)
//   return userDrafts.drafts
// }

// export const getInventory = async (thAddress: string): Promise<Inventory[]> => {
//   let inventory: Inventory[] = []

//   const invInMarket = await getInventoryInMarketPlace(thAddress)
//   const userDrafts = await getInventoryDraft(thAddress)

//   inventory=inventory.concat({ type: InventoryOptions.Draft, NFTs: userDrafts })
//   inventory=inventory.concat({ type: InventoryOptions.inMarketPlace, NFTs: invInMarket })

//   return inventory
// }
