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
        const formattedBalance = +(balance).toFixed(4)
        setBalance(formattedBalance)
      })
    }
    return () => {}
  }, [address, getSTFIBalance])
  return balance
}
