// NOTICE: Kindly keep the old sdk unite we remove the code dependant on it in this file
import { Pair, Token } from '@uniswap/sdk'

import { InventoryOptions } from 'components/invHome/CardHeader'

import { PopupContent } from './../../constants'
import { useCallback, useEffect, useMemo } from 'react'

import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { NFT } from 'services/models/NFT'
import { User } from 'services/models/User'
import { useETHBalances } from 'state/wallet/hooks'
import { ChainId } from '../../constants/supportedChains'
import { useActiveWeb3React } from '../../hooks'
import { AppDispatch, AppState } from '../index'
import {
  addSerializedPair,
  addSerializedToken,
  removeSerializedToken,
  SerializedPair,
  SerializedToken,
  updateUserDarkMode,
  updateUserDeadline,
  updateUserExpertMode,
  updateUserSlippageTolerance,
  toggleURLWarning,
  updateUserSingleHopOnly,
  saveDraftAction,
  loginAction,
  addToWishlistAction,
  clearUserPopup,
  logoutAction,
  getDraftsAction,
  getUserNFTsAction
} from './actions'
import { usePopup } from 'state/application/hooks'

function serializeToken(token: Token): SerializedToken {
  return {
    chainId: token.chainId,
    address: token.address,
    decimals: token.decimals,
    symbol: token.symbol,
    name: token.name
  }
}

function deserializeToken(serializedToken: SerializedToken): Token {
  return new Token(
    serializedToken.chainId,
    serializedToken.address,
    serializedToken.decimals,
    serializedToken.symbol,
    serializedToken.name
  )
}

export function useIsDarkMode(): boolean {
  const { userDarkMode, matchesDarkMode } = useSelector<
    AppState,
    { userDarkMode: boolean | null; matchesDarkMode: boolean }
  >(
    ({ user: { matchesDarkMode, userDarkMode } }) => ({
      userDarkMode,
      matchesDarkMode
    }),
    shallowEqual
  )

  return userDarkMode === null ? matchesDarkMode : userDarkMode
}

export function useDarkModeManager(): [boolean, () => void] {
  const dispatch = useDispatch<AppDispatch>()
  const darkMode = useIsDarkMode()

  const toggleSetDarkMode = useCallback(() => {
    dispatch(updateUserDarkMode({ userDarkMode: !darkMode }))
  }, [darkMode, dispatch])

  return [darkMode, toggleSetDarkMode]
}

export function useIsExpertMode(): boolean {
  return useSelector<AppState, AppState['user']['userExpertMode']>(state => state.user.userExpertMode)
}

export function useExpertModeManager(): [boolean, () => void] {
  const dispatch = useDispatch<AppDispatch>()
  const expertMode = useIsExpertMode()

  const toggleSetExpertMode = useCallback(() => {
    dispatch(updateUserExpertMode({ userExpertMode: !expertMode }))
  }, [expertMode, dispatch])

  return [expertMode, toggleSetExpertMode]
}

export function useUserSingleHopOnly(): [boolean, (newSingleHopOnly: boolean) => void] {
  const dispatch = useDispatch<AppDispatch>()

  const singleHopOnly = useSelector<AppState, AppState['user']['userSingleHopOnly']>(
    state => state.user.userSingleHopOnly
  )

  const setSingleHopOnly = useCallback(
    (newSingleHopOnly: boolean) => {
      dispatch(updateUserSingleHopOnly({ userSingleHopOnly: newSingleHopOnly }))
    },
    [dispatch]
  )

  return [singleHopOnly, setSingleHopOnly]
}

export function useUserSlippageTolerance(): [number, (slippage: number) => void] {
  const dispatch = useDispatch<AppDispatch>()
  const userSlippageTolerance = useSelector<AppState, AppState['user']['userSlippageTolerance']>(state => {
    return state.user.userSlippageTolerance
  })

  const setUserSlippageTolerance = useCallback(
    (userSlippageTolerance: number) => {
      dispatch(updateUserSlippageTolerance({ userSlippageTolerance }))
    },
    [dispatch]
  )

  return [userSlippageTolerance, setUserSlippageTolerance]
}

