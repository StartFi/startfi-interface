import { createReducer } from "@reduxjs/toolkit";
import { AuctionItem } from "services/Storage/Auction";
import { addAuctionItem } from "./actions";

export interface AuctionState {
    Auction:Array<AuctionItem>;
    itemAdded:boolean;

}

const initialState :AuctionState ={
    Auction:[],
    itemAdded:false
}

export default createReducer(initialState,builder=>
    builder
    .addCase(addAuctionItem.pending,(state,action)=>{})
    .addCase(addAuctionItem.fulfilled,(state,action)=>{
        state.itemAdded=true;
    })
    .addCase(addAuctionItem.rejected,(state,action)=>{})

)