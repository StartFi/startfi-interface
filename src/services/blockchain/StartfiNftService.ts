import { useStartFiNft } from 'hooks/useContract'
import { NEVER_RELOAD, useSingleCallResult } from 'state/multicall/hooks'

export function MintStartfiNFT(): any {
  const nftContract = useStartFiNft(true)
  const mintedNFT = useSingleCallResult(
    nftContract,
    'balanceOf',
    ['0xAE28A0663785F20f43dAa79599110560C8dEfb19'],
    NEVER_RELOAD
  )
  console.log('mintedNFT', mintedNFT)
  return mintedNFT
}
