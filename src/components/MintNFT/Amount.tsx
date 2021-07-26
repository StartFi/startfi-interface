import { Bold } from 'components/NFTConfirm'
import { useSTFItoUSD } from 'hooks'
import React from 'react'

interface AmountProps {
  amount: number
}

const Amount: React.FC<AmountProps> = ({ amount }) => {
  const usd = useSTFItoUSD(amount)

  return (
    <Bold>
      {amount} STFI ~ {usd} USD
    </Bold>
  )
}

export default Amount
