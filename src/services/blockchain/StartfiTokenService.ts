import { Token } from '@uniswap/sdk-core'
import { BigNumber } from 'ethers'
import { useActiveWeb3React } from 'hooks'
import { useToken } from 'hooks/Tokens'
import { useStartFiToken } from 'hooks/useContract'
import { NEVER_RELOAD, useSingleCallResult } from 'state/multicall/hooks'
import { networks as STARTFI_TOKEN_NETWORK } from '../../constants/abis/StartFiToken.json'

export function GetTokenInfo(): Token | undefined | null {
  return useToken(STARTFI_TOKEN_NETWORK['3'].address)
}

export function BalanceOfStartfiToken(address?: string): any {
  const { account } = useActiveWeb3React()
  const chekedAddress = address ? address : account?.toString()
  const tokenContract = useStartFiToken(false)
  const balance = useSingleCallResult(tokenContract, 'balanceOf', [chekedAddress], NEVER_RELOAD)
  console.log('------------------------------------------------------')

  console.log('balance ofaccount', account)
  console.log('balance od', balance)
  console.log('------------------------------------------------------')
  return balance
}

export enum TransactionState {
  INVALID,
  LOADING,
  VALID
}

interface TransactionCall {
  address: string
  calldata: string
  value: string
}

interface TransactionCallEstimate {
  call: TransactionCall
}
interface SuccessfulCall extends TransactionCallEstimate {
  call: TransactionCall
  gasEstimate: BigNumber
}
interface FailedCall extends TransactionCallEstimate {
  call: TransactionCall
  error: Error
}
export function TransferStartfiToken(): Promise<any> {
  const { account, chainId, library } = useActiveWeb3React()
  console.log('account', account)
  const addTransaction = useTransactionAdder()

  const tokenContract = useStartFiToken(true)

  return library
    .estimateGas(tx)
    .then(gasEstimate => {
      return {
        call,
        gasEstimate
      }
    })
    .catch(gasError => {
      console.debug('Gas estimate failed, trying eth_call to extract error', call)

      return library
        .call(tx)
        .then(result => {
          console.debug('Unexpected successful call after failed estimate gas', call, gasError, result)
          return { call, error: new Error('Unexpected issue with estimating the gas. Please try again.') }
        })
        .catch(callError => {
          console.debug('Call threw error', call, callError)
          return { call, error: new Error(swapErrorToUserReadableMessage(callError)) }
        })
    })
}
