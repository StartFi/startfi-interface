import { NftInterface } from '../Nft/initial'
import { createAction } from '@reduxjs/toolkit'

export const addToDraft = createAction<{ nft: NftInterface }>('inventory/draft')
export const addToMyNft = createAction<{ nft: NftInterface }>('inventory/offMarketplace')
export const addMyNftOnMarketplace = createAction<{ nft: NftInterface }>('inventory/onMarketplace')
