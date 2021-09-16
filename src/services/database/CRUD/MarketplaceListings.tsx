import { Dictionary } from '../../../constants'
import {
  addDocument,
  editDocument,
  getDocument,
  getDocuments,
  getDocumentsPaginated
} from 'services/database/CRUD/Database'
import { MarketplaceListings } from '../models/MarketplaceListings'
import { Bids } from '../models/Bid'

const COLLECTION = 'marketplaceListings'

export const addListingToMarketplace = async (auction: MarketplaceListings): Promise<string> => {
  return addDocument(COLLECTION, auction.id, auction)
}

export const getListingInMarketplace = async (id: string): Promise<MarketplaceListings> => {
  return (await getDocument(COLLECTION, id)) as MarketplaceListings
}

export const editListingInMarketplace = async (auction: any): Promise<string> => {
  return editDocument(COLLECTION, auction.id, auction)
}

export const getMarketplaceListings = async (
  filters: Dictionary,
  orders?: Dictionary
): Promise<MarketplaceListings[]> => {
  return (await getDocuments(COLLECTION, filters, orders)) as MarketplaceListings[]
}

// TODO : Wrong implementation but skip it for now
export const getBids = async (filters: Dictionary, orders?: Dictionary): Promise<MarketplaceListings[]> => {
  // return (await getDocuments(COLLECTION, filters, orders)) as Bids[]
  return (await getDocuments(COLLECTION, filters, orders)) as MarketplaceListings[]
}

export const getMarketplaceListingsPaginated = async (
  filters: Dictionary,
  orders?: Dictionary,
  lastVisible?: any
): Promise<any> => {
  return getDocumentsPaginated(COLLECTION, filters, orders, lastVisible)
}

export const addBidToAuction = async (auctionId: string, bid: Bids): Promise<string> => {
  const oldAuction = (await getDocument(COLLECTION, auctionId)) as MarketplaceListings
  if (oldAuction) {
    const newAuction = { ...oldAuction }
    // TODO: handle updated bids
    newAuction.auction?.bids.push(bid)
    return editDocument(COLLECTION, newAuction.id, newAuction)
  }
  return 'No Item'
}
