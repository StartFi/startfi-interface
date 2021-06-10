import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import { addToWhitelist } from 'services/User/User'
import { addUserDoc, updateUserDoc } from 'services/firebase/firebaseStore'
import { addDraft, getDrafts } from 'services/Storage/Draft'

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

// ADD USER DOCS
export const addUserDocs = createAsyncThunk('user/addDocs', addUserDoc)

// UPDATE USER DOCS
export const updateUserDocs = createAsyncThunk('user/updateDocs', updateUserDoc)

export const saveDraft = createAsyncThunk('user/saveDraft', addDraft)

export const getUserDrafts = createAsyncThunk('user/getUserDrafts', getDrafts)
