import { addDocument, editDocument, getDocument, getDocumentsByChild } from 'services/database/Database'
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

export const getOwnerNFTs = async (owner: string): Promise<NFT[]> => {
  return (await getDocumentsByChild(COLLECTION, 'owner', owner)) as NFT[]
}
