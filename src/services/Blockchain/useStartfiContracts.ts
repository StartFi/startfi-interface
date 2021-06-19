import { useActiveWeb3React } from 'hooks'
import { useStartFiNft, useStartFiToken, useStartFiMarketplace, useStartFiRoyality } from 'hooks/useContract'
import { useEffect, useMemo } from 'react'
import { useWalletModalToggle } from 'state/application/hooks'
/* 
const enum ContractNames {
  'nft',
  'nftRoyality',
  'marketplace',
  'token'
} */
/**
 *
 * @param contractName Name of the smart contract that we are going to use
 * @param signer Flag to decide if the transaction is going to read or write on the blockchain
 * @returns {
 * account: wallet address,
 * library: provider,
 * contract: smart contract object
 * }
 */
export const useStartFiContract = (contractName: string, signer = true) => {
  const { account, library } = useActiveWeb3React()
  const toggleWalletModal = useWalletModalToggle()
  const nft = useStartFiNft(signer)
  const token = useStartFiToken(signer)
  const marketplace = useStartFiMarketplace(signer)
  const nftRoyality = useStartFiRoyality(signer)
  useEffect(() => {
    if (!account) {
      toggleWalletModal()
    }
  }, [])
  return useMemo(() => {
    const contract =
      contractName === 'nft'
        ? nft
        : contractName === 'token'
        ? token
        : contractName === 'marketplace'
        ? marketplace
        : contractName === 'nftRoyality'
        ? nftRoyality
        : null
    return { account, library, contract }
  }, [contractName])
}
