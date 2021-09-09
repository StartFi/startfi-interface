import { useEffect, useState } from 'react'
import { useStfiUsdPrice } from 'services/Blockchain/cryptoPrice'

/**
 * @dev this function call the hook to get the token price in usd ( 1 SFTI =?? usd)
 * @notice we should only multiply the token price returned from the exchange by the amount the user entered but since the token is not listed yet, we are applying like a workaround though using ether simulation
 * @param amount
 */
export const useSTFItoUSD = (amount: number): number => {
  const [USD, setUSD] = useState<number>(amount)
  const stfiUsdPrice = useStfiUsdPrice() // Price STFI in market
  useEffect(() => {
    stfiUsdPrice().then(value => {
      let formattedAmount;
      let amountStr = amount.toString()
      if(typeof amount === 'string'){
        const abbrevConverter = {m: '000000', k: '000'}
        const abbrev = amountStr.slice(-1)
        amountStr = amountStr.replace(abbrev, abbrevConverter[abbrev])
        const amountNum = Number(amountStr)
        formattedAmount =  Number((value*amountNum).toFixed(4))
      }else{
        formattedAmount = Number((value*amount).toFixed(4))
      }
      setUSD(formattedAmount)
    })
  }, [amount, stfiUsdPrice, setUSD])
  return USD
}
