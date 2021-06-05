import { BidItem } from './../Storage/Bids';
import firebase from './Firebase'


// update bids
export const placeBidItem = async (bidItem:BidItem)=>{
    const bidsReference =firebase.database().ref('/bids/' + bidItem.txtHash)
    return await bidsReference.update(bidItem)
}