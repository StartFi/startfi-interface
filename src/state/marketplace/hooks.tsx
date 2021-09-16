import { DEFAULT_SORT, NFTS_PER_PAGE, PopupContent } from './../../constants'
import { useCallback, useEffect, useMemo, useState } from 'react'
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
  setBidOrBuy,
  saveNFT,
  saveAuction,
  clearNFT,
  setWalletConfirmation,
  setStep,
  setAuction,
  setMissing,
  setNFT,
  removeMissing,
  getBids
} from './actions'
import { usePopup } from 'state/application/hooks'
import { Auction } from 'services/models/Auction'
import {
  useBid,
  useBuyNow,
  useCreateAuction,
  useDeList,
  useListOnMarketplace
} from 'hooks/blockchain-hooks/startfiMarketPlace'
import { useApproveToken } from 'hooks/blockchain-hooks/startfiToken'
import { useMint } from 'hooks/blockchain-hooks/startfiPaymentNft'
import { getAuction } from 'services/database/Auction'
import { getNFT } from 'services/database/NFT'
import { useMarketplaceListener, useNftPaymentEventListener } from 'hooks/blockchain-hooks/startfiEventListener'
import { address as STARTFI_MARKETPLACE_ADDRESS } from '../../constants/abis/StartFiMarketPlace.json'
import { useHistory } from 'react-router-dom'
import { useAllowedSTFI } from 'hooks/blockchain-hooks/useAllowedSTFI'
import { address as STARTFI_NFT_PAYMENT_ADDRESS } from '../../constants/abis/StartFiNFTPayment.json'
import { useAllowed } from 'hooks/blockchain-hooks/useAllowed'
import { useApproveNft } from 'hooks/blockchain-hooks/startfiNft'
import { useDigitizingFees } from 'hooks/blockchain-hooks/useDigitizingFees'
import { STEP } from './types'

export const generateId =
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

export const useNFT = (): NFT => {
  return useSelector((state: AppState) => state.marketplace.nft)
}

