import { createAsyncThunk } from '@reduxjs/toolkit'
import { getAll } from 'services/Storage/NFT'

export const getNFTs = createAsyncThunk('nfts/getNFTs', getAll)
