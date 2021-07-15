import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import { buyNFT, getAuctionNFT, getMarketplace, mintNFT, placeBid } from 'services/Marketplace'

export const getMarketplaceAction = createAsyncThunk('marketplace/getMarketplaceAction', getMarketplace)

export const mintNFTAction = createAsyncThunk('marketplace/mintNFTAction', mintNFT)

export const getAuctionNFTAction = createAsyncThunk('marketplace/getAuctionNFTAction', getAuctionNFT)

export const placeBidAction = createAsyncThunk('marketplace/placeBidAction', placeBid)

export const buyNFTAction = createAsyncThunk('marketplace/buyNFTAction', buyNFT)

export const setBidOrBuy = createAction<{ bidOrBuy: boolean; value: number }>('marketplace/setBidOrBuy')

export const clearMarketplacePopup = createAction<void>('marketplace/clearMarketplacePopup')
