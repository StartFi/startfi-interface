import { useEffect, useState } from 'react'
import { useUserAddress } from 'state/user/hooks'
import { useTokenBalance } from './startfiToken'

export const useSTFIBalance = (): number => {
  const address = useUserAddress()
  const getSTFIBalance = useTokenBalance()
  const [balance, setBalance] = useState<number>(0)
  useEffect(() => {
    if (address) {
      getSTFIBalance(address).then(balance => setBalance(Number(balance)))
    }
    return
  }, [address, getSTFIBalance])
  return balance
}