export function useUserTransactionTTL(): [number, (slippage: number) => void] {
  const dispatch = useDispatch<AppDispatch>()
  const userDeadline = useSelector<AppState, AppState['user']['userDeadline']>(state => {
    return state.user.userDeadline
  })

  const setUserDeadline = useCallback(
    (userDeadline: number) => {
      dispatch(updateUserDeadline({ userDeadline }))
    },
    [dispatch]
  )

  return [userDeadline, setUserDeadline]
}

export function useAddUserToken(): (token: Token) => void {
  const dispatch = useDispatch<AppDispatch>()
  return useCallback(
    (token: Token) => {
      dispatch(addSerializedToken({ serializedToken: serializeToken(token) }))
    },
    [dispatch]
  )
}

export function useRemoveUserAddedToken(): (chainId: number, address: string) => void {
  const dispatch = useDispatch<AppDispatch>()
  return useCallback(
    (chainId: number, address: string) => {
      dispatch(removeSerializedToken({ chainId, address }))
    },
    [dispatch]
  )
}

export function useUserAddedTokens(): Token[] {
  const { chainId } = useActiveWeb3React()
  const serializedTokensMap = useSelector<AppState, AppState['user']['tokens']>(({ user: { tokens } }) => tokens)

  return useMemo(() => {
    if (!chainId) return []
    return Object.values(serializedTokensMap?.[chainId as ChainId] ?? {}).map(deserializeToken)
  }, [serializedTokensMap, chainId])
}

function serializePair(pair: Pair): SerializedPair {
  return {
    token0: serializeToken(pair.token0),
    token1: serializeToken(pair.token1)
  }
}

export function usePairAdder(): (pair: Pair) => void {
  const dispatch = useDispatch<AppDispatch>()

  return useCallback(
    (pair: Pair) => {
      dispatch(addSerializedPair({ serializedPair: serializePair(pair) }))
    },
    [dispatch]
  )
}

export function useURLWarningVisible(): boolean {
  return useSelector((state: AppState) => state.user.URLWarningVisible)
}

export function useURLWarningToggle(): () => void {
  const dispatch = useDispatch()
  return useCallback(() => dispatch(toggleURLWarning()), [dispatch])
}

export const useUserBalance = (): string | undefined => {
  const { account } = useActiveWeb3React()

  const balance = useETHBalances(account ? [account] : [])?.[account ?? '']

  return balance?.toSignificant(5)
}

export const useUser = (): User | null => {
  return useSelector((state: AppState) => state.user.user)
}

export const useUserAddress = () => {
  const user = useUser()
  return useMemo(() => user?.ethAddress, [user])
}

export const useWalletAddress = () => {
  const { account } = useActiveWeb3React()
  return useMemo(() => account, [account])
}

export const useSaveDraft = () => {
  const dispatch = useDispatch()
  const user = useUserAddress()
  const popup = usePopup()
  return useCallback(
    (draft: NFT) => {
      const drafts = [draft]
      if (user) dispatch(saveDraftAction({ user, drafts }))
      else popup({ success: false, message: 'Connect wallet' })
    },
    [user, popup, dispatch]
  )
}

// export const useGetUseDrafts = (type: string) => {
//   const dispatch = useDispatch()
//   const user = useUserAddress()

//   return useEffect(() => {
//     // if (user&&type===InventoryOptions.Draft){
//     //   dispatch(getUserDraftsAction(user))
//     // }
//     // if (user&&type === InventoryOptions.inMarketPlace){
//     //   dispatch(getUserInMarketInventoryAction())
//     // }
//   }, [user, dispatch, type])
// }

// export const useGetDrafts = () => {
//   const dispatch = useDispatch()
//   const user = useUserAddress()
//   const popup = usePopup()
//   console.log('getDraft Action')
//   return useCallback(
//     () => (user ? dispatch(getDraftsAction(user)) : popup({ success: false, message: 'Connect wallet' })),
//     [user, popup, dispatch]
//   )
// }

// export const useGetUserNFTs = () => {
//   const dispatch = useDispatch()
//   const user = useUserAddress()
//   const popup = usePopup()
//   return useCallback(
//     () => (user ? dispatch(getUserNFTsAction(user)) : popup({ success: false, message: 'Connect wallet' })),
//     [user, popup, dispatch]
//   )
// }

