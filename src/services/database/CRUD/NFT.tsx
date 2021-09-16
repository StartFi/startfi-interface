import { Dictionary } from '../../../constants'
import { addDocument, editDocument, getDocument, getDocuments } from './Database'
import { NFT } from '../models/NFT'

const COLLECTION = 'nfts'

export const addNFT = async (nft: NFT): Promise<string> => {
  return addDocument(COLLECTION, nft.id, nft)
}

export const getNFT = async (id: any): Promise<NFT> => {
  return (await getDocument(COLLECTION, id)) as NFT
}

export const editNFT = async (nft: any): Promise<string> => {
  return editDocument(COLLECTION, nft.id, nft)
}

export const getNFTs = async (filters: Dictionary): Promise<NFT[]> => {
  return (await getDocuments(COLLECTION, filters)) as NFT[]
}
