import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import { buyNFT, getAuctionNFT, getNFTsOnAuction, mintNFT, placeBid } from 'services/Marketplace'

export const getNFTsAction = createAsyncThunk('marketplace/getNFTsAction', getNFTsOnAuction)

export const addNFTAction = createAsyncThunk('marketplace/addNFTAction', mintNFT)

export const getAuctionNFTAction = createAsyncThunk('marketplace/getAuctionNFTAction', getAuctionNFT)

export const placeBidAction = createAsyncThunk('marketplace/placeBidAction', placeBid)

export const buyNFTAction = createAsyncThunk('marketplace/buyNFTAction', buyNFT)

export const setBidOrBuy = createAction<{ bidOrBuy: boolean; value: number }>('marketplace/setBidOrBuy')

export const setConfirmationLoading = createAction<{ isOpen: boolean }>('marketplace/setConfirmationLoading')
