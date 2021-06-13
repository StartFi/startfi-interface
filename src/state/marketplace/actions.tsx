import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import { buyNFT, getAuctionNFT, getNFTsOnAuction, mintNFT, placeBid } from 'services/Marektplace'

export const getNFTsAction = createAsyncThunk('nfts/getNFTsAction', getNFTsOnAuction)

export const addNFTAction = createAsyncThunk('nfts/addNFTAction', mintNFT)

export const getAuctionNFTAction = createAsyncThunk('nfts/getAuctionNFTAction', getAuctionNFT)

export const placeBidAction = createAsyncThunk('nfts/placeBidAction', placeBid)

export const buyNFTAction = createAsyncThunk('nfts/buyNFTAction', buyNFT)

export const setBidOrBuy = createAction<{ bidOrBuy: boolean; value: number }>('user/setBidOrBuy')

export const setConfirmationLoading = createAction<{ isOpen: boolean }>('user/setConfirmationLoading')
