
import { Dictionary } from './../../constants'
import { addDocument, editDocument, getDocument, getDocuments } from 'services/database/Database'
import { NFT } from 'services/models/NFT'

const COLLECTION = 'nfts'

export const addNFT = async (nft: NFT): Promise<string> => {
  return addDocument(COLLECTION, nft.id, nft)
}

export const getNFT = async (id: number): Promise<NFT> => {
  return (await getDocument(COLLECTION, id)) as NFT
}

export const editNFT = async (nft: any): Promise<string> => {
  return editDocument(COLLECTION, nft.id, nft)
}

export const getNFTs = async (filters?: Dictionary): Promise<NFT[]> => {
  console.log(filters)
  return (await getDocuments(COLLECTION, filters)) as NFT[]
}

// get single NFT details
// export const getNfDetails= async(nftId:number):Promise<NFT>=>{
//   return (await getDocument(ENTITY, nftId)) as NFT

// }

// export const getOwnerNFTs = async (owner: string): Promise<NFT[]> => {
//   return (await getDocumentsByChild(ENTITY, 'owner', owner)) as NFT[]
// }

