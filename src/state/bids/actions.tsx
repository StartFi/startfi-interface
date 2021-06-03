import { createAsyncThunk } from "@reduxjs/toolkit";
import { placeBid } from "services/Storage/Bids";


export const addBid =createAsyncThunk('bids/placeBid',placeBid)