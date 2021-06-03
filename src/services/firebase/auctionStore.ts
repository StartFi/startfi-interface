import { AuctionItem } from './../Storage/Auction';
import firebase from './firebaseConfig'


// update auction item
export const AddAuctionItem= async(auctionItem:AuctionItem)=>{
    const auctionReference = firebase.database().ref('/auction/' + auctionItem.listingTxt)
    return await auctionReference.update(auctionItem)
}