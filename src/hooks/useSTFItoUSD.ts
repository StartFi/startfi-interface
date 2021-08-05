import { STFI_IN_WEI, WEI } from './../constants'
import { useEffect, useState } from 'react'
import { useEthPrice } from 'services/Blockchain/cryptoPrice'

/**
 * @dev this function call the hook to get the token price in usd ( 1 SFTI =?? usd)
 * @notice we should only multiply the token price returned from the exchange by the amount the user entered but since the token is not listed yet, we are applying like a workaround though using ether simulation
 * @param amount
 */
export const useSTFItoUSD = (amount: number): number => {
  const [USD, setUSD] = useState<number>(amount)
  const ethPrice = useEthPrice()
  useEffect(() => {
    ethPrice().then(value => setUSD(Math.round(amount * (value / WEI) * STFI_IN_WEI)))
  }, [amount, ethPrice, setUSD])
  return USD
}
