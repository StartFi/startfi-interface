import { EventFilter } from 'ethers'
import { useActiveWeb3React } from 'hooks'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { addNewEvent } from 'state/blockchainEvents/actions'
import { parseBigNumber, useStartFiToken, useStartFiMarketplace, useStartFiNft } from './useContract'
import {
  addToMarketplaceAction,
  buyNFTAction,
  delistAuctionAction,
  mintNFTAction,
  placeBidAction,
  saveNFT
} from 'state/marketplace/actions'
import { useAuction, useAuctionNFT, useNFT } from 'state/marketplace/hooks'
import { useChainId, useUserAddress } from 'state/user/hooks'
import { Bid } from 'services/models/Bid'
export const useNftPaymentEventListener = () => {
  const account = useUserAddress()
  const chainId = useChainId()
  const { library } = useActiveWeb3React()
  const nft = useNFT()
  const tokenContract = useStartFiToken(false)
  const nftRoyalty = useStartFiNft(false)
  const transferEvent = tokenContract?.filters.Transfer()
  const ApprovalEvent = tokenContract?.filters.Approval()
  const transferRoyalEvent = nftRoyalty?.filters.Transfer()
  const dispatch = useDispatch()
  useEffect(() => {
    if (transferRoyalEvent) {
      library?.on(transferRoyalEvent as EventFilter, result => {
        const eventLogs = nftRoyalty?.interface.parseLog({ data: result.data, topics: result.topics }).args
        const id: string = parseInt(parseBigNumber(eventLogs)[2], 16).toString() //tokenId
        console.log({account, nft, chainId})
        if (account && nft && chainId) {
          const mintedNFT = { ...nft, id, issueDate: new Date(), owner: account, issuer: account, chainId }
          dispatch(mintNFTAction(mintedNFT))
          dispatch(saveNFT({ nft: mintedNFT }))
        }
        dispatch(addNewEvent({ eventName: 'transferRoyaltyEvent', eventValue: parseBigNumber(eventLogs) }))
      })
    }
    return () => {
      library?.removeAllListeners(transferRoyalEvent as EventFilter)
    }
  }, [])
  useEffect(() => {
    if (transferEvent) {
      library?.on(transferEvent as EventFilter, result => {
        const eventLogs = tokenContract?.interface.parseLog({ data: result.data, topics: result.topics }).args
        dispatch(addNewEvent({ eventName: 'transferToken', eventValue: parseBigNumber(eventLogs) }))
      })
    }
    return () => {
      library?.removeAllListeners(transferEvent as EventFilter)
    }
  }, [])
  useEffect(() => {
    if (ApprovalEvent) {
      library?.on(ApprovalEvent as EventFilter, result => {
        const eventLogs = tokenContract?.interface.parseLog({ data: result.data, topics: result.topics }).args
        dispatch(addNewEvent({ eventName: 'ApprovalEvent', eventValue: parseBigNumber(eventLogs) }))
      })
    }
    return () => {
      library?.removeAllListeners(ApprovalEvent as EventFilter)
    }
  }, [])
}

