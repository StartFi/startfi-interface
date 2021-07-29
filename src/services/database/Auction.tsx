import { Dictionary } from './../../constants'
import { addDocument, editDocument, getDocument, getDocuments, getDocumentsPaginated } from 'services/database/Database'
import { Auction } from 'services/models/Auction'

const COLLECTION = 'auctions'

export const addAuction = async (auction: Auction): Promise<string> => {
  return addDocument(COLLECTION, auction.id, auction)
}

export const getAuction = async (auctionId: string): Promise<Auction> => {
  return (await getDocument(COLLECTION, auctionId)) as Auction
}

export const editAuction = async (auction: any): Promise<string> => {
  return editDocument(COLLECTION, auction.id, auction)
}

export const getAuctions = async (filters: Dictionary, orders?: Dictionary): Promise<Auction[]> => {
  return (await getDocuments(COLLECTION, filters, orders)) as Auction[]
}

export const getAuctionsPaginated = async (
  filters: Dictionary,
  orders?: Dictionary,
  lastVisible?: any
): Promise<any> => {
  return getDocumentsPaginated(COLLECTION, filters, orders, lastVisible)
}

export const addBidToAuction = async (auctionId: string, bidId: string): Promise<string> => {
  const oldAuction = (await getDocument(COLLECTION, auctionId)) as Auction
  if (oldAuction) {
    const newAuction = { ...oldAuction }
    if (newAuction.bids) newAuction.bids.push(bidId)
    else newAuction.bids = [bidId]
    return editDocument(COLLECTION, newAuction.id, newAuction)
  }
  return 'No auction'
}
