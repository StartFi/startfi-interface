import { createAction, createAsyncThunk } from '@reduxjs/toolkit'

import { addToWishlist, getDrafts, getUserNFTs, login, removeFromWishlist, saveDraft } from 'services/User'

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

export const clearError = createAction<void>('user/clearError')
export const clearSuccess = createAction<void>('user/clearSuccess')

export const loginAction = createAsyncThunk('user/loginAction', login)

export const logoutAction = createAction<void>('user/logoutAction')

export const updateStakeBalance= createAction<{stakeBalance:number}>('user/balance')


export const addToWishlistAction = createAsyncThunk('user/addToWishlistAction', addToWishlist)

export const removeFromWishlistAction = createAsyncThunk('user/removeFromWishlistAction', removeFromWishlist)

export const saveDraftAction = createAsyncThunk('user/saveDraftAction', saveDraft)

export const clearUserPopup = createAction<void>('user/clearUserPopup')

export const getDraftsAction = createAsyncThunk('marketplace/getDraftsAction', getDrafts)

export const getUserNFTsAction = createAsyncThunk('marketplace/getUserNFTsAction', getUserNFTs)
