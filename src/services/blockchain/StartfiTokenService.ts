//import { Token } from '@uniswap/sdk-core'
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
  console.log('balance', balance)
  return balance
}

export function TransferStartfiToken(): Promise<any> | string {
  const { account, library } = useActiveWeb3React()
  const tokenContract = useStartFiToken(true)
  const callData = tokenContract?.interface.encodeFunctionData('transfer', [
    '0xAE28A0663785F20f43dAa79599110560C8dEfb19',
    '1'
  ])
  return library
    ? library.getSigner().sendTransaction({
        from: account ? account : undefined,
        to: tokenContract?.address,
        data: callData
      })
    : 'no provider'
}