export const useAuction = (): Auction => {
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

export const useStep = (): STEP => {
  return useSelector((state: AppState) => state.marketplace.step)
}

export const useMissing = (): string[] => {
  return useSelector((state: AppState) => state.marketplace.missing)
}

export const useSetMissing = (): ((missing: string[]) => void) => {
  const dispatch = useDispatch()
  return useCallback((missing: string[]) => dispatch(setMissing({ missing })), [dispatch])
}

export const useSetStep = (): ((step: STEP) => void) => {
  const dispatch = useDispatch()
  return useCallback((step: STEP) => dispatch(setStep({ step })), [dispatch])
}

export const useSetBidOrBuy = (): ((bidOrBuy: boolean, value: number) => void) => {
  const dispatch = useDispatch()
  return useCallback((bidOrBuy: boolean, value: number) => dispatch(setBidOrBuy({ bidOrBuy, value })), [dispatch])
}
// get topBid
export const useTopBid = () => {
  return useSelector((state: AppState) => state.marketplace.topNftBid)
}
// block bidding if value less than minBid
export const useIsValid = (value: number, minBid: number) => {
  const topBid = useTopBid()
  return useMemo(() => (!(value < minBid) && value > topBid ? true : false), [value, minBid, topBid])
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

export const useSetWalletConfirmation = (): ((type: string) => void) => {
  const dispatch = useDispatch()
  return useCallback(
    (type: string) => dispatch(setWalletConfirmation({ type })),

    [dispatch]
  )
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

export const useMintNFT = (): (() => any) => {
  const address = useUserAddress()
  const popup = usePopup()
  const nft = useNFT()
  const mint = useMint()
  const setWalletConfirmation = useSetWalletConfirmation()
  useNftPaymentEventListener()
  return useCallback(async () => {
    if (address && nft) {
      let transaction
      if (nft.royalty === 0) {
        transaction = await mint(address, nft.dataHash)
      } else {
        transaction = await mint(address, nft.dataHash, nft.royalty, 100)
      }
      if (transaction.error) {
        popup({ success: false, message: transaction.error.message })
      } else {
        setWalletConfirmation('Digitizing')
      }
      return transaction
    } else if (!address) popup({ success: false, message: 'connectWallet' })
    else if (!nft) popup({ success: false, message: 'noNFT' })
  }, [address, nft, popup, setWalletConfirmation, mint])
}

export const useAddToMarketplace = (): (() => void) => {
  const seller = useUserAddress()
  const chainId = useChainId()
  const popup = usePopup()
  const nft = useNFT()
  const auction = useAuction()
  const createAuction = useCreateAuction()
  const listOnMarketplace = useListOnMarketplace()
  const setWalletConfirmation = useSetWalletConfirmation()
  useMarketplaceListener(nft)
  return useCallback(async () => {
    if (seller && chainId && auction && nft) {
      let transaction
      if (auction.isForSale && !auction.isForBid) {
        transaction = await listOnMarketplace(auction.contractAddress, nft.id, auction.listingPrice as number)
      } else {
        transaction = await createAuction(
          auction.contractAddress,
          nft.id,
          auction.minBid as number,
          auction.qualifyAmount as number,
          auction.isForSale,
          auction.listingPrice as number,
          auction.expireTimestamp
        )
      }
      if (transaction && transaction.error) {
        popup({ success: false, message: transaction.error.message })
      } else {
        setWalletConfirmation('asset monetization')
      }
    } else if (!seller || !chainId) popup({ success: false, message: 'connectWallet' })
    else if (!nft) popup({ success: false, message: 'noNFT' })
    else if (!auction) popup({ success: false, message: 'noAuction' })
  }, [auction, nft, seller, chainId, createAuction, popup, setWalletConfirmation, listOnMarketplace])
}

export const useGetAuctionNFT = (nftId: string, auctionId: string): void => {
  const dispatch = useDispatch()
  const nfts = useMarketplace()
  useEffect(() => {
    const AuctionNFT = nfts.filter(nft => nft.nft.id === nftId)[0]
    dispatch(getAuctionNFTAction({ nftId, auctionId, AuctionNFT }))
    dispatch(getBids(nftId))
  }, [nftId, auctionId, nfts, dispatch])
}

export const usePlaceBid = (): (() => void) => {
  const bidder = useUserAddress()
  const chainId = useChainId()
  const auctionNFT = useAuctionNFT()
  const bidPrice = useBidOrBuyValue()
  const setWalletConfirmation = useSetWalletConfirmation()
  const bidWeb3 = useBid()
  const popup = usePopup()
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
      const transaction = await bidWeb3(auctionId, bidPrice)
      if (transaction && transaction.error) {
        popup({ success: false, message: transaction.error.message })
      } else {
        setWalletConfirmation('Bidding')
      }
    }
  }, [bidPrice, auctionNFT, bidWeb3, setWalletConfirmation])
}

