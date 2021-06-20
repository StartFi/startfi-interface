import { useStartFiToken } from './useContract'
import { useCallback } from 'react'
import { useSubmitTransaction } from 'services/Blockchain/submitTransaction'
import { useWalletModalToggle } from 'state/application/hooks'
import { evaluateTransaction } from 'services/Blockchain/useEvaluateTransaction'
import { useActiveWeb3React } from 'hooks'
import { EventType } from '@ethersproject/abstract-provider'

export const useTokneInfo = () => {
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

export const useTransfer = (): ((address: string, amount: string) => any) => {
  const contract = useStartFiToken(true)
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

export const useTransferLogs = () => {
  const { account, library } = useActiveWeb3React()
  const tokenContract = useStartFiToken(false)
  const fromMe = tokenContract?.filters?.Transfer(account)
  library?.on(fromMe as EventType, (from, to, amount, event) => {
    console.log('ERC20 lisining  Transfer|sent', { from, to, amount, event })
  })
}
