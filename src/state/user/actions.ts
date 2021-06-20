import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import { getNFTsOnAuction } from 'services/Marketplace'

import { getDrafts, saveDraft } from 'services/User'
import { addToWhitelist } from 'services/User/User'


export interface SerializedToken {
  chainId: number
  address: string
  decimals: number
  symbol?: string
  name?: string
}

export interface SerializedPair {
  token0: SerializedToken
  token1: SerializedToken
}

export const updateMatchesDarkMode = createAction<{ matchesDarkMode: boolean }>('user/updateMatchesDarkMode')
export const updateUserDarkMode = createAction<{ userDarkMode: boolean }>('user/updateUserDarkMode')
export const updateUserExpertMode = createAction<{ userExpertMode: boolean }>('user/updateUserExpertMode')
export const updateUserSingleHopOnly = createAction<{ userSingleHopOnly: boolean }>('user/updateUserSingleHopOnly')
export const updateUserSlippageTolerance = createAction<{ userSlippageTolerance: number }>(
  'user/updateUserSlippageTolerance'
)
export const updateUserDeadline = createAction<{ userDeadline: number }>('user/updateUserDeadline')
export const addSerializedToken = createAction<{ serializedToken: SerializedToken }>('user/addSerializedToken')
export const removeSerializedToken = createAction<{ chainId: number; address: string }>('user/removeSerializedToken')
export const addSerializedPair = createAction<{ serializedPair: SerializedPair }>('user/addSerializedPair')
export const removeSerializedPair = createAction<{ chainId: number; tokenAAddress: string; tokenBAddress: string }>(
  'user/removeSerializedPair'
)
export const toggleURLWarning = createAction<void>('app/toggleURLWarning')

export const whitelistNFT = createAsyncThunk('nfts/getNFTs', addToWhitelist)

export const saveDraftAction = createAsyncThunk('user/saveDraftAction', saveDraft)


export const getUserDraftsAction =createAsyncThunk('user/getDraftsAction',getDrafts)
export const getUserInMarketInventoryAction =createAsyncThunk('user/getInMarketInventoryAction',getNFTsOnAuction )
