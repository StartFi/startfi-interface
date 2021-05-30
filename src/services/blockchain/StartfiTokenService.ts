import { Token } from '@uniswap/sdk-core'
import { useToken } from 'hooks/Tokens'
import { networks as STARTFI_TOKEN_NETWORK } from '../../constants/abis/StartFiToken.json'

export default function GetTokenInfo(): Token | undefined | null {
  return useToken(STARTFI_TOKEN_NETWORK['3'].address)
}
