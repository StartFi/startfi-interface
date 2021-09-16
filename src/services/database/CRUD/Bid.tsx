import { Dictionary } from '../../../constants'
import { addDocument, getDocuments } from './Database'
import { Bids } from '../models/Bid'

const COLLECTION = 'bids'

export const addBid = async (bid: Bids): Promise<string> => {
  return addDocument(COLLECTION, bid.bidId, bid)
}
export const getBids = async (filters: Dictionary, orders?: Dictionary): Promise<Bids[]> => {
  return (await getDocuments(COLLECTION, filters, orders)) as Bids[]
}
