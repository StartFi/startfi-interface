import { useEffect, useState } from 'react'
import { useUserAddress } from 'state/user/hooks'
import { address as STARTFI_NFT_PAYMENT_ADDRESS } from '../../constants/abis/StartFiNFTPayment.json'
import { useGetAllowance } from './startfiToken'

export const useAllowedSTFI = (): number => {
  const address = useUserAddress()
  const getAllowedSTFI = useGetAllowance()
  const [allowed, setAllowed] = useState<number>(0)
  useEffect(() => {
    if (address) getAllowedSTFI(address, STARTFI_NFT_PAYMENT_ADDRESS).then(allowedStfi => setAllowed(allowedStfi))
  }, [address, getAllowedSTFI])
  return allowed
}
