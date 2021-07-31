import { DEFAULT_SORT, PopupContent } from './../../constants'
import { useCallback, useEffect, useMemo } from 'react'
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
  saveNFT,
  saveAuction,
  addToMarketplaceAction,
  clearNFT
} from './actions'
import { usePopup } from 'state/application/hooks'
import { Auction } from 'services/models/Auction'
import { useMint } from 'hooks/startfiNft'
import { useWeb3React } from '@web3-react/core'
import { useNftPaymentEventListener } from 'hooks/startfiEventListener'
import { useClearIPFSProgress } from 'state/ipfs/hooks'
let generateId = Date.now().toString(36) + Math.random().toString(36).substr(2);
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
  return useSelector((state: AppState) => state.marketplace.loading)}

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

export const useGetNFTs = (): ((query?: NFTQUERY) => void) => {
  const dispatch = useDispatch()
  return useCallback(
    (query?: NFTQUERY) => {
      let q = query || { sort: DEFAULT_SORT }
      dispatch(getMarketplaceAction(q))
    },
    [dispatch]
  )
}

const useChangePage = () => {
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

  return useMemo(() => {
    return { currentPage, changePage }
  }, [currentPage, changePage])
}

export const useMintNFT = (): (() => void) => {
  const dispatch = useDispatch()
  const popup = usePopup()
  const nft = useNFT()
  const mint = useMint()
  const { account } = useWeb3React()

  useNftPaymentEventListener()
  return useCallback(async () => {
    if (account && nft) {
      if (nft.royalty === 0) {
        await mint(account as string, nft.dataHash)
      } else {
        await mint(account as string, nft.dataHash, nft.royalty, 100)
      }
      dispatch(mintNFTAction({ ...nft, issueDate: new Date() }))
    } else popup({ success: false, message: 'Connect wallet or no NFT data' })
  }, [nft, account, popup, dispatch])
}

export const useAddToMarketplace = (): (() => void) => {
  const dispatch = useDispatch()
  const seller = useUserAddress()
  const popup = usePopup()
  const nft = useNFT()
  const auction = useAuction()
console.log(nft);
  return useCallback(() => {
    if (seller && auction && nft) {
      dispatch(addToMarketplaceAction({ ...auction, nft: nft.id, seller, listTime: new Date() }))
    } else if (!seller) popup({ success: false, message: 'connectWallet' })
    else if (!nft) popup({ success: false, message: 'noNFT' })
    else if (!auction) popup({ success: false, message: 'noAuction' })
  }, [auction, nft, seller, popup, dispatch])
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
        id: generateId,
        nft: auctionNFT.nft.id,
        bidPrice,
        bidder,
        expireTimestamp: 0,
        txtHash: ''
      }
      dispatch(placeBidAction({ auctionId, bid }))
    } else popup({ success: false, message: 'connectWallet' })
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
    } else popup({ success: false, message: 'connectWallet' })
  }, [soldPrice, auctionNFT, buyer, popup, dispatch])
}

export const useNFTDetails = () => {
  return useSelector((state: AppState) => state.marketplace.NftDetails)
}

export const useClearMarketplacePopup = () => {
  const dispatch = useDispatch()

  return useCallback(() => {
    dispatch(clearMarketplacePopup())
  }, [dispatch])
}


