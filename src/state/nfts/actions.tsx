import { createAsyncThunk } from '@reduxjs/toolkit'
import { addNft } from 'services/firebase/firebaseStore'
import { getAll } from 'services/Storage/NFT'


export const getNFTs = createAsyncThunk('nfts/getNFTs', getAll)


// add/update nft
export const addNFT =createAsyncThunk('nftS/addNFT',addNft )



