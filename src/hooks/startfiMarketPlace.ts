import { useDispatch } from 'react-redux'
import { Contract, EventFilter } from 'ethers'
import { parseBigNumber, useStartFiMarketplace } from './useContract'
import { useCallback, useEffect } from 'react'
import { useSubmitTransaction } from 'services/Blockchain/submitTransaction'
import { useWalletModalToggle } from 'state/application/hooks'
import { evaluateTransaction } from 'services/Blockchain/useEvaluateTransaction'
import { useActiveWeb3React } from 'hooks'
import { addNewEvent } from '../state/blockchainEvents/actions'
import { formatBytes32String } from 'ethers/lib/utils'
export const useListOnMarketplaceLogs = (contract: Contract | null) => {
  const { library } = useActiveWeb3React()
  const listOnMarketplaceEvent = contract?.filters.ListOnMarketplace()
  const dispatch = useDispatch()
  useEffect(() => {
    if (listOnMarketplaceEvent) {
      library?.on(listOnMarketplaceEvent as EventFilter, result => {
        const eventLogs = contract?.interface.parseLog({ data: result.data, topics: result.topics })
        const args = eventLogs?.args
        const eventValue = parseBigNumber(args)
        dispatch(addNewEvent({ eventName: 'ListOnMarketplace', eventValue }))
      })
    }
    return () => {
      library?.removeAllListeners(listOnMarketplaceEvent as EventFilter)
    }
  }, [listOnMarketplaceEvent])
}
export const useDeListOffMarketplaceLogs = (contract: Contract | null) => {
  const { library } = useActiveWeb3React()
  const deListOffMarketplaceEvent = contract?.filters.ListOnMarketplace()
  const dispatch = useDispatch()
  useEffect(() => {
    if (deListOffMarketplaceEvent) {
      library?.on(deListOffMarketplaceEvent as EventFilter, result => {
        const eventLogs = contract?.interface.parseLog({ data: result.data, topics: result.topics })
        const args = eventLogs?.args
        const eventValue = parseBigNumber(args)
        dispatch(addNewEvent({ eventName: 'DeListOffMarketplace', eventValue }))
      })
    }
    return () => {
      library?.removeAllListeners(deListOffMarketplaceEvent as EventFilter)
    }
  }, [deListOffMarketplaceEvent])
}
export const useCreateAuctionLogs = (contract: Contract | null) => {
  const { library } = useActiveWeb3React()
  const createAuctionEvent = contract?.filters.ListOnMarketplace()
  const dispatch = useDispatch()
  useEffect(() => {
    if (createAuctionEvent) {
      library?.on(createAuctionEvent as EventFilter, result => {
        const eventLogs = contract?.interface.parseLog({ data: result.data, topics: result.topics })
        const args = eventLogs?.args
        const eventValue = parseBigNumber(args)
        dispatch(addNewEvent({ eventName: 'CreateAuction', eventValue }))
      })
    }
    return () => {
      library?.removeAllListeners(createAuctionEvent as EventFilter)
    }
  }, [createAuctionEvent])
}
export const useBidOnAuctionLogs = (contract: Contract | null) => {
  const { library } = useActiveWeb3React()
  const bidOnAuctionEvent = contract?.filters.ListOnMarketplace()
  const dispatch = useDispatch()
  useEffect(() => {
    if (bidOnAuctionEvent) {
      library?.on(bidOnAuctionEvent as EventFilter, result => {
        const eventLogs = contract?.interface.parseLog({ data: result.data, topics: result.topics })
        const args = eventLogs?.args
        const eventValue = parseBigNumber(args)
        dispatch(addNewEvent({ eventName: 'BidOnAuction', eventValue }))
      })
    }
    return () => {
      library?.removeAllListeners(bidOnAuctionEvent as EventFilter)
    }
  }, [bidOnAuctionEvent])
}
export const useFullfilBidLogs = (contract: Contract | null) => {
  const { library } = useActiveWeb3React()
  const fullfilBidEvent = contract?.filters.ListOnMarketplace()
  const dispatch = useDispatch()
  useEffect(() => {
    if (fullfilBidEvent) {
      library?.on(fullfilBidEvent as EventFilter, result => {
        const eventLogs = contract?.interface.parseLog({ data: result.data, topics: result.topics })
        const args = eventLogs?.args
        const eventValue = parseBigNumber(args)
        dispatch(addNewEvent({ eventName: 'fullfilBid', eventValue }))
      })
    }
    return () => {
      library?.removeAllListeners(fullfilBidEvent as EventFilter)
    }
  }, [fullfilBidEvent])
}
export const useDisputeAuctionLogs = (contract: Contract | null) => {
  const { library } = useActiveWeb3React()
  const disputeAuctionEvent = contract?.filters.ListOnMarketplace()
  const dispatch = useDispatch()
  useEffect(() => {
    if (disputeAuctionEvent) {
      library?.on(disputeAuctionEvent as EventFilter, result => {
        const eventLogs = contract?.interface.parseLog({ data: result.data, topics: result.topics })
        const args = eventLogs?.args
        const eventValue = parseBigNumber(args)
        dispatch(addNewEvent({ eventName: 'DisputeAuction', eventValue }))
      })
    }
    return () => {
      library?.removeAllListeners(disputeAuctionEvent as EventFilter)
    }
  }, [disputeAuctionEvent])
}
export const useBuyNowLogs = (contract: Contract | null) => {
  const { library } = useActiveWeb3React()
  const buyNowEvent = contract?.filters.ListOnMarketplace()
  const dispatch = useDispatch()
  useEffect(() => {
    if (buyNowEvent) {
      library?.on(buyNowEvent as EventFilter, result => {
        const eventLogs = contract?.interface.parseLog({ data: result.data, topics: result.topics })
        const args = eventLogs?.args
        const eventValue = parseBigNumber(args)
        dispatch(addNewEvent({ eventName: 'BuyNow', eventValue }))
      })
    }
    return () => {
      library?.removeAllListeners(buyNowEvent as EventFilter)
    }
  }, [buyNowEvent])
}
export const useUserReservesFreeLogs = (contract: Contract | null) => {
  const { library } = useActiveWeb3React()
  const userReservesFreeEvent = contract?.filters.ListOnMarketplace()
  const dispatch = useDispatch()
  useEffect(() => {
    if (userReservesFreeEvent) {
      library?.on(userReservesFreeEvent as EventFilter, result => {
        const eventLogs = contract?.interface.parseLog({ data: result.data, topics: result.topics })
        const args = eventLogs?.args
        const eventValue = parseBigNumber(args)
        dispatch(addNewEvent({ eventName: 'UserReservesFree', eventValue }))
      })
    }
    return () => {
      library?.removeAllListeners(userReservesFreeEvent as EventFilter)
    }
  }, [userReservesFreeEvent])
}

