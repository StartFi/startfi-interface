import { BidItem } from './../Storage/Bids';
import  { update } from './Firebase'


// update bids
export const placeBidItem = async (bidItem:BidItem)=>{
   return await update('/bids/', bidItem.txtHash,bidItem)

}