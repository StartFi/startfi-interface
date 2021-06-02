import { createAsyncThunk } from "@reduxjs/toolkit";
import { addToAuction } from "services/Storage/Auction";


export const addAuctionItem = createAsyncThunk('auction/addItem',addToAuction)