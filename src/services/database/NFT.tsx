import { addDocument, editDocument, getDocument, getDocumentsByChild } from 'services/database/Database'
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
