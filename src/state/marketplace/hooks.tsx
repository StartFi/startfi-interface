import { DEFAULT_SORT, NFTS_PER_PAGE, PopupContent } from './../../constants'
import { useCallback, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NFTQUERY } from 'services/Marketplace'
import { AuctionNFT } from 'services/models/AuctionNFT'
import { Bid } from 'services/models/Bid'
import { NFT } from 'services/models/NFT'
import { AppState } from 'state'
import { useChainId, useUserAddress } from 'state/user/hooks'
import {
  clearMarketplacePopup,
  getAuctionNFTAction,
  getMarketplaceAction,
  placeBidAction,
  setBidOrBuy,
  saveNFT,
  saveAuction,
  clearNFT,
  delistAuctionAction,
  setWalletConfirmation
} from './actions'
import { usePopup } from 'state/application/hooks'
import { Auction } from 'services/models/Auction'
import { useBid, useBuyNow, useCreateAuction, useDeList, useGetListingDetails } from 'hooks/startfiMarketPlace'
import { useApproveToken } from 'hooks/startfiToken'
import { useMint } from 'hooks/startfiPaymentNft'
import { getAuction } from 'services/database/Auction'
import { getNFT } from 'services/database/NFT'
import { useMarketplaceListener, useNftPaymentEventListener } from 'hooks/startfiEventListener'
import { address as STARTFI_MARKETPLACE_ADDRESS } from '../../constants/abis/StartFiMarketPlace.json'

const generateId =
  Date.now().toString(36) +
  Math.random()
    .toString(36)
    .substr(2)

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

export const useAuction = (): Auction | null => {
  return useSelector((state: AppState) => state.marketplace.auction)
}

export const useMarketplaceLoading = (): boolean => {
  return useSelector((state: AppState) => state.marketplace.loading)
}

export const useCurrentPage = (): number => {
  return useSelector((state: AppState) => state.marketplace.currentPage)
}

export const useLastAuctions = (): any[] => {
  return useSelector((state: AppState) => state.marketplace.lastAuctions)
}

export const useSetBidOrBuy = (): ((bidOrBuy: boolean, value: number) => void) => {
  const dispatch = useDispatch()
  return useCallback((bidOrBuy: boolean, value: number) => dispatch(setBidOrBuy({ bidOrBuy, value })), [dispatch])
}

export const useSaveNFT = (): ((nft: NFT) => void) => {
  const dispatch = useDispatch()
  return useCallback((nft: NFT) => dispatch(saveNFT({ nft })), [dispatch])
}

export const useSaveAuction = (): ((auction: Auction) => void) => {
  const dispatch = useDispatch()
  return useCallback((auction: Auction) => dispatch(saveAuction({ auction })), [dispatch])
}

export const useClearNFT = (): (() => void) => {
  const dispatch = useDispatch()
  return useCallback(() => dispatch(clearNFT()), [dispatch])
}

export const useSetWalletConfirmation = (): (() => void) => {
  const dispatch = useDispatch()
  return useCallback(() => dispatch(setWalletConfirmation()), [dispatch])
}

export const useGetNFTs = (): ((query?: NFTQUERY) => void) => {
  const dispatch = useDispatch()
  const chainId = useChainId()
  return useCallback(
    (query?: NFTQUERY) => {
      const q: NFTQUERY = query || { sort: DEFAULT_SORT }
      q.chainId = chainId
      dispatch(getMarketplaceAction(q))
    },
    [chainId, dispatch]
  )
}

const useChangePage = (): ((newPage: number) => void) => {
  const getNFTs = useGetNFTs()
  const lastAuctions = useLastAuctions()
  return useCallback((newPage: number) => getNFTs({ newPage, lastAuction: lastAuctions[newPage - 1] }), [
    lastAuctions,
    getNFTs
  ])
}

export const usePagination = () => {
  const currentPage = useCurrentPage()
  const changePage = useChangePage()
  const nfts = useMarketplace()
  return useMemo(() => {
    const isNext: boolean = nfts.length === NFTS_PER_PAGE
    return { currentPage, isNext, changePage }
  }, [currentPage, nfts, changePage])
}

export const useMintNFT = (): (() => void) => {
  const address = useUserAddress()
  const popup = usePopup()
  const nft = useNFT()
  const mint = useMint()
  const setWalletConfirmation = useSetWalletConfirmation()
  useNftPaymentEventListener()
  return useCallback(() => {
    if (address && nft) {
      if (nft.royalty === 0) {
        mint(address, nft.dataHash)
      } else {
        mint(address, nft.dataHash, nft.royalty, 100)
      }
      setWalletConfirmation()
    } else if (!address) popup({ success: false, message: 'connectWallet' })
    else if (!nft) popup({ success: false, message: 'noNFT' })
  }, [nft, address, popup, mint, setWalletConfirmation])
}