export const useListOnMarketplace = (): ((nftContract: string, tokenId: string, listingPrice: string) => any) => {
  const { account, library } = useActiveWeb3React()
  const contract = useStartFiMarketplace(true)
  const listOnMarketplace = useSubmitTransaction()
  const toggleWalletModal = useWalletModalToggle()
  useListOnMarketplaceLogs(contract)
  return useCallback(
    async (nftContract: string, tokenId: string, listingPrice: string) => {
      if (!account) {
        toggleWalletModal()
        return `account: ${account} is not connected`
      }
      try {
        return await listOnMarketplace(
          'listOnMarketplace',
          [nftContract, tokenId, listingPrice],
          contract,
          account,
          library
        )
      } catch (e) {
        console.log('error', e)
        return e
      }
    },
    [account, contract, library, listOnMarketplace, toggleWalletModal]
  )
}
export const useCreateAuction = (): ((
  nftContract: string,
  tokenId: string,
  listingPrice: string,
  qualifyAmount: string,
  sellForEnabled: string,
  sellFor: string,
  duration: string
) => any) => {
  const { account, library } = useActiveWeb3React()
  const contract = useStartFiMarketplace(true)
  const createAuction = useSubmitTransaction()
  const toggleWalletModal = useWalletModalToggle()
  useCreateAuctionLogs(contract)
  return useCallback(
    async (
      nftContract: string,
      tokenId: string,
      listingPrice: string,
      qualifyAmount: string,
      sellForEnabled: string,
      sellFor: string,
      duration: string
    ) => {
      if (!account) {
        toggleWalletModal()
        return `account: ${account} is not connected`
      }
      try {
        return await createAuction(
          'createAuction',
          [nftContract, tokenId, listingPrice, qualifyAmount, sellForEnabled, sellFor, duration],
          contract,
          account,
          library
        )
      } catch (e) {
        console.log('error', e)
        return e
      }
    },
    [account, contract, library, createAuction, toggleWalletModal]
  )
}

export const useBid = (): ((listingId: string, tokenAddress: string, tokenId: string, bidPrice: string) => any) => {
  const { account, library } = useActiveWeb3React()
  const contract = useStartFiMarketplace(true)
  const bid = useSubmitTransaction()
  const toggleWalletModal = useWalletModalToggle()
  useBidOnAuctionLogs(contract)
  return useCallback(
    async (listingId: string, tokenAddress: string, tokenId: string, bidPrice: string) => {
      if (!account) {
        toggleWalletModal()
        return `account: ${account} is not connected`
      }
      try {
        return await bid(
          'bid',
          [formatBytes32String(listingId), tokenAddress, tokenId, bidPrice],
          contract,
          account,
          library
        )
      } catch (e) {
        console.log('error', e)
        return e
      }
    },
    [account, contract, library, bid, toggleWalletModal]
  )
}

