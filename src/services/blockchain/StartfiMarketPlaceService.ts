import { useStartFiMarketPlace } from 'hooks/useContract'
import { NEVER_RELOAD, useSingleCallResult } from 'state/multicall/hooks'

// MP refer to Marketplace
export function PaymentAddressStartfiMP(): any {
  const nftContract = useStartFiMarketPlace(true)
  const paymentAdddress = useSingleCallResult(nftContract, 'paymentTokenAddress', undefined, NEVER_RELOAD)
  console.log('paymentAdddress', paymentAdddress)
  return nftContract
}