export const useAddToMarketplace = (): (() => void) => {
  const seller = useUserAddress()
  const chainId = useChainId()
  const popup = usePopup()
  const nft = useNFT()
  const auction = useAuction()
  const createAuction = useCreateAuction()
  const setWalletConfirmation = useSetWalletConfirmation()
  useMarketplaceListener(nft)
  return useCallback(() => {
    if (seller && chainId && auction && nft) {
      createAuction(
        auction.contractAddress,
        nft.id,
        auction.minBid as number,
        auction.qualifyAmount as number,
        auction.isForBid,
        auction.listingPrice as number,
        auction.expireTimestamp
      )
      setWalletConfirmation()
    } else if (!seller || !chainId) popup({ success: false, message: 'connectWallet' })
    else if (!nft) popup({ success: false, message: 'noNFT' })
    else if (!auction) popup({ success: false, message: 'noAuction' })
  }, [auction, nft, seller, chainId, createAuction, popup, setWalletConfirmation])
}

export const useGetAuctionNFT = (nftId: string, auctionId: string): void => {
  const dispatch = useDispatch()
  const nfts = useMarketplace()
  useEffect(() => {
    const AuctionNFT = nfts.filter(nft => nft.nft.id === nftId)[0]
    dispatch(getAuctionNFTAction({ nftId, auctionId, AuctionNFT }))
  }, [nftId, auctionId, nfts, dispatch])
}

export const usePlaceBid = (): (() => void) => {
  const dispatch = useDispatch()
  const bidder = useUserAddress()
  const chainId = useChainId()
  const auctionNFT = useAuctionNFT()
  const bidPrice = useBidOrBuyValue()
  const setWalletConfirmation = useSetWalletConfirmation()
  const bidWeb3 = useBid()
  const bid: Bid = {
    id: generateId,
    nft: auctionNFT?.nft.id,
    bidPrice,
    bidder: bidder || '',
    expireTimestamp: 0,
    txtHash: '',
    chainId: chainId || 3
  }
  useMarketplaceListener(auctionNFT?.nft, bid)
  return useCallback(async () => {
    if (auctionNFT) {
      const auctionId = auctionNFT.auction.id
      setWalletConfirmation()
      await bidWeb3(auctionId, bidPrice)
    }
  }, [bidPrice, auctionNFT, bidWeb3, setWalletConfirmation])
}

export const useBuyNFT = (): (() => void) => {
  const buyNow = useBuyNow()
  const buyer = useUserAddress()
  const auctionNFT = useAuctionNFT()
  const soldPrice = useBidOrBuyValue()
  const approveToken = useApproveToken()
  const popup = usePopup()
  const setWalletConfirmation = useSetWalletConfirmation()
  useMarketplaceListener(auctionNFT?.nft)
  return useCallback(async () => {
    if (buyer && auctionNFT) {
      setWalletConfirmation()
      await approveToken(STARTFI_MARKETPLACE_ADDRESS, soldPrice)
      await buyNow(auctionNFT.auction.id, soldPrice)
    } else popup({ success: false, message: 'connectWallet' })
  }, [soldPrice, auctionNFT, buyer, approveToken, buyNow, popup, setWalletConfirmation])
}

export const useNFTDetails = () => {
  return useSelector((state: AppState) => state.marketplace.NftDetails)
}

export const useClearMarketplacePopup = (): (() => void) => {
  const dispatch = useDispatch()
  return useCallback(() => {
    dispatch(clearMarketplacePopup())
  }, [dispatch])
}

export const useDelistAuction = (auctionId: string): (() => void) => {
  const dispatch = useDispatch()
  const owner = useUserAddress()
  const deListWeb3 = useDeList()
  const popup = usePopup()
  useMarketplaceListener({ listingId: auctionId })
  return useCallback(async () => {
    //get auction and nft data replace with nft and auction retrieved from blockchain
    const auction = await getAuction(auctionId)
    const nft = await getNFT(auction.nft)
    //validation
    if (
      owner &&
      owner === nft.owner &&
      auction.status === 'open' &&
      auction.bids.length === 0 &&
      auction.expireTimestamp > new Date().valueOf()
    ) {
      await deListWeb3(auctionId) // need to make sure the auctionId is correct
    }
    //displaying error
    else if (!owner || owner !== nft.owner) popup({ success: false, message: 'notOwner' })
    else if (auction.status !== 'open') popup({ success: false, message: 'auctionNotOpened' })
    else if (auction.bids.length !== 0) popup({ success: false, message: 'auctionHasBids' })
    else if (auction.expireTimestamp <= new Date().valueOf()) popup({ success: false, message: 'auctionExpired' })
    else popup({ success: false, message: 'unknownReason' })
  }, [owner, popup, dispatch])
}
