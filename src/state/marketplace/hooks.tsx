import { DEFAULTSORT, PopupContent } from './../../constants'
import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NFTQUERY } from 'services/Marketplace'
import { AuctionNFT } from 'services/models/AuctionNFT'
import { Bid } from 'services/models/Bid'
import { NFT } from 'services/models/NFT'
import { AppState } from 'state'
import { useUserAddress } from 'state/user/hooks'
import {
  mintNFTAction,
  buyNFTAction,
  clearMarketplacePopup,
  getAuctionNFTAction,
  getMarketplaceAction,
  placeBidAction,
  setBidOrBuy,
  saveNFT
} from './actions'
import { usePopup } from 'state/application/hooks'

export const useMarketplace = (): AuctionNFT[] => {
  return useSelector((state: AppState) => state.marketplace.marketplace)
}

export const useLoadTime = (): number => {
  return useSelector((state: AppState) => state.marketplace.loadtime)
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

export const useWalletConfirmation = (): string | null => {
  return useSelector((state: AppState) => state.marketplace.walletConfirmation)
}

export const useMarketplacePopup = (): PopupContent | null => {
  return useSelector((state: AppState) => state.marketplace.popup)
}

export const useMinted = (): boolean => {
  return useSelector((state: AppState) => state.marketplace.minted)
}

export const useNFT = (): NFT | null => {
  return useSelector((state: AppState) => state.marketplace.nft)
}

export const useSetBidOrBuy = (): ((bidOrBuy: boolean, value: number) => void) => {
  const dispatch = useDispatch()
  return useCallback((bidOrBuy: boolean, value: number) => dispatch(setBidOrBuy({ bidOrBuy, value })), [dispatch])
}

export const useSaveNFT = (): ((nft: NFT) => void) => {
  const dispatch = useDispatch()
  return useCallback((nft: NFT) => dispatch(saveNFT({ nft })), [dispatch])
}

export const useGetNFTs = (): ((query?: NFTQUERY) => void) => {
  const dispatch = useDispatch()
  return useCallback(
    (query?: NFTQUERY) => {
      let q = query || { sort: DEFAULTSORT }
      dispatch(getMarketplaceAction(q))
    },
    [dispatch]
  )
}

export const useLoadNFTs = (): void => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getMarketplaceAction())
  }, [dispatch])
}

export const useMintNFT = (): (() => void) => {
  const dispatch = useDispatch()
  const owner = useUserAddress()
  const popup = usePopup()
  const nft = useNFT()

  return useCallback(() => {
    if (owner && nft) {
      dispatch(mintNFTAction({ ...nft, owner, issuer: owner, issueDate: new Date() }))
    } else popup({ success: false, message: 'Connect wallet or no NFT data' })
  }, [nft, owner, popup, dispatch])
}

export const useGetAuctionNFT = (nftId: number, auctionId: string) => {
  const dispatch = useDispatch()
  const nfts = useMarketplace()
  useEffect(() => {
    const AuctionNFT = nfts.filter(nft => nft.nft.id === nftId)[0]
    dispatch(getAuctionNFTAction({ nftId, auctionId, AuctionNFT }))
    return () => {}
  }, [nftId, auctionId, nfts, dispatch])
}

export const usePlaceBid = (): (() => void) => {
  const dispatch = useDispatch()
  const bidder = useUserAddress()
  const auctionNFT = useAuctionNFT()
  const bidPrice = useBidOrBuyValue()
  const popup = usePopup()
  return useCallback(() => {
    if (bidder && auctionNFT) {
      const auctionId = auctionNFT.auction.id
      const bid: Bid = {
        id: '0',
        nft: auctionNFT.nft.id,
        bidPrice,
        bidder,
        expireTimestamp: 0,
        txtHash: ''
      }
      dispatch(placeBidAction({ auctionId, bid }))
    } else popup({ success: false, message: 'Connect wallet' })
  }, [bidPrice, auctionNFT, bidder, popup, dispatch])
}

export const useBuyNFT = (): (() => void) => {
  const dispatch = useDispatch()
  const buyer = useUserAddress()
  const auctionNFT = useAuctionNFT()
  const soldPrice = useBidOrBuyValue()
  const popup = usePopup()
  return useCallback(() => {
    if (buyer && auctionNFT) {
      const nftId = auctionNFT.nft.id
      const auctionId = auctionNFT.auction.id
      const owner = auctionNFT.nft.owner
      dispatch(buyNFTAction({ nftId, auctionId, owner, buyer, soldPrice }))
    } else popup({ success: false, message: 'Connect wallet' })
  }, [soldPrice, auctionNFT, buyer, popup, dispatch])
}

export const useClearMarketplacePopup = () => {
  const dispatch = useDispatch()
  return useCallback(() => {
    dispatch(clearMarketplacePopup())
  }, [dispatch])
}
