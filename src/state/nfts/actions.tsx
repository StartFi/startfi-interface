import { createAsyncThunk } from '@reduxjs/toolkit'
import { getAll, mint } from 'services/Storage/NFT'

export const getNFTs = createAsyncThunk('nfts/getNFTs', getAll)

export const addNFT = createAsyncThunk('nfts/addNFT', mint)
