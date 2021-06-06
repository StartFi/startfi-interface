import { update } from 'services/firebase/Firebase';
import { AuctionItem } from './../Storage/Auction';



// update auction item
export const AddAuctionItem= async(auctionItem:AuctionItem)=>{
    return await update('/auction/',auctionItem.listingTxt,auctionItem)
}




