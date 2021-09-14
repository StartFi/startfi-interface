import { useEffect, useState } from 'react'
import { useNFT } from 'state/marketplace/hooks'
import { useUserAddress } from 'state/user/hooks'
import { address as STARTFI_MARKETPLACE_ADDRESS } from '../../constants/abis/StartFiMarketPlace.json'
import { useGetApproverAddress } from './startfiNft'

export const useAllowed = (): boolean => {
  const address = useUserAddress()
  const nft = useNFT()
  const getApproverAddress = useGetApproverAddress()
  const [allowed, setAllowed] = useState<boolean>(false)
  useEffect(() => {
    const tokenId = nft?.tokenId ? nft?.tokenId : 1
    if (address)
      getApproverAddress(tokenId).then(owner =>
        owner === address
          ? getApproverAddress(tokenId).then(approver => setAllowed(approver === (STARTFI_MARKETPLACE_ADDRESS as any)))
          : null
      )
  }, [address, nft, getApproverAddress])
  return allowed
}
