import { useEffect, useState } from 'react'
import { useTokenBalance } from './startfiToken'
import { useUserAddress } from 'state/user/hooks'

export const useSTFIBalance = (): number => {
  const address = useUserAddress()
  const getSTFIBalance = useTokenBalance()
  const [balance, setBalance] = useState<number>(0)
  useEffect(() => {
    if (address) {
      getSTFIBalance(address).then(balance => {
        // Checks if STFI balance is not a string (e.g 100m) || checks if STFI balance is a decimal (e.g 0,0043)
        if (typeof balance === "number" && balance % 1 !== 0) {
          balance = Number((balance).toFixed(4))
        }
        setBalance(balance)
      })
    }
    return () => { }
  }, [address, getSTFIBalance])
  return balance
}
