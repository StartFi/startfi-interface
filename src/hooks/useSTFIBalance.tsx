import { useEffect, useState } from 'react'
import { useTokenBalance } from './startfiToken'
import { useUserAddress } from 'state/user/hooks'

export const useSTFIBalance = (): number => {
  const address = useUserAddress()
  const getSTFIBalance = useTokenBalance()
  const [balance, setBalance] = useState<number>(0)
  useEffect(
    () =>
      address
        ? getSTFIBalance(address).then(balanceHexString =>
            setBalance(balanceHexString?.length < 5 ? parseInt(balanceHexString, 16) : Number(balanceHexString))
          )
        : null,
    [address, getSTFIBalance]
  )
  return balance
}