export const useGetInventory = () => {
  const dispatch = useDispatch()
  const user = useUserAddress()
  const popup = usePopup()
  return useCallback(
    () =>
      user
        ? (dispatch(getUserNFTsAction(user)), dispatch(getDraftsAction(user)))
        : popup({ success: false, message: 'Connect wallet' }),
    [user, popup, dispatch]
  )
}

// return inventory  item according to selected type
export const useInventory = (type: string) => {
  return useSelector((state: AppState) => {
    let selectedInventory
    if (type === InventoryOptions.Draft) {
      selectedInventory = state.user.drafts
    }

    if (type === InventoryOptions.inMarketPlace) {
      selectedInventory = state.user.onMarket
    }
    if (type === InventoryOptions.offMarketPlace) {
      selectedInventory = state.user.offMarket
    }

    return selectedInventory
  })
}

export const useLogin = () => {
  const account = useWalletAddress()
  const dispatch = useDispatch()
  return useEffect(() => {
    if (account) dispatch(loginAction(account))
    else dispatch(logoutAction())
  }, [account, dispatch])
}

export const useAddToWishlist = (nftId: number) => {
  const dispatch = useDispatch()
  const userId = useUserAddress()
  const popup = usePopup()
  return useCallback(() => {
    if (userId) dispatch(addToWishlistAction({ userId, nftId }))
    else popup({ success: false, message: 'Connect wallet' })
  }, [nftId, userId, popup, dispatch])
}

export const useUserPopup = (): PopupContent | null => {
  return useSelector((state: AppState) => state.user.popup)
}

export const useDrafts = (): NFT[] => {
  return useSelector((state: AppState) => state.user.drafts)
}

// get single draft
export const useDraft = (draftId: number): NFT => {
  const userDrafts: NFT[] = useDrafts()
  return useMemo(() => userDrafts.filter(draft => draft.id === draftId)[0], [draftId, userDrafts])
}

// get onMarket state
export const useOnMarket = (): NFT[] => {
  return useSelector((state: AppState) => state.user.onMarket)
}

// get onMarket single item
export const useOnMarketItem = (nftId: number): NFT => {
  const onMarket:NFT[]= useOnMarket()
  return  useMemo(() => onMarket.filter(nft=>nft.id===nftId)[0],[onMarket,nftId])
}

// get offMarket state
export const useOffMarket = (): NFT[] => {
  return useSelector((state: AppState) => state.user.offMarket)
}

// get single offMarket item
export const useOffMarketItem = (nftId: number): NFT => {
  const offMarket:NFT[]= useOffMarket()
  return  useMemo(() => offMarket.filter(nft=>nft.id===nftId)[0],[offMarket,nftId])
}
export const useClearUserPopup = () => {
  const dispatch = useDispatch()
  return useCallback(() => {
    dispatch(clearUserPopup())
  }, [dispatch])
}

export const useIsNFTWishlist = (nftId: number): boolean => {
  const user = useUser()
  return useMemo(() => (user && user.wishlist ? user.wishlist.includes(nftId) : false), [nftId, user])
}

export const useWishlist = (nftId: number) => {
  const addToWishlist = useAddToWishlist(nftId)
  const isWishlist = useIsNFTWishlist(nftId)
  return useMemo(() => {
    return { addToWishlist, isWishlist }
  }, [addToWishlist, isWishlist])
}

export const useGetDrafts = () => {
  const dispatch = useDispatch()
  const user = useUserAddress()
  const popup = usePopup()
  return useCallback(
    () => (user ? dispatch(getDraftsAction(user)) : popup({ success: false, message: 'Connect wallet' })),
    [user, popup, dispatch]
  )
}

export const useGetUserNFTs = () => {
  const dispatch = useDispatch()
  const user = useUserAddress()
  const popup = usePopup()
  return useCallback(
    () => (user ? dispatch(getUserNFTsAction(user)) : popup({ success: false, message: 'Connect wallet' })),
    [user, popup, dispatch]
  )
}
