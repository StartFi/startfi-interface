import { useStartFiStakes } from './useContract'
import { useCallback } from 'react'
import { useSubmitTransaction } from 'services/Blockchain/submitTransaction'
import { useWalletModalToggle } from 'state/application/hooks'
import { evaluateTransaction } from 'services/Blockchain/useEvaluateTransaction'
import { useActiveWeb3React } from 'hooks'

export const useDeposit = (): ((user: string, amount: string | number) => any) => {
  const { account, library } = useActiveWeb3React()
  const contract = useStartFiStakes(true)
  const deposit = useSubmitTransaction()
  const toggleWalletModal = useWalletModalToggle()
  return useCallback(
    async (user: string, amount: string | number) => {
      if (!account) {
        toggleWalletModal()
        return `account: ${account} is not connected`
      }
      try {
        return await deposit('deposit', [user, amount], contract, account, library)
      } catch (e) {
        console.log('error', e)
        return e
      }
    },
    [account, contract, library, deposit, toggleWalletModal]
  )
}

export const useGetReserves = (): ((owner: string) => any) => {
  const contract = useStartFiStakes(false)
  return useCallback(
    async (owner: string) => {
      try {
        const userReserved = await evaluateTransaction(contract, 'getReserves', [owner])
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
