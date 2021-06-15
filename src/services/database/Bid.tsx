import { addDocument } from 'services/database/Database'
import { Bid } from 'services/models/Bid'

const ENTITY = 'bids'

export const addBid = async (bid: Bid): Promise<string> => {
  return addDocument(ENTITY, bid.id, bid)
}
