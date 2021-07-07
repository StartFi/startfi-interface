import { useDispatch } from 'react-redux'
import { Contract, EventFilter } from 'ethers'
import { useStartFiToken } from './useContract'
import { useCallback, useEffect } from 'react'
import { useSubmitTransaction } from 'services/Blockchain/submitTransaction'
import { useWalletModalToggle } from 'state/application/hooks'
import { evaluateTransaction } from 'services/Blockchain/useEvaluateTransaction'
import { useActiveWeb3React } from 'hooks'
import { addNewEvent } from '../state/blockchainEvents/actions'
import { STARTFI_MARKET_PLACE_NETWORK, STARTFI_NFT_PAYMENT_NETWORK } from 'constants/index'

export const useTransferTokenLogs = (contract: Contract | null) => {
  const { library } = useActiveWeb3React()
  const transferEvent = contract?.filters.Transfer()
  const dispatch = useDispatch()
  useEffect(() => {
    if (transferEvent) {
      library?.on(transferEvent as EventFilter, result => {
        const eventLogs = contract?.interface.parseLog({ data: result.data, topics: result.topics })
        const args = eventLogs?.args
        const eventValue = args && { sender: args[0], recipient: args[1], amount: args[2].toNumber() }
        dispatch(addNewEvent({ eventName: 'transferToken', eventValue }))
      })
    }
    return () => {
      library?.removeAllListeners(transferEvent as EventFilter)
    }
  }, [transferEvent])
}
export const useApprovalTokenLogs = (contract: Contract | null) => {
  const { library } = useActiveWeb3React()
  const ApprovalEvent = contract?.filters.Approval()
  const dispatch = useDispatch()
  useEffect(() => {
    if (ApprovalEvent) {
      library?.on(ApprovalEvent as EventFilter, result => {
        const eventLogs = contract?.interface.parseLog({ data: result.data, topics: result.topics })
        const args = eventLogs?.args
        const eventValue = args && { sender: args[0], recipient: args[1], amount: args[2].toNumber() }
        dispatch(addNewEvent({ eventName: 'ApprovalToken', eventValue }))
      })
    }
    return () => {
      library?.removeAllListeners(ApprovalEvent as EventFilter)
    }
  }, [ApprovalEvent])
}
export const useTokenInfo = () => {
  const contract = useStartFiToken(false)
  return useCallback(() => {
    const getInfo = async () => {
      const name = await evaluateTransaction(contract, 'name', [])
      const symbol = await evaluateTransaction(contract, 'symbol', [])
      const decimals = await evaluateTransaction(contract, 'decimals', [])
      const totalSupply = await evaluateTransaction(contract, 'totalSupply', [])
      return {
        name,
        symbol,
        decimals,
        totalSupply
      }
    }
    return getInfo()
  }, [contract])
}

export const useTokenBalance = (): ((address: string) => any) => {
  const contract = useStartFiToken(false)
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
export const useGetAllowance = (): ((owner: string, spender: string) => any) => {
  const contract = useStartFiToken(false)
  return useCallback(
    (owner: string, spender: string) => {
      const getAllowance = async () => {
        const allowance = await evaluateTransaction(contract, 'allowance', [owner, spender])
        return allowance
      }
      return getAllowance()
    },
    [contract]
  )
}

export const useApproveToken = (): ((approvedContract: string, amount: string) => any) => {
  const { account, library } = useActiveWeb3React()
  const contract = useStartFiToken(true)
  const approve = useSubmitTransaction()
  const toggleWalletModal = useWalletModalToggle()
  useApprovalTokenLogs(contract)
  return useCallback(
    async (approvedContract: string, amount: string) => {
      if (!account) {
        toggleWalletModal()
        return `account: ${account} is not connected`
      }
      try {
        let spender = ''
        if (approvedContract === 'payment') {
          spender = STARTFI_NFT_PAYMENT_NETWORK
        } else if (approvedContract === 'marketplace') {
          spender = STARTFI_MARKET_PLACE_NETWORK
        }
        return await approve('approve', [spender, amount], contract, account, library)
      } catch (e) {
        console.log('error', e)
        return e
      }
    },
    [account, contract, library, approve, toggleWalletModal]
  )
}
export const useIncreaseAllowance = (): ((approvedContract: string, addedValue: string) => any) => {
  const { account, library } = useActiveWeb3React()
  const spender = STARTFI_NFT_PAYMENT_NETWORK
  const contract = useStartFiToken(true)
  const approve = useSubmitTransaction()
  const toggleWalletModal = useWalletModalToggle()
  return useCallback(
    async (approvedContract: string, addedValue: string) => {
      if (!account) {
        toggleWalletModal()
        return `account: ${account} is not connected`
      }
      try {
        let spender = ''
        if (approvedContract === 'payment') {
          spender = STARTFI_NFT_PAYMENT_NETWORK
        } else if (approvedContract === 'marketplace') {
          spender = STARTFI_MARKET_PLACE_NETWORK
        }
        alert('spender ' + spender)
        return await approve('increaseAllowance', [spender, addedValue], contract, account, library)
      } catch (e) {
        console.log('error', e)
        return e
      }
    },
    [account, contract, library, approve, toggleWalletModal]
  )
}

export const useDecreaseAllowance = (): ((approvedContract: string, substractedValue: string) => any) => {
  const { account, library } = useActiveWeb3React()
  const contract = useStartFiToken(true)
  const approve = useSubmitTransaction()
  const toggleWalletModal = useWalletModalToggle()
  return useCallback(
    async (approvedContract: string, subtractedValue: string) => {
      if (!account) {
        toggleWalletModal()
        return `account: ${account} is not connected`
      }
      try {
        let spender = ''
        if (approvedContract === 'payment') {
          spender = STARTFI_NFT_PAYMENT_NETWORK
        } else if (approvedContract === 'marketplace') {
          spender = STARTFI_MARKET_PLACE_NETWORK
        }
        alert('spender ' + spender)
        return await approve('decreaseAllowance', [spender, subtractedValue], contract, account, library)
      } catch (e) {
        console.log('error', e)
        return e
      }
    },
    [account, contract, library, approve, toggleWalletModal]
  )
}
export const useTransfer = (): ((address: string, amount: string) => any) => {
  const contract = useStartFiToken(true)
  useTransferTokenLogs(contract)
  const transfer = useSubmitTransaction()
  const { account, library } = useActiveWeb3React()
  const toggleWalletModal = useWalletModalToggle()
  return useCallback(
    async (address: string, amount: string) => {
      if (!account) {
        toggleWalletModal()
        return `account: ${account} is not connected`
      }
      try {
        return await transfer('transfer', [address, amount], contract, account, library)
      } catch (e) {
        console.log('error', e)
        return e
      }
    },
    [transfer, account, contract, library, toggleWalletModal]
  )
}
export const useBurn = (): ((amount: string, from?: string) => any) => {
  const contract = useStartFiToken(true)
  const transfer = useSubmitTransaction()
  const { account, library } = useActiveWeb3React()
  const toggleWalletModal = useWalletModalToggle()
  return useCallback(
    async (amount: string, from?: string) => {
      if (!account) {
        toggleWalletModal()
        return `account: ${account} is not connected`
      }
      try {
        if (from) {
          return await transfer('burnFrom', [from, amount], contract, account, library)
        }
        return await transfer('burn', [amount], contract, account, library)
      } catch (e) {
        console.log('error', e)
        return e
      }
    },
    [transfer, account, contract, library, toggleWalletModal]
  )
}
