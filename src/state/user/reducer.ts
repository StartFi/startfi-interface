import { INITIAL_ALLOWED_SLIPPAGE, DEFAULT_DEADLINE_FROM_NOW, PopupContent } from '../../constants'
import { createReducer } from '@reduxjs/toolkit'
import { updateVersion } from '../global/actions'
import {
  addSerializedPair,
  addSerializedToken,
  removeSerializedPair,
  removeSerializedToken,
  SerializedPair,
  SerializedToken,
  updateMatchesDarkMode,
  updateUserDarkMode,
  updateUserExpertMode,
  updateUserSlippageTolerance,
  updateUserDeadline,
  toggleURLWarning,
  updateUserSingleHopOnly,
  saveDraftAction,
  loginAction,
  addToWishlistAction,
  clearUserPopup,
  logoutAction,
  getDraftsAction,
  getUserNFTsAction,
  removeFromWishlistAction
} from './actions'
import { User } from 'services/models/User'
import { NFT } from 'services/models/NFT'
import { Auction } from 'services/models/Auction'

const currentTimestamp = () => new Date().getTime()

export interface UserState {
  // the timestamp of the last updateVersion action
  lastUpdateVersionTimestamp?: number

  userDarkMode: boolean | null // the user's choice for dark mode or light mode
  matchesDarkMode: boolean // whether the dark mode media query matches

  userExpertMode: boolean

  userSingleHopOnly: boolean // only allow swaps on direct pairs

  // user defined slippage tolerance in bips, used in all txns
  userSlippageTolerance: number

  // deadline set by user in minutes, used in all txns
  userDeadline: number

  tokens: {
    [chainId: number]: {
      [address: string]: SerializedToken
    }
  }

  pairs: {
    [chainId: number]: {
      // keyed by token0Address:token1Address
      [key: string]: SerializedPair
    }
  }

  timestamp: number
  URLWarningVisible: boolean

  user: User | null
  popup: PopupContent | null
  drafts: NFT[]
  onMarket: NFT[]
  offMarket: NFT[]
  userAuctions: Auction[]
}

function pairKey(token0Address: string, token1Address: string) {
  return `${token0Address};${token1Address}`
}

export const initialState: UserState = {
  userDarkMode: null,
  matchesDarkMode: false,
  userExpertMode: false,
  userSingleHopOnly: false,
  userSlippageTolerance: INITIAL_ALLOWED_SLIPPAGE,
  userDeadline: DEFAULT_DEADLINE_FROM_NOW,
  tokens: {},
  user: null,
  pairs: {},
  timestamp: currentTimestamp(),
  URLWarningVisible: true,
  popup: null,
  drafts: [],
  onMarket: [],
  offMarket: [],
  userAuctions: []
}

