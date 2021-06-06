//import { Token } from '@uniswap/sdk-core'
import { Token } from '@uniswap/sdk-core'
import { useActiveWeb3React } from 'hooks'
import { useToken } from 'hooks/Tokens'
import { useStartFiToken } from 'hooks/useContract'
import { networks as STARTFI_TOKEN_NETWORK } from '../../constants/abis/StartFiToken.json'
import { useEvaluateTransaction } from './useEvaluateTransaction'
import { submitTransaction } from './submitTransaction'

export function GetTokenInfo(): Token | undefined | null {
  return useToken(STARTFI_TOKEN_NETWORK['3'].address)
}

export function BalanceOfStartfiToken(address?: string): any {
  /* const { account } = useActiveWeb3React()
  const chekedAddress = address ? address : account?.toString()
  const tokenContract = useStartFiToken(false)
  const balance = useSingleCallResult(tokenContract, 'balanceOf', [chekedAddress], NEVER_RELOAD)
  console.log('balance', balance) */
  const { account } = useActiveWeb3React()
  const chekedAddress = address ? address : account?.toString()
  const result = useEvaluateTransaction(useStartFiToken, 'balanceOf', [chekedAddress as string])
  console.log('balacne is', result)
  return result
}

export function TransferStartfiToken(): void {
  const { account, library } = useActiveWeb3React()
  const result = submitTransaction(
    useStartFiToken,
    'transfer',
    ['0xAE28A0663785F20f43dAa79599110560C8dEfb19', '1'],
    account as string,
    library
  )
  console.log(result)
}