export const useApproveBuyNFT = (setLoader, setApproved): (() => void) => {
  const buyer = useUserAddress()
  const auctionNFT = useAuctionNFT()
  const soldPrice = useBidOrBuyValue()
  const approveToken = useApproveToken()
  const popup = usePopup()
  useMarketplaceListener(auctionNFT?.nft)
  return useCallback(async () => {
    if (buyer && auctionNFT) {
      setLoader(true) // start approving
      const approveTransaction = await approveToken(STARTFI_MARKETPLACE_ADDRESS, soldPrice)
      if (approveTransaction) setLoader(false) // done approving
      if (approveTransaction && approveTransaction.error) {
        popup({ success: false, message: approveTransaction.error.message })
      } else {
        setApproved(true)
      }
    } else popup({ success: false, message: 'connectWallet' })
  }, [soldPrice, auctionNFT, buyer, approveToken, popup, setWalletConfirmation])
}
export const useConfirmBuyNFT = (setLoader): (() => void) => {
  const buyer = useUserAddress()
  const popup = usePopup()
  const buyNow = useBuyNow()
  const auctionNFT = useAuctionNFT()
  const soldPrice = useBidOrBuyValue()
  const setWalletConfirmation = useSetWalletConfirmation()
  useMarketplaceListener(auctionNFT?.nft)
  return useCallback(async () => {
    if (buyer && auctionNFT) {
      setLoader(true) // start buying
      const buyNowTransaction = await buyNow(auctionNFT.auction.id, soldPrice)
      if (buyNowTransaction) setLoader(false) // done buying
      if (buyNowTransaction && buyNowTransaction.error) {
        popup({ success: false, message: buyNowTransaction.error.message })
      } else {
        setWalletConfirmation('Payment')
      }
    } else popup({ success: false, message: 'connectWallet' })
  }, [auctionNFT, buyNow, buyer, popup, setWalletConfirmation, soldPrice])
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
      const transaction = await deListWeb3(auctionId) // need to make sure the auctionId is correct
      if (transaction && transaction.error) {
        popup({ success: false, message: transaction.error.message })
      }
    }
    //displaying error
    else if (!owner || owner !== nft.owner) popup({ success: false, message: 'notOwner' })
    else if (auction.status !== 'open') popup({ success: false, message: 'auctionNotOpened' })
    else if (auction.bids.length !== 0) popup({ success: false, message: 'auctionHasBids' })
    else if (auction.expireTimestamp <= new Date().valueOf()) popup({ success: false, message: 'auctionExpired' })
    else popup({ success: false, message: 'unknownReason' })
  }, [auctionId, owner, deListWeb3, popup])
}

export const useAddNFT = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const missing = useMissing()
  const setMissing = useSetMissing()
  const step = useStep()
  const setStep = useSetStep()
  const nft = useNFT()
  const popup = usePopup()
  const allowedSTFI = useAllowedSTFI()
  const mint = useMintNFT()
  const approveToken = useApproveToken()
  const fees = useDigitizingFees()
  const [agree, setAgree] = useState<boolean>(false)
  const [loader, setLoader] = useState<boolean>(false)
  // to generate id to every nft
  // dispatch(setNFT({ value:generateId, name:'id' }))

  const handleChange = useCallback(
    (value: any, name: string) => {
      if (name === 'royalty' && value > 100) return
      if (value) {
        dispatch(removeMissing({ name }))
      }
      dispatch(setNFT({ value, name }))
    },
    [dispatch]
  )

  const next = useCallback(() => {
    const newMissing: string[] = []
    Object.keys(nft).forEach((key: string) => (nft[key] ? null : newMissing.push(key)))
    switch (step) {
      case STEP.STEP1:
        if (nft.category && nft.dataHash) {
          setMissing([])
          setStep(STEP.STEP2)
          return
        }
        break
      case STEP.STEP2:
        if (['name', 'description'].filter(f => newMissing.includes(f)).length === 0) {
          setMissing([])
          setStep(STEP.STEP3)
          return
        }
        break
      case STEP.STEP3:
        setMissing([])
        setStep(STEP.NFT_SUMMARY)
        history.push('/mint/summary')
        return
      case STEP.NFT_SUMMARY:
        if (agree) setStep(allowedSTFI ? STEP.ADD_NFT : STEP.ALLOW_TRANSFER)
        break
      case STEP.ALLOW_TRANSFER:
        setLoader(true)
        approveToken(STARTFI_NFT_PAYMENT_ADDRESS, fees).then(transaction => {
          if (transaction && transaction.error) {
            setLoader(false)
            popup({ success: false, message: transaction.error.message })
          } else {
            setStep(STEP.ADD_NFT)
            setLoader(false)
          }
        })
        break
      case STEP.ADD_NFT:
        mint().then(transaction => {
          if (transaction && !transaction.error) {
            setStep(STEP.CHOOSE_TYPE)
          }
        })
        break
      default:
    }
    setMissing(newMissing)
  }, [history, nft, step, setStep, setMissing, agree, allowedSTFI, approveToken, fees, mint])

  return useMemo(() => {
    return { nft, handleChange, missing, next, loader, agree, setAgree }
  }, [nft, handleChange, missing, next, loader, agree, setAgree])
}