export const useMarketplaceListener = (nft?: any, bid?: Bid, listingId?: string) => {
  const { library } = useActiveWeb3React()
  const marketplaceContract = useStartFiMarketplace(false)
  const listOnMarketplaceEvent = marketplaceContract?.filters.ListOnMarketplace()
  const deListOffMarketplaceEvent = marketplaceContract?.filters.DeListOffMarketplace()
  const createAuctionEvent = marketplaceContract?.filters.CreateAuction()
  const bidOnAuctionEvent = marketplaceContract?.filters.BidOnAuction()
  const fullfilBidEvent = marketplaceContract?.filters.FullfillBid()
  const disputeAuctionEvent = marketplaceContract?.filters.DisputeAuction()
  const buyNowEvent = marketplaceContract?.filters.BuyNow()
  const userReservesFreeEvent = marketplaceContract?.filters.UserReservesFree()
  const auction = useAuction()
  const seller = useUserAddress()
  const chainId = useChainId()
  const auctionNFT = useAuctionNFT()
  const dispatch = useDispatch()
  useEffect(() => {
    if (listOnMarketplaceEvent) {
      library?.on(listOnMarketplaceEvent as EventFilter, result => {
        const eventLogs = marketplaceContract?.interface.parseLog({ data: result.data, topics: result.topics })
        const args = eventLogs?.args
        const eventValue = parseBigNumber(args)
        dispatch(addNewEvent({ eventName: 'ListOnMarketplace', eventValue }))
      })
    }
    return () => {
      library?.removeAllListeners(listOnMarketplaceEvent as EventFilter)
    }
  }, [])
  useEffect(() => {
    if (deListOffMarketplaceEvent) {
      library?.on(deListOffMarketplaceEvent as EventFilter, result => {
        const eventLogs = marketplaceContract?.interface.parseLog({ data: result.data, topics: result.topics })
        const args = eventLogs?.args
        const eventValue = parseBigNumber(args)
        dispatch(addNewEvent({ eventName: 'DeListOffMarketplace', eventValue }))
        dispatch(delistAuctionAction(listingId as string))
      })
    }
    return () => {
      library?.removeAllListeners(deListOffMarketplaceEvent as EventFilter)
    }
  }, [])
  useEffect(() => {
    if (createAuctionEvent && seller && chainId && nft && auction) {
      library?.on(createAuctionEvent as EventFilter, result => {
        const eventLogs = marketplaceContract?.interface.parseLog({ data: result.data, topics: result.topics })
        const args = eventLogs?.args
        const eventValue = parseBigNumber(args)
        dispatch(addNewEvent({ eventName: 'CreateAuction', eventValue }))
        dispatch(
          addToMarketplaceAction({ ...auction, id: eventValue[0], nft: nft.id, seller, listTime: new Date(), chainId })
        )
      })
    }
    return () => {
      library?.removeAllListeners(createAuctionEvent as EventFilter)
    }
  }, [])
  useEffect(() => {
    if (bidOnAuctionEvent) {
      library?.on(bidOnAuctionEvent as EventFilter, result => {
        const eventLogs = marketplaceContract?.interface.parseLog({ data: result.data, topics: result.topics })
        const args = eventLogs?.args
        const eventValue = parseBigNumber(args)
        console.log(eventValue)
        if (bid) {
          bid.id = eventValue[0]
          dispatch(placeBidAction({ auctionId: auctionNFT?.auction.id || '', bid }))
        }
        dispatch(addNewEvent({ eventName: 'BidOnAuction', eventValue }))
      })
    }
    return () => {
      library?.removeAllListeners(bidOnAuctionEvent as EventFilter)
    }
  }, [])
  useEffect(() => {
    if (fullfilBidEvent) {
      library?.on(fullfilBidEvent as EventFilter, result => {
        const eventLogs = marketplaceContract?.interface.parseLog({ data: result.data, topics: result.topics })
        const args = eventLogs?.args
        const eventValue = parseBigNumber(args)
        dispatch(addNewEvent({ eventName: 'fullfilBid', eventValue }))
      })
    }
    return () => {
      library?.removeAllListeners(fullfilBidEvent as EventFilter)
    }
  }, [])
  useEffect(() => {
    if (disputeAuctionEvent) {
      library?.on(disputeAuctionEvent as EventFilter, result => {
        const eventLogs = marketplaceContract?.interface.parseLog({ data: result.data, topics: result.topics })
        const args = eventLogs?.args
        const eventValue = parseBigNumber(args)
        dispatch(addNewEvent({ eventName: 'DisputeAuction', eventValue }))
      })
    }
    return () => {
      library?.removeAllListeners(disputeAuctionEvent as EventFilter)
    }
  }, [])
  useEffect(() => {
    if (buyNowEvent) {
      library?.on(buyNowEvent as EventFilter, result => {
        const eventLogs = marketplaceContract?.interface.parseLog({ data: result.data, topics: result.topics })
        const args = eventLogs?.args
        const eventValue = parseBigNumber(args)
        const nftId = auctionNFT?.nft.id
        const auctionId = auctionNFT?.auction.id || ''
        const buyer = seller || ''
        const soldPrice = 10
        console.log('buyvalue', eventValue)
        dispatch(buyNFTAction({ nftId, auctionId, buyer, soldPrice }))
        dispatch(addNewEvent({ eventName: 'BuyNow', eventValue }))
      })
    }
    return () => {
      library?.removeAllListeners(buyNowEvent as EventFilter)
    }
  }, [])
  useEffect(() => {
    if (userReservesFreeEvent) {
      library?.on(userReservesFreeEvent as EventFilter, result => {
        const eventLogs = marketplaceContract?.interface.parseLog({ data: result.data, topics: result.topics })
        const args = eventLogs?.args
        const eventValue = parseBigNumber(args)
        dispatch(addNewEvent({ eventName: 'UserReservesFree', eventValue }))
      })
    }
    return () => {
      library?.removeAllListeners(userReservesFreeEvent as EventFilter)
    }
  }, [])
}
