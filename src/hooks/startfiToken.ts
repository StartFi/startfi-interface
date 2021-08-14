import { useCallback } from 'react'
import { useStartFiToken } from './useContract'
import { useSubmitTransaction } from 'services/Blockchain/submitTransaction'
import { useWalletModalToggle } from 'state/application/hooks'
import { evaluateTransaction } from 'services/Blockchain/useEvaluateTransaction'
import { useActiveWeb3React } from 'hooks'
import { signERC2612Permit } from 'eth-permit'
import { address as STARTFI_TOKEN_ADDRESS } from '../constants/abis/StartFiToken.json'

import abiDecoder from 'abi-decoder'
import { abi as STARTFI_TOKEN_ABI } from '../constants/abis/StartFiToken.json'
import { utils } from 'ethers'
import { useERC20PermitSignature } from './usePermit'
abiDecoder.addABI(STARTFI_TOKEN_ABI)
export const useTokenInfo = () => {
  const contract = useStartFiToken(false)
  return useCallback(() => {
    const getInfo = async () => {
      try {
        const name = await evaluateTransaction(contract, 'name', [])
        const symbol = await evaluateTransaction(contract, 'symbol', [])
        const decimals = await evaluateTransaction(contract, 'decimals', [])
        const totalSupply = await evaluateTransaction(contract, 'totalSupply', [])
        const totalSupplyHex = totalSupply.toHexString()
        return {
          name,
          symbol,
          decimals,
          totalSupplyHex
        }
      } catch (e) {
        console.log(e)
        return e
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
        try {
          const balance = await evaluateTransaction(contract, 'balanceOf', [address])
          return balance.toHexString()
        } catch (e) {
          console.log(e)
        }
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
        try {
          const allowance = await evaluateTransaction(contract, 'allowance', [owner, spender])
          return allowance.toHexString()
        } catch (e) {
          console.log(e)
          return e
        }
      }
      return getAllowance()
    },
    [contract]
  )
}

export const useApproveToken = (): ((spender: string, amount: string | number) => any) => {
  const provider = useActiveWeb3React()
  const { library, account } = provider
  const contract = useStartFiToken(true)
  const toggleWalletModal = useWalletModalToggle()
  const singe = useERC20PermitSignature()
  const permit = useSubmitTransaction()

  return useCallback(
    async (spender: string, amount: string | number) => {
      if (!account) {
        toggleWalletModal()
        return `account: ${account} is not connected`
      }
      try {
        const { v, s, r, deadline } = await singe(spender, amount)
        console.log({ v, s, r, deadline })
        // await permit('permit', [spender, spender, amount, deadline, v, r, s], contract, account, library)
      } catch (e) {
        console.log('error', e)
        return e
      }
    },
    [contract, toggleWalletModal]
  )
}
export const useIncreaseAllowance = (): ((spender: string, addedValue: string | number) => any) => {
  const { account, library } = useActiveWeb3React()
  const contract = useStartFiToken(true)
  const approve = useSubmitTransaction()
  const toggleWalletModal = useWalletModalToggle()
  return useCallback(
    async (spender: string, addedValue: string | number) => {
      if (!account) {
        toggleWalletModal()
        return `account: ${account} is not connected`
      }
      try {
        const transaction = await approve('increaseAllowance', [spender, addedValue], contract, account, library)
        const transactionReceipt = await library?.waitForTransaction((transaction as any).hash)
        console.log('transactionReceipt', transactionReceipt)
        const decodedLogs = abiDecoder.decodeLogs(transactionReceipt?.logs)
        return decodedLogs[0].events
      } catch (e) {
        console.log('error', e)
        return e
      }
    },
    [account, contract, library, approve, toggleWalletModal]
  )
}

export const useDecreaseAllowance = (): ((spender: string, subtractedValue: string | number) => any) => {
  const { account, library } = useActiveWeb3React()
  const contract = useStartFiToken(true)
  const approve = useSubmitTransaction()
  const toggleWalletModal = useWalletModalToggle()
  return useCallback(
    async (spender: string, subtractedValue: string | number) => {
      if (!account) {
        toggleWalletModal()
        return `account: ${account} is not connected`
      }
      try {
        const transaction = await approve('decreaseAllowance', [spender, subtractedValue], contract, account, library)
        const transactionReceipt = await library?.waitForTransaction((transaction as any).hash)
        console.log('transactionReceipt', transactionReceipt)
        const decodedLogs = abiDecoder.decodeLogs(transactionReceipt?.logs)
        return decodedLogs[0].events
      } catch (e) {
        console.log('error', e)
        return e
      }
    },
    [account, contract, library, approve, toggleWalletModal]
  )
}
export const useTransfer = (): ((address: string, amount: string | number) => any) => {
  const contract = useStartFiToken(true)
  const transfer = useSubmitTransaction()
  const { account, library } = useActiveWeb3React()
  const toggleWalletModal = useWalletModalToggle()
  return useCallback(
    async (address: string, amount: string | number) => {
      if (!account) {
        toggleWalletModal()
        return `account: ${account} is not connected`
      }
      try {
        const transaction = await transfer('transfer', [address, amount], contract, account, library)
        const transactionReceipt = await library?.waitForTransaction((transaction as any).hash)
        const decodedLogs = abiDecoder.decodeLogs(transactionReceipt?.logs)
        return decodedLogs[0].events
      } catch (e) {
        console.log('error', e)
        return e
      }
    },
    [transfer, account, contract, library, toggleWalletModal]
  )
}
export const useBurn = (): ((amount: string | number, from?: string) => any) => {
  const contract = useStartFiToken(true)
  const transfer = useSubmitTransaction()
  const { account, library } = useActiveWeb3React()
  const toggleWalletModal = useWalletModalToggle()
  return useCallback(
    async (amount: string | number, from?: string) => {
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