export const useFullfilBid = (): ((listingId: string) => any) => {
  const { account, library } = useActiveWeb3React()
  const contract = useStartFiMarketplace(true)
  const fullfilBid = useSubmitTransaction()
  const toggleWalletModal = useWalletModalToggle()
  useFullfilBidLogs(contract)
  return useCallback(
    async (listingId: string) => {
      if (!account) {
        toggleWalletModal()
        return `account: ${account} is not connected`
      }
      try {
        return await fullfilBid('fullfillBid', [formatBytes32String(listingId)], contract, account, library)
      } catch (e) {
        console.log('error', e)
        return e
      }
    },
    [account, contract, library, fullfilBid, toggleWalletModal]
  )
}

export const useDeList = (): ((listingId: string) => any) => {
  const { account, library } = useActiveWeb3React()
  const contract = useStartFiMarketplace(true)
  const delist = useSubmitTransaction()
  const toggleWalletModal = useWalletModalToggle()
  useDeListOffMarketplaceLogs(contract)
  return useCallback(
    async (listingId: string) => {
      if (!account) {
        toggleWalletModal()
        return `account: ${account} is not connected`
      }
      try {
        return await delist('deList', [formatBytes32String(listingId)], contract, account, library)
      } catch (e) {
        console.log('error', e)
        return e
      }
    },
    [account, contract, library, delist, toggleWalletModal]
  )
}

export const useBuyNow = (): ((listingId: string, price: string) => any) => {
  const { account, library } = useActiveWeb3React()
  const contract = useStartFiMarketplace(true)
  const delist = useSubmitTransaction()
  const toggleWalletModal = useWalletModalToggle()
  useBuyNowLogs(contract)
  return useCallback(
    async (listingId: string, price: string) => {
      if (!account) {
        toggleWalletModal()
        return `account: ${account} is not connected`
      }
      try {
        return await delist('buyNow', [formatBytes32String(listingId), price], contract, account, library)
      } catch (e) {
        console.log('error', e)
        return e
      }
    },
    [account, contract, library, delist, toggleWalletModal]
  )
}

export const useDisputeAuction = (): ((listingId: string) => any) => {
  const { account, library } = useActiveWeb3React()
  const contract = useStartFiMarketplace(true)
  const disputeAuction = useSubmitTransaction()
  const toggleWalletModal = useWalletModalToggle()
  useDisputeAuctionLogs(contract)
  return useCallback(
    async (listingId: string) => {
      if (!account) {
        toggleWalletModal()
        return `account: ${account} is not connected`
      }
      try {
        return await disputeAuction('disputeAuction', [formatBytes32String(listingId)], contract, account, library)
      } catch (e) {
        console.log('error', e)
        return e
      }
    },
    [account, contract, library, disputeAuction, toggleWalletModal]
  )
}

export const useFreeReserves = (): ((listingId: string) => any) => {
  const { account, library } = useActiveWeb3React()
  const contract = useStartFiMarketplace(true)
  const freeReserves = useSubmitTransaction()
  const toggleWalletModal = useWalletModalToggle()
  useUserReservesFreeLogs(contract)
  return useCallback(
    async (listingId: string) => {
      if (!account) {
        toggleWalletModal()
        return `account: ${account} is not connected`
      }
      try {
        return await freeReserves('disputeAuction', [formatBytes32String(listingId)], contract, account, library)
      } catch (e) {
        console.log('error', e)
        return e
      }
    },
    [account, contract, library, freeReserves, toggleWalletModal]
  )
}

/* Evaluate Transactions */
export const useGetUserReserved = (): ((userAddress: string) => any) => {
  const contract = useStartFiMarketplace(false)
  return useCallback(
    async (userAddress: string) => {
      const userReserved = await evaluateTransaction(contract, 'getUserReserved', [userAddress])
      return {
        userReserved
      }
    },
    [contract]
  )
}

export const useGetServiceFee = () => {
  const contract = useStartFiMarketplace(false)
  return useCallback(async () => {
    const userReserved = await evaluateTransaction(contract, 'getServiceFee', [])
    return {
      userReserved
    }
  }, [contract])
}

export const useWinnerBid = (): ((listingId: string) => any) => {
  const contract = useStartFiMarketplace(false)
  return useCallback(
    async (listingId: string) => {
      const userReserved = await evaluateTransaction(contract, 'winnerBid', [formatBytes32String(listingId)])
      return {
        userReserved
      }
    },
    [contract]
  )
}

export const useGetAuctionBidDetails = (): ((listingId: string, bidder: string) => any) => {
  const contract = useStartFiMarketplace(false)
  return useCallback(
    async (listingId: string, bidder: string) => {
      const userReserved = await evaluateTransaction(contract, 'getAuctionBidDetails', [
        formatBytes32String(listingId),
        bidder
      ])
      return {
        userReserved
      }
    },
    [contract]
  )
}
export const useGetListingDetails = (): ((listingId: string) => any) => {
  const contract = useStartFiMarketplace(false)
  return useCallback(
    async (listingId: string) => {
      const userReserved = await evaluateTransaction(contract, 'getListingDetails', [listingId])
      return {
        userReserved
      }
    },
    [contract]
  )
}