export default createReducer(initialState, builder =>
  builder
    .addCase(updateVersion, state => {
      // slippage isnt being tracked in local storage, reset to default
      // noinspection SuspiciousTypeOfGuard
      if (typeof state.userSlippageTolerance !== 'number') {
        state.userSlippageTolerance = INITIAL_ALLOWED_SLIPPAGE
      }

      // deadline isnt being tracked in local storage, reset to default
      // noinspection SuspiciousTypeOfGuard
      if (typeof state.userDeadline !== 'number') {
        state.userDeadline = DEFAULT_DEADLINE_FROM_NOW
      }

      state.lastUpdateVersionTimestamp = currentTimestamp()
    })
    .addCase(updateUserDarkMode, (state, action) => {
      state.userDarkMode = action.payload.userDarkMode
      state.timestamp = currentTimestamp()
    })
    .addCase(updateMatchesDarkMode, (state, action) => {
      state.matchesDarkMode = action.payload.matchesDarkMode
      state.timestamp = currentTimestamp()
    })
    .addCase(updateUserExpertMode, (state, action) => {
      state.userExpertMode = action.payload.userExpertMode
      state.timestamp = currentTimestamp()
    })
    .addCase(updateUserSlippageTolerance, (state, action) => {
      state.userSlippageTolerance = action.payload.userSlippageTolerance
      state.timestamp = currentTimestamp()
    })
    .addCase(updateUserDeadline, (state, action) => {
      state.userDeadline = action.payload.userDeadline
      state.timestamp = currentTimestamp()
    })
    .addCase(updateUserSingleHopOnly, (state, action) => {
      state.userSingleHopOnly = action.payload.userSingleHopOnly
    })
    .addCase(addSerializedToken, (state, { payload: { serializedToken } }) => {
      if (!state.tokens) {
        state.tokens = {}
      }
      state.tokens[serializedToken.chainId] = state.tokens[serializedToken.chainId] || {}
      state.tokens[serializedToken.chainId][serializedToken.address] = serializedToken
      state.timestamp = currentTimestamp()
    })
    .addCase(removeSerializedToken, (state, { payload: { address, chainId } }) => {
      if (!state.tokens) {
        state.tokens = {}
      }
      state.tokens[chainId] = state.tokens[chainId] || {}
      delete state.tokens[chainId][address]
      state.timestamp = currentTimestamp()
    })
    .addCase(addSerializedPair, (state, { payload: { serializedPair } }) => {
      if (
        serializedPair.token0.chainId === serializedPair.token1.chainId &&
        serializedPair.token0.address !== serializedPair.token1.address
      ) {
        const chainId = serializedPair.token0.chainId
        state.pairs[chainId] = state.pairs[chainId] || {}
        state.pairs[chainId][pairKey(serializedPair.token0.address, serializedPair.token1.address)] = serializedPair
      }
      state.timestamp = currentTimestamp()
    })
    .addCase(removeSerializedPair, (state, { payload: { chainId, tokenAAddress, tokenBAddress } }) => {
      if (state.pairs[chainId]) {
        // just delete both keys if either exists
        delete state.pairs[chainId][pairKey(tokenAAddress, tokenBAddress)]
        delete state.pairs[chainId][pairKey(tokenBAddress, tokenAAddress)]
      }
      state.timestamp = currentTimestamp()
    })
    .addCase(toggleURLWarning, state => {
      state.URLWarningVisible = !state.URLWarningVisible
    })
    .addCase(loginAction.pending, (state, action) => {})
    .addCase(loginAction.fulfilled, (state, action) => {
      state.user = action.payload
    })
    .addCase(loginAction.rejected, (state, action) => {})
    .addCase(logoutAction, (state, action) => {
      state.user = null
    })
    .addCase(addToWishlistAction.pending, (state, action) => {})
    .addCase(addToWishlistAction.fulfilled, (state, action) => {
      const success = action.payload.addedToWishlist === 'success'
      state.popup = {
        success,
        message: success ? 'NFT added to wishlist successfully' : action.payload.addedToWishlist
      }
      state.user = action.payload.user
    })
    .addCase(addToWishlistAction.rejected, (state, action) => {
      state.popup = { success: false, message: action.error.message || 'Error occured while adding NFT to wishlist' }
    })
    .addCase(removeFromWishlistAction.pending, (state, action) => {})
    .addCase(removeFromWishlistAction.fulfilled, (state, action) => {
      const success = action.payload.removedWishlistItem === 'success'
      state.popup = {
        success,
        message: success ? 'NFT removed from wishlist successfully' : action.payload.removedWishlistItem
      }
      state.user = action.payload.user
    })
    .addCase(removeFromWishlistAction.rejected, (state, action) => {
      state.popup = { success: false, message: action.error.message || 'Error occured while adding NFT to wishlist' }
    })
    .addCase(saveDraftAction.pending, (state, action) => {})
    .addCase(saveDraftAction.fulfilled, (state, action) => {
      const success = action.payload.status === 'success'
      state.popup = {
        success,
        type: 'SaveDraft',
        message: success ? 'Draft saved successfully' : action.payload.draftAdded
      }
    })
    .addCase(saveDraftAction.rejected, (state, action) => {
      state.popup = { success: false, message: action.error.message || 'Error occured while saving NFT to drafts' }
    })
    .addCase(clearUserPopup, (state, action) => {
      state.popup = null
    })
    .addCase(getDraftsAction.pending, (state, action) => {})
    .addCase(getDraftsAction.fulfilled, (state, action) => {
      state.drafts = action.payload.drafts
    })
    .addCase(getDraftsAction.rejected, (state, action) => {
      state.popup = { success: false, message: action.error.message || 'Error occured while saving NFT to drafts' }
    })
    .addCase(getUserNFTsAction.pending, (state, action) => {})
    .addCase(getUserNFTsAction.fulfilled, (state, action) => {
      state.onMarket = action.payload.onMarket
      state.offMarket = action.payload.offMarket
      state.userAuctions = action.payload.userAuctions
    })
    .addCase(getUserNFTsAction.rejected, (state, action) => {
      state.popup = { success: false, message: action.error.message || 'Error occured while saving NFT to drafts' }
    })
)
