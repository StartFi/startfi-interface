import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import { addToMarketplace, buyNFT, delistAuction, getAuctionNFT, getMarketplace, mintNFT, placeBid } from 'services/Marketplace'
import { Auction } from 'services/models/Auction'
import { NFT } from 'services/models/NFT'

export const getMarketplaceAction = createAsyncThunk('marketplace/getMarketplaceAction', getMarketplace)

export const mintNFTAction = createAsyncThunk('marketplace/mintNFTAction', mintNFT)

export const addToMarketplaceAction = createAsyncThunk('marketplace/addToMarketplaceAction', addToMarketplace)

export const getAuctionNFTAction = createAsyncThunk('marketplace/getAuctionNFTAction', getAuctionNFT)

export const placeBidAction = createAsyncThunk('marketplace/placeBidAction', placeBid)

export const buyNFTAction = createAsyncThunk('marketplace/buyNFTAction', buyNFT)

export const setBidOrBuy = createAction<{ bidOrBuy: boolean; value: number }>('marketplace/setBidOrBuy')

export const clearMarketplacePopup = createAction<void>('marketplace/clearMarketplacePopup')

export const saveNFT = createAction<{ nft: NFT }>('marketplace/saveNFT')

export const saveAuction = createAction<{ auction: Auction }>('marketplace/saveAuction')

export const clearNFT = createAction('marketplace/clearNFT')

export const delistAuctionAction = createAsyncThunk('marketplace/delistAuctionAction', delistAuction)
