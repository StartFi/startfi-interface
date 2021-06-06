import { useActiveWeb3React } from 'hooks'
import { useStartFiNft, useStartFiToken, useStartFiMarketplace } from 'hooks/useContract'

export const useStartFiContract = (contractName: string) => {
  const { account, library } = useActiveWeb3React()
  const nft = useStartFiNft(true)
  const token = useStartFiToken(true)
  const marketplace = useStartFiMarketplace(true)
  const contract =
    contractName === 'nft'
      ? nft
      : contractName === 'token'
      ? token
      : contractName === 'marketplace'
      ? marketplace
      : null
  return { account, library, contract }
}
