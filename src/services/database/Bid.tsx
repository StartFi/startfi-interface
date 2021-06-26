import { addDocument } from 'services/database/Database'
import { Bid } from 'services/models/Bid'

const COLLECTION = 'bids'

export const addBid = async (bid: Bid): Promise<string> => {
  return addDocument(COLLECTION, bid.id, bid)
}
