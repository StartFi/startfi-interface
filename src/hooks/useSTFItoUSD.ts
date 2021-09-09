import { useEffect, useState } from 'react'
import { useStfiUsdPrice } from 'services/Blockchain/cryptoPrice'

/**
 * @dev this function call the hook to get the token price in usd ( 1 SFTI =?? usd)
 * @notice we should only multiply the token price returned from the exchange by the amount the user entered but since the token is not listed yet, we are applying like a workaround though using ether simulation
 * @param amount
 */
export const useSTFItoUSD = (amount: number): number => {
  const [USD, setUSD] = useState<number>(amount)
  const stfiUsdPrice = useStfiUsdPrice()
  useEffect(() => {
    stfiUsdPrice().then(value => {
      // Declared a stringified version of amount...Couldn't declare it inside of the condition block because of TypeScript error.
      let amountStr = amount.toString()
      // Check if amount is a string (e.g 100m) and convert the string 100(m) to a number 100(000000)
      if(typeof amount === 'string'){
        const abbrevConverter = {m: '000000', k: '000'}
        const abbrev = amountStr.slice(-1)
        amountStr = amountStr.replace(abbrev, abbrevConverter[abbrev])
        amount = Number(amountStr)
      }
      let total = value * amount
      // Check if total is a decimal
      if(total % 1 !== 0){
        total = Number(total.toFixed(4))
      }
      setUSD(total)
    })
  }, [amount, stfiUsdPrice, setUSD])
  return USD
}
