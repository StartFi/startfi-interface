import { useStartFiToken } from './useContract'
import { useCallback } from 'react'
import { useSubmitTransaction } from 'services/Blockchain/submitTransaction'
import { useWalletModalToggle } from 'state/application/hooks'
import { evaluateTransaction } from 'services/Blockchain/useEvaluateTransaction'
import { useActiveWeb3React } from 'hooks'
import abiDecoder from 'abi-decoder'
import { abi as STARTFI_TOKEN_ABI } from '../constants/abis/StartFiToken.json'
import { utils } from 'ethers'
import abbreviate from 'number-abbreviate'
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
        const totalSupplyDecimal = abbreviate(utils.formatEther(totalSupply.toString()))
        return {
          name,
          symbol,
          decimals,
          totalSupplyDecimal
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

          return abbreviate(utils.formatEther(balance).toString())
        } catch (e) {
          console.log(e)
          return e
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
          return  abbreviate(utils.formatEther(allowance.toString()))
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
  const { account, library } = useActiveWeb3React()
  const contract = useStartFiToken(true)
  const approve = useSubmitTransaction()
  const toggleWalletModal = useWalletModalToggle()
  return useCallback(
    async (spender: string, amount: string | number) => {
      if (!account) {
        toggleWalletModal()
        return `account: ${account} is not connected`
      }
      try {
        const transaction = await approve('approve', [spender, amount], contract, account, library)
        const transactionReceipt = await library?.waitForTransaction((transaction as any).hash)
        const decodedLogs = await abiDecoder.decodeLogs(transactionReceipt?.logs)
        return decodedLogs[0].events
      } catch (e) {
        console.log('error', e)
        // return e
        throw e
      }
    },
    [account, contract, library, approve, toggleWalletModal]
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
        return await transfer('transfer', [address, amount], contract, account, library)
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
