import { useEffect, useState } from 'react'
import { useStfiUsdPrice } from 'services/Blockchain/cryptoPrice'
import abbrevToNumber from 'utils/abbrevToNumber'
/**
 * @dev this function call the hook to get the token price in usd ( 1 SFTI =?? usd)
 * @notice we should only multiply the token price returned from the exchange by the amount the user entered but since the token is not listed yet, we are applying like a workaround though using ether simulation
 * @param amount
 */
export const useSTFItoUSD = (amount: number): number => {
  const [USD, setUSD] = useState<number>(amount)
  const stfiUsdPrice = useStfiUsdPrice()
  useEffect(() => {
    amount = abbrevToNumber(amount)
    stfiUsdPrice().then(value => {
      let total = value * amount
      if (total % 1 !== 0) {
        total = Number(total.toFixed(4))
      }
      setUSD(total)
    })
  }, [amount, stfiUsdPrice, setUSD])
  return USD
}
