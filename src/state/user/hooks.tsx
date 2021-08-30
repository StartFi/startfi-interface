// NOTICE: Kindly keep the old sdk unite we remove the code dependant on it in this file
import { Pair, Token } from '@uniswap/sdk'
import { PopupContent } from './../../constants'
import { useCallback, useEffect, useMemo, useState } from 'react'
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
  getUserNFTsAction,
  removeFromWishlistAction
} from './actions'
import { usePopup } from 'state/application/hooks'

import { Auction } from 'services/models/Auction'

import { useMarketplace, useNFT, useStep } from 'state/marketplace/hooks'
import { AuctionNFT } from 'services/models/AuctionNFT'
import { useHistory } from 'react-router-dom'
import { useDeposit, useGetReserves } from 'hooks/startfiStakes'
import { address as STARTFI_STAKES_ADDRESSS } from '../../constants/abis/StartfiStakes.json'
import { useGetAllowance, useTokenBalance } from 'hooks/startfiToken'

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

export const useWalletAddress = (): string | null | undefined => {
  const { account } = useActiveWeb3React()
  return useMemo(() => account, [account])
}

export const useLogin = () => {
  const account = useWalletAddress()
  const dispatch = useDispatch()
  useEffect(() => {
    if (account) dispatch(loginAction(account))
    else dispatch(logoutAction())
  }, [account, dispatch])
}

export const useUser = (): User | null => {
  return useSelector((state: AppState) => state.user.user)
}

export const useUserAddress = (): string | undefined => {
  const user = useUser()
  return useMemo(() => user?.ethAddress, [user])
}

export const useUserBalance = (): string | undefined => {
  const { account } = useActiveWeb3React()
  const balance = useETHBalances(account ? [account] : [])?.[account ?? '']
  return useMemo(() => balance?.toSignificant(5), [balance])
}

export const useChainId = (): number | undefined => {
  const { chainId } = useActiveWeb3React()
  return useMemo(() => chainId, [chainId])
}

export const useSaveDraft = (): (() => void) => {
  const dispatch = useDispatch()
  const user = useUserAddress()
  const popup = usePopup()
  const step = useStep()
  const history = useHistory()
  const draft = useNFT()
  return useCallback(() => {
    if (step < 2 || !draft) return popup({ success: false, message: 'cannotAddDraft' })
    if (!user) return popup({ success: false, message: 'connectWallet' })
    const drafts = [draft]
    if (step < 6) dispatch(saveDraftAction({ user, drafts }))
    else history.push('/inventory/off-market/' + draft.id)
  }, [history, step, user, draft, popup, dispatch])
}

const useAddToWishlist = (nftId: number): (() => void) => {
  const dispatch = useDispatch()
  const userId = useUserAddress()
  const popup = usePopup()
  return useCallback(() => {
    if (userId) dispatch(addToWishlistAction({ userId, nftId }))
    else popup({ success: false, message: 'connectWallet' })
  }, [nftId, userId, popup, dispatch])
}

const useRemoveFromWishlist = (nftId: number): (() => void) => {
  const dispatch = useDispatch()
  const userId = useUserAddress()
  const popup = usePopup()
  return useCallback(() => {
    if (userId) dispatch(removeFromWishlistAction({ userId, nftId }))
    else popup({ success: false, message: 'connectWallet' })
  }, [nftId, userId, popup, dispatch])
}

const useIsNFTWishlist = (nftId: number): boolean => {
  const user = useUser()
  return useMemo(() => (user && user.wishlist ? user.wishlist.includes(nftId) : false), [nftId, user])
}

export const useWishlist = (nftId: number) => {
  const addToWishlist = useAddToWishlist(nftId)
  const removeFromWishlist = useRemoveFromWishlist(nftId)
  const isWishlist = useIsNFTWishlist(nftId)
  return useMemo(() => {
    return { addToWishlist, removeFromWishlist, isWishlist }
  }, [isWishlist, addToWishlist, removeFromWishlist])
}

export const useGetInventory = () => {
  const dispatch = useDispatch()
  const owner = useUserAddress()
  const chainId = useChainId()

  const popup = usePopup()
  return useCallback(
    () =>
      owner && chainId
        ? (dispatch(getUserNFTsAction({ owner, chainId })), dispatch(getDraftsAction(owner)))
        : popup({ success: false, message: 'connectWallet' }),
    [owner, chainId, popup, dispatch]
  )
}

