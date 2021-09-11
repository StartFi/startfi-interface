import { Dictionary } from '../../constants'
import { addDocument, getDocuments } from 'services/database/Database'
import { Bid } from 'services/models/Bid'

const COLLECTION = 'bids'

export const addBid = async (bid: Bid): Promise<string> => {
  return addDocument(COLLECTION, bid.id, bid)
}
export const getBids = async (filters: Dictionary, orders?: Dictionary): Promise<Bid[]> => {
  return (await getDocuments(COLLECTION, filters, orders)) as Bid[]
}
