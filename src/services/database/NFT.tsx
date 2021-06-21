import { addDocument, editDocument, getDocument, getNFTS } from 'services/database/Database'
import { NFTQUERY } from 'services/Marketplace'
import { NFT } from 'services/models/NFT'

const ENTITY = 'nfts'

export const addNFT = async (nft: NFT): Promise<string> => {
  return addDocument(ENTITY, nft.id, nft)
}

export const getNFTs = async (query: NFTQUERY): Promise<NFT[]> => {
  return getNFTS(query)
}

export const editNft = async (nft: any): Promise<string> => {
  const oldNFT = await getDocument(ENTITY, nft.id)
  if (oldNFT) {
    const newNFT = { ...oldNFT, ...nft }
    return editDocument(ENTITY, newNFT.id, newNFT)
  }
  return 'No NFT'
}

// get single NFT details
export const getNfDetails= async(nftId:number):Promise<NFT>=>{
  return (await getDocument(ENTITY, nftId)) as NFT

}
