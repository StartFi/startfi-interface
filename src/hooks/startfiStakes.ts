import { useStartFiStakes } from './useContract'
import { useCallback } from 'react'
import { useSubmitTransaction } from 'services/Blockchain/submitTransaction'
import { useWalletModalToggle } from 'state/application/hooks'
import { evaluateTransaction } from 'services/Blockchain/useEvaluateTransaction'
import { useActiveWeb3React } from 'hooks'
import { updateStakeBalance, updateStackDepositState } from 'state/user/actions'
import { useDispatch } from 'react-redux'

export const useDeposit = (): ((user: string, amount: string | number) => any) => {
  const { account, library } = useActiveWeb3React()
  const contract = useStartFiStakes(true)
  const deposit = useSubmitTransaction()
  const toggleWalletModal = useWalletModalToggle()
  const dispatch = useDispatch()
  return useCallback(
    async (user: string, amount: string | number) => {
      if (!account) {
        toggleWalletModal()
        return `account: ${account} is not connected`
      }
      try {
        dispatch(updateStackDepositState({ depositState: true }))
        const transaction = await deposit('deposit', [user, amount], contract, account, library)
        const transactionReceipt = await library?.waitForTransaction((transaction as any).hash)
        dispatch(updateStackDepositState({ depositState: false }))
        return transactionReceipt
      } catch (e) {
        console.log(e)
        dispatch(updateStackDepositState({ depositState: false }))
        return { error: e }
      }
    },
    [account, contract, library, deposit, toggleWalletModal]
  )
}

export const useGetReserves = (): ((owner: string) => any) => {
  const contract = useStartFiStakes(false)
  const dispatch = useDispatch()

  return useCallback(
    async (owner: string) => {
      try {
        const userReserved = await evaluateTransaction(contract, 'getReserves', [owner])
        const reserved = userReserved.toHexString()

        dispatch(updateStakeBalance({ stakeBalance: parseInt(reserved, 16) }))
        return reserved
      } catch (e) {
        console.log(e)
        return { error: e }
      }
    },
    [contract]
  )
}
