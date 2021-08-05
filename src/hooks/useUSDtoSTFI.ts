import { STFI_IN_WEI, WEI } from './../constants'
import { useCallback } from 'react'
import { useUSDPrice } from 'services/Blockchain/cryptoPrice'

/**
 * @dev this function call the hook to get the token price ( 1 USD =?? SFT)
 * @notice we should only multiply the token price returned from the exchange by the amount the user entered but since the token is not listed yet, we are applying like a workaround though using ether simulation
 * @param amount
 */
export const useUSDtoSTFI = (): ((amount: number) => Promise<number>) => {
  const usdPrice = useUSDPrice()
  return useCallback(
    (amount: number): Promise<number> => {
      return usdPrice().then(value => Math.round((value * amount * WEI) / STFI_IN_WEI))
    },
    [usdPrice]
  )
}
