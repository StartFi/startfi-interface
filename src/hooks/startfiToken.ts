import { useCallback } from 'react'
import { useSubmitTransaction } from 'services/Blockchain/submitTransaction'
import { useWalletModalToggle } from 'state/application/hooks'
import { useStartFiContract } from 'services/Blockchain/useStartfiContracts'
import { evaluateTransaction } from 'services/Blockchain/useEvaluateTransaction'

export const useTokneInfo = () => {
  const { contract } = useStartFiContract('token', false)
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
  const { contract } = useStartFiContract('token', false)
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
  const transfer = useSubmitTransaction()
  const { account, library, contract } = useStartFiContract('token')
  const toggleWalletModal = useWalletModalToggle()
  return useCallback(
    (address: string, amount: string) => {
      if (!account) {
        toggleWalletModal()
        return
      }
      return transfer('transfer', [address, amount], contract, account, library)
    },
    [transfer]
  )
}
