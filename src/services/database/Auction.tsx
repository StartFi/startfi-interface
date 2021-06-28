import { addDocument, editDocument, getDocument, getDocumentsByChild } from 'services/database/Database'
import { Auction } from 'services/models/Auction'

const ENTITY = 'auctions'



export const getAuctionByNFT = async (nftId: number): Promise<Auction> => {
  const auctions = (await getDocumentsByChild(ENTITY, 'nft', nftId)) as Auction[]
  //Logic
  return auctions[auctions.length - 1]
}

export const addAuction = async (auction: Auction): Promise<string> => {
  return addDocument(ENTITY, auction.id, auction)
}

export const editAuction = async (auction: any): Promise<string> => {
  return editDocument(ENTITY, auction.id, auction)
}

export const getOpenAuctions = async (): Promise<Auction[]> => {
  return (await getDocumentsByChild(ENTITY, 'status', 'open')) as Auction[]
}

export const getNFTAuctions = async (nftId: number): Promise<Auction[]> => {
  return (await getDocumentsByChild(ENTITY, 'nft', nftId)) as Array<Auction>
}

export const addBidToAuction = async (auctionId: string, bidId: string): Promise<string> => {
  const oldAuction = (await getDocument(ENTITY, auctionId)) as Auction
  if (oldAuction) {
    const newAuction = { ...oldAuction }
    if (newAuction.bids) newAuction.bids.push(bidId)
    else newAuction.bids = [bidId]
    return editDocument(ENTITY, newAuction.id, newAuction)
  }
  return 'No auction'
}
