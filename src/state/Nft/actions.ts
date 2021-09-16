import { NftInterface } from './initial'
import { createAction } from '@reduxjs/toolkit'

export const createNft = createAction<{ nft: NftInterface }>('nft/create')
export const editNft = createAction<{ nft: NftInterface }>('nft/edit')
export const deleteNft = createAction<{ id: string }>('nft/delete')
