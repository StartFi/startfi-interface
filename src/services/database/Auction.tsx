import { editDocument, getDocument, getDocumentsByChild } from 'services/database/Database'
import { Auction } from 'services/models/Auction'

const ENTITY = 'auctions'

export const getAuctionByNFT = async (nftId: number): Promise<Auction> => {
  const auctions = (await getDocumentsByChild(ENTITY, 'nft', nftId)) as Auction[]
  //Logic
  return auctions[auctions.length - 1]
}

export const editAuction = async (auction: any): Promise<string> => {
  const oldAuction = await getDocument(ENTITY, auction.id)
  if (oldAuction) {
    const newAuction = { ...oldAuction, ...auction }
    return editDocument(ENTITY, newAuction.id, newAuction)
  }
  return 'No auction'
}

export const addBidToAuction = async (auctionId: number, bidId: number): Promise<string> => {
  const oldAuction = (await getDocument(ENTITY, auctionId)) as Auction
  if (oldAuction) {
    var newAuction = { ...oldAuction }
    if (newAuction.bids) newAuction.bids.push(bidId)
    else newAuction.bids = [bidId]
    return editDocument(ENTITY, newAuction.id, newAuction)
  }
  return 'No auction'
}