export const useAddAuction = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const auction = useAuction()
  const missing = useMissing()
  const setMissing = useSetMissing()
  const step = useStep()
  const setStep = useSetStep()
  const allowed = useAllowed()
  const addToMarketplace = useAddToMarketplace()
  const approve = useApproveNft()
  const popup = usePopup()
  const nft = useNFT()
  const [loader, setLoader] = useState<boolean>(false)

  const handleChange = useCallback(
    (value: any, name: string) => {
      if (value || value === false) {
        dispatch(removeMissing({ name }))
      }
      dispatch(setAuction({ value, name }))
    },
    [dispatch]
  )

  const next = useCallback(() => {
    const newMissing: string[] = []
    Object.keys(auction).forEach((key: string) => (auction[key] ? null : newMissing.push(key)))
    const { isForSale, listingPrice, isForBid, minBid, qualifyAmount, expireTimestamp } = auction
    switch (step) {
      //CHOOSE TYPE
      case STEP.CHOOSE_TYPE:
        if (isForSale || isForBid) setStep(STEP.AUCTION_DETAILS)
        break
      //AUCTION DETAILS
      case STEP.AUCTION_DETAILS:
        if (!process.env.REACT_APP_MIN_QUALIFY_AMOUNT) return console.log('No min qualify amount in env')
        const minQualify = parseInt(process.env.REACT_APP_MIN_QUALIFY_AMOUNT)
        if (
          (isForSale && listingPrice && listingPrice > 0) ||
          (isForBid && minBid && minBid > 0 && qualifyAmount && qualifyAmount >= minQualify && expireTimestamp > 0)
        ) {
          setStep(STEP.AUCTION_SUMMARY)
          history.push('/mint/summary')
          break
        } else setMissing(newMissing)
        break
      case STEP.AUCTION_SUMMARY:
        setStep(allowed ? STEP.ADD_AUCTION : STEP.ALLOW_MONETIZING)
        break
      case STEP.ALLOW_MONETIZING:
        if (!allowed) {
          setLoader(true)
          approve(STARTFI_MARKETPLACE_ADDRESS, nft?.id).then(transaction => {
            if (transaction && transaction.error) {
              setLoader(false)
              popup({ success: false, message: transaction.error.message })
            } else {
              setStep(STEP.ADD_AUCTION)
              setLoader(false)
            }
          })
        }
        break
      case STEP.ADD_AUCTION:
        addToMarketplace()
        break
      default:
    }
  }, [history, auction, step, setStep, setMissing, addToMarketplace, allowed, approve, nft])

  return useMemo(() => {
    return { auction, handleChange, missing, next, loader }
  }, [auction, handleChange, missing, next, loader])
}

export const useSteps = () => {
  const step = useStep()
  const addNFT = useAddNFT()
  const addAuction = useAddAuction()
  const setStep = useSetStep()
  const back = useCallback(() => {
    if (step < STEP.CHOOSE_TYPE) {
      if (step > STEP.STEP1) setStep(step - 1)
    } else if (step > STEP.CHOOSE_TYPE) setStep(step - 1)
  }, [step, setStep])
  return useMemo(() => {
    const { agree, setAgree } = addNFT
    const nftOrAuction = step < STEP.CHOOSE_TYPE
    const next = nftOrAuction ? addNFT.next : addAuction.next
    const loader = nftOrAuction ? addNFT.loader : addAuction.loader
    return { step, next, back, nftOrAuction, loader, agree, setAgree }
  }, [step, addNFT, addAuction, back])
}

// this hook to set NFT if you clicked on inventory draft card
export const useSetDraftNft = () => {
  const dispatch = useDispatch()
  return useCallback(
    (draft: NFT) => {
      for (const prop in draft) {
        dispatch(setNFT({ value: draft[prop], name: prop }))
      }
    },
    [dispatch]
  )
}

// check expired Auction
export const useIsExpiredAuction = (auction: AuctionNFT | null) => {
  return useMemo(
    () =>
      auction ? (auction?.auction?.expireTimestamp < Date.now() && !auction?.auction?.isForSale ? true : false) : false,
    [auction]
  )
}
