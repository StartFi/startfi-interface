import { Bold } from 'components/NFTConfirm/styles'
import { useSTFItoUSD } from 'hooks/useSTFItoUSD'
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
