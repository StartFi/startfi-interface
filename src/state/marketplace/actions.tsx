import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import { buyNFT, getAuctionNFT, getNft,getNFTsOnAuction, mintNFT, placeBid } from 'services/Marketplace'

export const getNFTsAction = createAsyncThunk('nfts/getNFTsAction', getNFTsOnAuction)

export const addNFTAction = createAsyncThunk('nfts/addNFTAction', mintNFT)

export const getAuctionNFTAction = createAsyncThunk('nfts/getAuctionNFTAction', getAuctionNFT)

export const placeBidAction = createAsyncThunk('nfts/placeBidAction', placeBid)

export const buyNFTAction = createAsyncThunk('nfts/buyNFTAction', buyNFT)

export const setBidOrBuy = createAction<{ bidOrBuy: boolean; value: number }>('user/setBidOrBuy')

export const setConfirmationLoading = createAction<{ isOpen: boolean }>('user/setConfirmationLoading')

// get single NFT DETAILS  Action
export const getNFTDetailsAction = createAsyncThunk('nfts/getNft', getNft)
