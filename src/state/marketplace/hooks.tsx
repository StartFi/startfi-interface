import { PopupContent } from './../../constants'
import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NFTQUERY } from 'services/Marketplace'
import { AuctionNFT } from 'services/models/AuctionNFT'
import { Bid } from 'services/models/Bid'
import { NFT } from 'services/models/NFT'
import { AppState } from 'state'
import { useUserAddress } from 'state/user/hooks'
import {
  addNFTAction,
  buyNFTAction,
  clearMarketplacePopup,
  getAuctionNFTAction,
  getNFTsAction,
  placeBidAction,
  setBidOrBuy,
  setConfirmationLoading
} from './actions'

export const useNFTs = (): NFT[] => {
  return useSelector((state: AppState) => state.marketplace.nfts)
}

export const useLoadTime = (): number => {
  return useSelector((state: AppState) => state.marketplace.loadtime)
}

export const useLastSearch = (): string => {
  return useSelector((state: AppState) => state.marketplace.search)
}

export const useLastCategory = (): string => {
  return useSelector((state: AppState) => state.marketplace.category)
}

export const useAuctionNFT = (): AuctionNFT | null => {
  return useSelector((state: AppState) => state.marketplace.auctionNFT)
}

export const useBidOrBuy = (): boolean => {
  return useSelector((state: AppState) => state.marketplace.bidOrBuy)
}

export const useBidOrBuyValue = (): number => {
  return useSelector((state: AppState) => state.marketplace.bidOrBuyValue)
}

export const useConfirmationLoading = (): boolean => {
  return useSelector((state: AppState) => state.marketplace.confirmationLoading)
}

export const useMarketplacePopup = (): PopupContent | null => {
  return useSelector((state: AppState) => state.marketplace.popup)
}

export const useSetBidOrBuy = (): ((bidOrBuy: boolean, value: number) => void) => {
  const dispatch = useDispatch()
  return useCallback((bidOrBuy: boolean, value: number) => dispatch(setBidOrBuy({ bidOrBuy, value })), [dispatch])
}

export const useSetConfirmationLoading = (): ((isOpen: boolean) => void) => {
  const dispatch = useDispatch()
  return useCallback((isOpen: boolean) => dispatch(setConfirmationLoading({ isOpen })), [dispatch])
}

export const useGetNFTs = (): ((query?: NFTQUERY) => void) => {
  const dispatch = useDispatch()
  // const search = useLastSearch()
  // const category = useLastCategory()

  return useCallback(
    (query?: NFTQUERY) => {
      let q = query || {}
      // if (!q.search && search) q.search = search
      // if (!q.category && category) q.category = category
      dispatch(getNFTsAction(q))
    },
    [dispatch]
  ) //search, category,
}

export const useLoadNFTs = (): void => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getNFTsAction())
  }, [dispatch])
}

export const useAddNFT = (): ((nft: NFT) => void) => {
  const dispatch = useDispatch()
  return useCallback((nft: NFT) => dispatch(addNFTAction(nft)), [dispatch])
}

export const useGetAuctionNFT = (): ((nft: NFT) => void) => {
  const dispatch = useDispatch()
  return useCallback((nft: NFT) => dispatch(getAuctionNFTAction(nft)), [dispatch])
}

export const usePlaceBid = (): (() => void) => {
  const dispatch = useDispatch()
  const bidder = useUserAddress()
  const auctionNFT = useAuctionNFT()
  const bidPrice = useBidOrBuyValue()
  return useCallback(() => {
    if (bidder && auctionNFT) {
      const auctionId = auctionNFT.auction.id
      const bid: Bid = {
        id: 0,
        nft: auctionNFT.nft.id,
        bidPrice,
        bidder,
        expireTimestamp: 0,
        txtHash: ''
      }
      dispatch(placeBidAction({ auctionId, bid }))
    }
  }, [bidPrice, auctionNFT, bidder, dispatch])
}

export const useBuyNFT = (): (() => void) => {
  const dispatch = useDispatch()
  const buyer = useUserAddress()
  const auctionNFT = useAuctionNFT()
  const soldPrice = useBidOrBuyValue()
  return useCallback(() => {
    if (buyer && auctionNFT) {
      const nftId = auctionNFT.nft.id
      const auctionId = auctionNFT.auction.id
      const owner = auctionNFT.nft.owner
      dispatch(buyNFTAction({ nftId, auctionId, owner, buyer, soldPrice }))
    }
  }, [soldPrice, auctionNFT, buyer, dispatch])
}

export const useClearMarketplacePopup = () => {
  const dispatch = useDispatch()
  return useCallback(
    () => {
      dispatch(clearMarketplacePopup())
    },
    [dispatch]
  )
}