// get user Wishlist AuctionNft
export const useUserWishList = (): AuctionNFT[] => {
  const user = useUser()
  const marketPlace = useMarketplace()
  return useMemo(() => {
    return marketPlace.filter(e => {
      return user?.wishlist.includes(e.nft.id)
    })
  }, [user, marketPlace])
}

// remove item from wishlist
export const useRemoveWishlistItem = (nftId: number) => {
  const dispatch = useDispatch()
  const userId = useUserAddress()
  const popup = usePopup()
  return useCallback(() => {
    if (userId) dispatch(removeFromWishlistAction({ userId, nftId }))
    else popup({ success: false, message: 'connectWallet' })
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
  return useMemo(() => userDrafts?.filter(draft => draft.id === draftId)[0], [draftId, userDrafts])
}

// get onMarket state
export const useOnMarket = (): NFT[] => {
  return useSelector((state: AppState) => state.user.onMarket)
}

// get onMarket single item
export const useOnMarketItem = (nftId: string): NFT => {
  const onMarket: NFT[] = useOnMarket()
  return useMemo(() => onMarket.filter(nft => nft.id === nftId)[0], [onMarket, nftId])
}

// get offMarket state
export const useOffMarket = (): NFT[] => {
  return useSelector((state: AppState) => state.user.offMarket)
}

// get single offMarket item
export const useOffMarketItem = (nftId: string): NFT => {
  const offMarket: NFT[] = useOffMarket()
  return useMemo(() => offMarket.filter(nft => nft.id === nftId)[0], [offMarket, nftId])
}
// get userAuctions
export const useUserAuctions = (): Auction[] => {
  return useSelector((state: AppState) => state.user.userAuctions)
}

// get single Auction
export const useAuctionItem = (nftId: string): Auction => {
  const userAuctions: Auction[] = useUserAuctions()
  return useMemo(() => userAuctions.filter(auction => auction.nft === nftId)[0], [userAuctions, nftId])
}

export const useClearUserPopup = (): (() => void) => {
  const dispatch = useDispatch()
  return useCallback(() => {
    dispatch(clearUserPopup())
  }, [dispatch])
}

export const useGetDrafts = () => {
  const dispatch = useDispatch()
  const user = useUserAddress()
  const popup = usePopup()
  return useCallback(
    () => (user ? dispatch(getDraftsAction(user)) : popup({ success: false, message: 'connectWallet' })),
    [user, popup, dispatch]
  )
}

export const useGetUserNFTs = () => {
  const dispatch = useDispatch()
  const owner = useUserAddress()
  const chainId = useChainId()
  const popup = usePopup()
  return useCallback(
    () =>
      owner && chainId
        ? dispatch(getUserNFTsAction({ owner, chainId }))
        : popup({ success: false, message: 'connectWallet' }),
    [owner, chainId, popup, dispatch]
  )
}

export const useGetOwnerStakes = () => {
  const [getOwnerStakes, setOwnerStakes] = useState<number>(0)
  const owner = useUserAddress()
  const getReserves = useGetReserves()


  useEffect(() => {
    if (owner) {
      getReserves(owner).then(stakes => setOwnerStakes(parseInt(stakes, 16)))
    }



    return () => { }
  }, [owner, getReserves])

  return { getOwnerStakes }
}

export const useGetStakeAllowance = () => {
  const owner = useUserAddress()
  const getAllowance = useGetAllowance()
  const [allowStaking, setAllowStaking] = useState<boolean>(false)
  const [allowedAmount, setAllowedAmount] = useState<number>(0)
  useEffect(() => {
    const getAllow = async () => {
      if (owner) {
        const allowed = await getAllowance(owner, STARTFI_STAKES_ADDRESSS)

        setAllowedAmount(parseInt(allowed))
        console.log("allowed=>",parseInt(allowed))
        if (allowed === '0x00') {
          setAllowStaking(true)
        }
      }
    }
    getAllow()
    return () => { }
  }, [owner, STARTFI_STAKES_ADDRESSS])

  return { allowStaking, allowedAmount }
}
