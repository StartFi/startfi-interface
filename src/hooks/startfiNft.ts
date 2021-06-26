import { useCallback, useEffect } from 'react'
import { useSubmitTransaction } from 'services/Blockchain/submitTransaction'
import { useWalletModalToggle } from 'state/application/hooks'
import { evaluateTransaction } from 'services/Blockchain/useEvaluateTransaction'
import { useActiveWeb3React } from 'hooks'
import { useStartFiRoyality } from './useContract'
import { Contract, EventFilter } from 'ethers'
import { useDispatch } from 'react-redux'
import { addNewEvent } from 'state/blockchainEvents/actions'

export const useTransferNftLogs = (contract: Contract | null) => {
  const { library } = useActiveWeb3React()
  const transferEvent = contract?.filters.Transfer()
  const dispatch = useDispatch()
  useEffect(() => {
    library?.on(transferEvent as EventFilter, result => {
      const eventLogs = contract?.interface.parseLog({ data: result.data, topics: result.topics })
      const args = eventLogs?.args
      const eventValue = args && { sender: args[0], recipient: args[1], amount: args[2].toNumber() }
      dispatch(addNewEvent({ eventName: 'TransferNft', eventValue }))
    })
    return () => {
      library?.removeAllListeners(transferEvent as EventFilter)
    }
  }, [transferEvent])
}
export const useApprovalNftLogs = (contract: Contract | null) => {
  const { library } = useActiveWeb3React()
  const ApprovalEvent = contract?.filters.Approval()
  const dispatch = useDispatch()
  useEffect(() => {
    library?.on(ApprovalEvent as EventFilter, result => {
      const eventLogs = contract?.interface.parseLog({ data: result.data, topics: result.topics })
      const args = eventLogs?.args
      const eventValue = args && { sender: args[0], recipient: args[1], amount: args[2].toNumber() }
      dispatch(addNewEvent({ eventName: 'ApprovalNft', eventValue }))
    })
    return () => {
      library?.removeAllListeners(ApprovalEvent as EventFilter)
    }
  }, [ApprovalEvent])
}
export const useNftInfo = () => {
  const contract = useStartFiRoyality(false)
  return useCallback(async () => {
    const name = await evaluateTransaction(contract, 'name', [])
    const symbol = await evaluateTransaction(contract, 'symbol', [])
    return {
      name,
      symbol
    }
  }, [contract])
}

export const useMint = (): ((address: string, ipfsHash: string, share?: string, base?: string) => any) => {
  const { account, library } = useActiveWeb3React()
  const contract = useStartFiRoyality(true)
  const mint = useSubmitTransaction()
  const toggleWalletModal = useWalletModalToggle()
  return useCallback(
    async (address: string, ipfsHash: string, share?: string, base?: string) => {
      if (!account || !address) {
        toggleWalletModal()
        return `account: ${account} is not connected`
      }
      try {
        if (share && base) {
          return await mint(
            'mintWithRoyalty',
            [address, ipfsHash, share as string, base as string],
            contract,
            account,
            library
          )
        } else {
          return await mint('mint', [address, ipfsHash], contract, account, library)
        }
      } catch (e) {
        console.log('error', e)
        return e
      }
    },
    [account, contract, library, mint, toggleWalletModal]
  )
}

export const useGetTokenURI = (): ((tokenId: string) => any) => {
  const contract = useStartFiRoyality(false)
  return useCallback(
    (tokenId: string) => {
      const getUri = async () => {
        const uri = await evaluateTransaction(contract, 'tokenURI', [tokenId])
        return uri
      }
      return getUri()
    },
    [contract]
  )
}

export const useGetNftOwner = (): ((tokenId: string) => any) => {
  const contract = useStartFiRoyality(false)
  return useCallback(
    (tokenId: string) => {
      const getUri = async () => {
        const uri = await evaluateTransaction(contract, 'ownerOf', [tokenId])
        return uri
      }
      return getUri()
    },
    [contract]
  )
}

export const useNftBalance = (): ((address: string) => any) => {
  const contract = useStartFiRoyality(false)
  return useCallback(
    (address: string) => {
      const getBalance = async () => {
        const balance = await evaluateTransaction(contract, 'balanceOf', [address])
        return balance
      }
      return getBalance()
    },
    [contract]
  )
}

export const useAproveNft = (): ((address: string, tokenId: string) => any) => {
  const { account, library } = useActiveWeb3React()
  const contract = useStartFiRoyality(true)
  const approve = useSubmitTransaction()
  const toggleWalletModal = useWalletModalToggle()
  useApprovalNftLogs(contract)
  return useCallback(
    async (address: string, tokenId: string) => {
      if (!account) {
        toggleWalletModal()
        return `account: ${account} is not connected`
      }
      try {
        return await approve('approve', [address, tokenId], contract, account, library)
      } catch (e) {
        console.log('error', e)
        return e
      }
    },
    [account, contract, library, approve, toggleWalletModal]
  )
}
export const useGetApproverAddress = (): ((tokenId: string) => any) => {
  const contract = useStartFiRoyality(false)
  return useCallback(
    (tokenId: string) => {
      const getAddress = async () => {
        const address = await evaluateTransaction(contract, 'getApproved', [tokenId])
        return address
      }
      return getAddress()
    },
    [contract]
  )
}

export const useRoyaltyInfo = (): ((tokenId: string, value: string) => any) => {
  const contract = useStartFiRoyality(false)
  return useCallback(
    (tokenId: string, value: string) => {
      const getAddress = async () => {
        const address = await evaluateTransaction(contract, 'royaltyInfo', [tokenId, value])
        return address
      }
      return getAddress()
    },
    [contract]
  )
}
