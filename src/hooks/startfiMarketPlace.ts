import { useCallback } from 'react'
import { useStartFiMarketplace } from './useContract'
import { useSubmitTransaction } from 'services/Blockchain/submitTransaction'
import { useWalletModalToggle } from 'state/application/hooks'
import { evaluateTransaction } from 'services/Blockchain/useEvaluateTransaction'
import { useActiveWeb3React } from 'hooks'
import { abi as STARTFI_MARKET_PLACE_ABI } from '../constants/abis/StartFiMarketPlace.json'
import abiDecoder from 'abi-decoder'
import parseBigNumber from 'utils/parseBigNumber'

abiDecoder.addABI(STARTFI_MARKET_PLACE_ABI)

export const useListOnMarketplace = (): ((
  nftContract: string,
  tokenId: string | number,
  listingPrice: string | number
) => any) => {
  const { account, library } = useActiveWeb3React()
  const contract = useStartFiMarketplace(true)
  const listOnMarketplace = useSubmitTransaction()
  const toggleWalletModal = useWalletModalToggle()
  return useCallback(
    async (nftContract: string, tokenId: string | number, listingPrice: string | number) => {
      if (!account) {
        toggleWalletModal()
        return `account: ${account} is not connected`
      }
      try {
        const transaction = await listOnMarketplace(
          'listOnMarketplace',
          [nftContract, tokenId, listingPrice],
          contract,
          account,
          library
        )
        const transactionReceipt = await library?.getTransactionReceipt((transaction as any).hash)
        const decodedLogs = abiDecoder.decodeLogs(transactionReceipt?.logs)
        return decodedLogs[0].events
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
  tokenId: string | number,
  listingPrice: string | number,
  qualifyAmount: string | number,
  sellForEnabled: boolean,
  sellingPrice: string | number,
  duration: string | number
) => any) => {
  const { account, library } = useActiveWeb3React()
  const contract = useStartFiMarketplace(true)
  const createAuction = useSubmitTransaction()
  const toggleWalletModal = useWalletModalToggle()
  return useCallback(
    async (
      nftContract: string,
      tokenId: string | number,
      listingPrice: string | number,
      qualifyAmount: string | number,
      sellForEnabled: boolean,
      sellingPrice: string | number,
      duration: string | number
    ) => {
      if (!account) {
        toggleWalletModal()
        return `account: ${account} is not connected`
      }
      try {
        console.log(
          nftContract,
          tokenId,
          listingPrice,
          qualifyAmount,
          sellForEnabled,
          sellingPrice,
          duration,
          'test txn param'
        )

        const transaction = await createAuction(
          'createAuction',
          [nftContract, tokenId, listingPrice, qualifyAmount, sellForEnabled, sellingPrice, duration],
          contract,
          account,
          library
        )
        const transactionReceipt = await library?.getTransactionReceipt((transaction as any).hash)
        const decodedLogs = abiDecoder.decodeLogs(transactionReceipt?.logs)
        return decodedLogs[0].events
      } catch (e) {
        console.log('error', e)
        return e
      }
    },
    [account, contract, library, createAuction, toggleWalletModal]
  )
}

export const useBid = (): ((listingId: string | number, bidPrice: string | number) => any) => {
  const { account, library } = useActiveWeb3React()
  const contract = useStartFiMarketplace(true)
  const bid = useSubmitTransaction()
  const toggleWalletModal = useWalletModalToggle()
  return useCallback(
    async (listingId: string | number, bidPrice: string | number) => {
      if (!account) {
        toggleWalletModal()
        return `account: ${account} is not connected`
      }
      try {
        const transaction = await bid('bid', [listingId, bidPrice], contract, account, library)
        const transactionReceipt = await library?.getTransactionReceipt((transaction as any).hash)
        const decodedLogs = abiDecoder.decodeLogs(transactionReceipt?.logs)
        return decodedLogs[0].events
      } catch (e) {
        console.log('error', e)
        return e
      }
    },
    [account, contract, library, bid, toggleWalletModal]
  )
}

export const useFullfilBid = (): ((listingId: string | number) => any) => {
  const { account, library } = useActiveWeb3React()
  const contract = useStartFiMarketplace(true)
  const fullfilBid = useSubmitTransaction()
  const toggleWalletModal = useWalletModalToggle()
  return useCallback(
    async (listingId: string | number) => {
      if (!account) {
        toggleWalletModal()
        return `account: ${account} is not connected`
      }
      try {
        const transaction = await fullfilBid('fullfillBid', [listingId], contract, account, library)
        const transactionReceipt = await library?.getTransactionReceipt((transaction as any).hash)
        const decodedLogs = abiDecoder.decodeLogs(transactionReceipt?.logs)
        return decodedLogs[0].events
      } catch (e) {
        console.log('error', e)
        return e
      }
    },
    [account, contract, library, fullfilBid, toggleWalletModal]
  )
}

export const useDeList = (): ((listingId: string | number) => any) => {
  const { account, library } = useActiveWeb3React()
  const contract = useStartFiMarketplace(true)
  const delist = useSubmitTransaction()
  const toggleWalletModal = useWalletModalToggle()
  return useCallback(
    async (listingId: string | number) => {
      if (!account) {
        toggleWalletModal()
        return `account: ${account} is not connected`
      }
      try {
        return await delist('deList', [listingId], contract, account, library)
      } catch (e) {
        console.log('error', e)
        return e
      }
    },
    [account, contract, library, delist, toggleWalletModal]
  )
}

export const useBuyNow = (): ((listingId: string | number, price: string | number) => any) => {
  const { account, library } = useActiveWeb3React()
  const contract = useStartFiMarketplace(true)
  const buyNow = useSubmitTransaction()
  const toggleWalletModal = useWalletModalToggle()
  return useCallback(
    async (listingId: string | number, price: string | number) => {
      if (!account) {
        toggleWalletModal()
        return `account: ${account} is not connected`
      }
      try {
        return await buyNow('buyNow', [listingId, price], contract, account, library)
      } catch (e) {
        console.log('error', e)
        return e
      }
    },
    [account, contract, library, buyNow, toggleWalletModal]
  )
}

export const useDisputeAuction = (): ((listingId: string | number) => any) => {
  const { account, library } = useActiveWeb3React()
  const contract = useStartFiMarketplace(true)
  const disputeAuction = useSubmitTransaction()
  const toggleWalletModal = useWalletModalToggle()
  return useCallback(
    async (listingId: string | number) => {
      if (!account) {
        toggleWalletModal()
        return `account: ${account} is not connected`
      }
      try {
        return await disputeAuction('disputeAuction', [listingId], contract, account, library)
      } catch (e) {
        console.log('error', e)
        return e
      }
    },
    [account, contract, library, disputeAuction, toggleWalletModal]
  )
}

export const useFreeReserves = (): (() => any) => {
  const { account, library } = useActiveWeb3React()
  const contract = useStartFiMarketplace(true)
  const freeReserves = useSubmitTransaction()
  const toggleWalletModal = useWalletModalToggle()
  return useCallback(async () => {
    if (!account) {
      toggleWalletModal()
      return `account: ${account} is not connected`
    }
    try {
      return await freeReserves('freeReserves', [], contract, account, library)
    } catch (e) {
      console.log('error', e)
      return e
    }
  }, [account, contract, library, freeReserves, toggleWalletModal])
}

/* Evaluate Transactions */
export const useGetUserReserved = (): ((userAddress: string) => any) => {
  const contract = useStartFiMarketplace(false)
  return useCallback(
    async (userAddress: string) => {
      try {
        const userReserved = await evaluateTransaction(contract, 'getUserReserved', [userAddress])
        const reserved = userReserved.toHexString()
        return reserved
      } catch (e) {
        console.log(e)
        return e
      }
    },
    [contract]
  )
}

export const useGetServiceFee = () => {
  const contract = useStartFiMarketplace(false)
  return useCallback(async () => {
    try {
      const userReserved = await evaluateTransaction(contract, 'getServiceFee', [])
      return userReserved.toHexString()
    } catch (e) {
      console.log(e)
      return e
    }
  }, [contract])
}

export const useWinnerBid = (): ((listingId: string | number) => any) => {
  const contract = useStartFiMarketplace(false)
  return useCallback(
    async (listingId: string | number) => {
      const bidWinner = await evaluateTransaction(contract, 'winnerBid', [listingId])
      return bidWinner
    },
    [contract]
  )
}

export const useGetAuctionBidDetails = (): ((listingId: string | number, bidder: string) => any) => {
  const contract = useStartFiMarketplace(false)
  return useCallback(
    async (listingId: string | number, bidder: string) => {
      try {
        const auctionBidDetails = await evaluateTransaction(contract, 'getAuctionBidDetails', [listingId, bidder])
        return parseBigNumber(auctionBidDetails)
      } catch (e) {
        console.log(e)
        return e
      }
    },
    [contract]
  )
}
export const useGetListingDetails = (): ((listingId: string | number) => any) => {
  const contract = useStartFiMarketplace(false)
  return useCallback(
    async (listingId: string | number) => {
      try {
        const listingDetails = await evaluateTransaction(contract, 'getListingDetails', [listingId])
        return parseBigNumber(listingDetails)
      } catch (e) {
        console.log(e)
        return e
      }
    },
    [contract]
  )
}
