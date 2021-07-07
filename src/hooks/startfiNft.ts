import { useCallback, useEffect } from 'react'
import { useSubmitTransaction } from 'services/Blockchain/submitTransaction'
import { useWalletModalToggle } from 'state/application/hooks'
import { evaluateTransaction } from 'services/Blockchain/useEvaluateTransaction'
import { useActiveWeb3React } from 'hooks'
import { useStartFiPayment, useStartFiNft } from './useContract'
import { Contract, EventFilter } from 'ethers'
import { useDispatch } from 'react-redux'
import { addNewEvent } from 'state/blockchainEvents/actions'
import { STARTFI_MARKET_PLACE_NETWORK } from 'constants/index'
export const useTransferNftLogs = (contract: Contract | null) => {
  const { library } = useActiveWeb3React()
  const transferEvent = contract?.filters.Transfer()
  const dispatch = useDispatch()
  useEffect(() => {
    if (transferEvent) {
      library?.on(transferEvent as EventFilter, result => {
        const eventLogs = contract?.interface.parseLog({ data: result.data, topics: result.topics })
        const args = eventLogs?.args
        const eventValue = args && { sender: args[0], recipient: args[1], amount: args[2].toNumber() }
        dispatch(addNewEvent({ eventName: 'TransferNft', eventValue }))
      })
    }

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
    if (ApprovalEvent) {
      library?.on(ApprovalEvent as EventFilter, result => {
        const eventLogs = contract?.interface.parseLog({ data: result.data, topics: result.topics })
        const args = eventLogs?.args
        const eventValue = args && { sender: args[0], recipient: args[1], amount: args[2].toNumber() }
        dispatch(addNewEvent({ eventName: 'ApprovalNft', eventValue }))
      })
    }
    return () => {
      library?.removeAllListeners(ApprovalEvent as EventFilter)
    }
  }, [ApprovalEvent])
}
export const useNftInfo = () => {
  const contract = useStartFiNft(false)
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
  const contract = useStartFiPayment(true)
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
            'MintNFTWithRoyalty',
            [address, ipfsHash, share as string, base as string],
            contract,
            account,
            library
          )
        } else {
          return await mint('MintNFTWithoutRoyalty', [address, ipfsHash], contract, account, library)
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
  const contract = useStartFiNft(false)
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
  const contract = useStartFiNft(false)
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
  const contract = useStartFiNft(false)
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
export const useGrantRoleNft = (): (() => any) => {
  const { account, library } = useActiveWeb3React()
  const contract = useStartFiNft(true)
  const grantRole = useSubmitTransaction()
  const toggleWalletModal = useWalletModalToggle()
  useApprovalNftLogs(contract)
  return useCallback(async () => {
    if (!account) {
      toggleWalletModal()
      return `account: ${account} is not connected`
    }
    try {
      return await grantRole(
        'grantRole',
        [
          '0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6',
          '0xE7C92b5c869f980a616EaEdd3D9f85261aEB65ce'
        ],
        contract,
        account,
        library
      )
    } catch (e) {
      console.log('error', e)
      return e
    }
  }, [account, contract, library, grantRole, toggleWalletModal])
}

export const useApproveNft = (): ((approvedContract: string, tokenId: string) => any) => {
  const { account, library } = useActiveWeb3React()
  const contract = useStartFiNft(true)
  const approve = useSubmitTransaction()
  const toggleWalletModal = useWalletModalToggle()
  useApprovalNftLogs(contract)
  return useCallback(
    async (approvedContract: string, tokenId: string) => {
      if (!account) {
        toggleWalletModal()
        return `account: ${account} is not connected`
      }
      try {
        let spender = ''
        if (approvedContract === 'marketplace') {
          spender = STARTFI_MARKET_PLACE_NETWORK
        }
        return await approve('approve', [spender, tokenId], contract, account, library)
      } catch (e) {
        console.log('error', e)
        return e
      }
    },
    [account, contract, library, approve, toggleWalletModal]
  )
}
export const useGetApproverAddress = (): ((tokenId: string) => any) => {
  const contract = useStartFiNft(false)
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
  const contract = useStartFiNft(false)
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

export const useNftPaymentInfo = (): (() => any) => {
  const contract = useStartFiPayment(false)
  return useCallback(() => {
    const getInfo = async () => {
      const info = await evaluateTransaction(contract, 'info', [])
      return info
    }
    return getInfo()
  }, [contract])
}
// NFT Payment Owner Transactions
export const useChangeFeesNftPayment = (): ((newFees: string) => any) => {
  const { account, library } = useActiveWeb3React()
  const contract = useStartFiPayment(true)
  const changeFees = useSubmitTransaction()
  const toggleWalletModal = useWalletModalToggle()
  return useCallback(
    async (newFees: string) => {
      if (!account) {
        toggleWalletModal()
        return `account: ${account} is not connected`
      }
      try {
        return await changeFees('changeFees', [newFees], contract, account, library)
      } catch (e) {
        console.log('error', e)
        return e
      }
    },
    [account, contract, library, changeFees, toggleWalletModal]
  )
}

export const useChangeNftContractNftPayment = (): ((nftAddress: string) => any) => {
  const { account, library } = useActiveWeb3React()
  const contract = useStartFiPayment(true)
  const changeNftContract = useSubmitTransaction()
  const toggleWalletModal = useWalletModalToggle()
  return useCallback(
    async (nftAddress: string) => {
      if (!account) {
        toggleWalletModal()
        return `account: ${account} is not connected`
      }
      try {
        return await changeNftContract('changeNftContract', [nftAddress], contract, account, library)
      } catch (e) {
        console.log('error', e)
        return e
      }
    },
    [account, contract, library, changeNftContract, toggleWalletModal]
  )
}
/*Transaction may be removed */
export const useChangeTokenContractNftPayment = (): ((tokenAddress: string) => any) => {
  const { account, library } = useActiveWeb3React()
  const contract = useStartFiPayment(true)
  const changeTokenContract = useSubmitTransaction()
  const toggleWalletModal = useWalletModalToggle()
  return useCallback(
    async (nftAddress: string) => {
      if (!account) {
        toggleWalletModal()
        return `account: ${account} is not connected`
      }
      try {
        return await changeTokenContract('changeTokenContract', [nftAddress], contract, account, library)
      } catch (e) {
        console.log('error', e)
        return e
      }
    },
    [account, contract, library, changeTokenContract, toggleWalletModal]
  )
}
