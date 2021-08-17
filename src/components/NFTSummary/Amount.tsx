import { Bold } from 'components/NFTConfirm/styles'
import { useSTFItoUSD } from 'hooks/useSTFItoUSD'
import React from 'react'

interface AmountProps {
  amount: any
  error?: boolean
}

const Amount: React.FC<AmountProps> = ({ amount, error }) => {
  const usd = useSTFItoUSD(amount)

  return (
    <Bold error={error}>
      {amount} STFI ~ {usd} USD
    </Bold>
  )
}

export default Amount
