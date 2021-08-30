import { useStartFiStakes } from './useContract'
import { useCallback } from 'react'
import { useSubmitTransaction } from 'services/Blockchain/submitTransaction'
import { useWalletModalToggle } from 'state/application/hooks'
import { evaluateTransaction } from 'services/Blockchain/useEvaluateTransaction'
import { useActiveWeb3React } from 'hooks'
import abiDecoder from 'abi-decoder'
import { abi as STARTFI_STAKES_ABI } from '../constants/abis/StartfiStakes.json'
abiDecoder.addABI(STARTFI_STAKES_ABI)
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
        const transaction = await deposit('deposit', [user, amount], contract, account, library)
        const transactionReceipt = await library?.waitForTransaction((transaction as any).hash)
        const decodedLogs = await abiDecoder.decodeLogs(transactionReceipt?.logs)
        return decodedLogs[0].events
      } catch (e) {
        console.log('error', e)
        // return e
        throw new Error(e)
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

        console.log('Reserve Hook',parseInt(reserved,16))

        return reserved
      } catch (e) {
        console.log(e)
        return e
      }
    },
    [contract]
  )
}
