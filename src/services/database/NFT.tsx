
import { addDocument, editDocument, getDocument, getDocumentsByChild, getNFTS } from 'services/database/Database'
import { NFTQUERY } from 'services/Marketplace'

import { NFT } from 'services/models/NFT'

const ENTITY = 'nfts'

export const addNFT = async (nft: NFT): Promise<string> => {
  return addDocument(ENTITY, nft.id, nft)
}

export const getNFT = async (id: number): Promise<NFT> => {
  return (await getDocument(ENTITY, id)) as NFT
}

export const editNFT = async (nft: any): Promise<string> => {
  return editDocument(ENTITY, nft.id, nft)
}

export const getOwnerNFTs = async (owner: string): Promise<NFT[]> => {
  return (await getDocumentsByChild(ENTITY, 'owner', owner)) as NFT[]
}

// get single NFT details
export const getNfDetails= async(nftId:number):Promise<NFT>=>{
  return (await getDocument(ENTITY, nftId)) as NFT

}

export const getOwnerNFTs = async (owner: string): Promise<NFT[]> => {
  return (await getDocumentsByChild(ENTITY, 'owner', owner)) as NFT[]
}

