import { Bold } from 'components/NFTConfirm/styles'
import { useSTFItoUSD } from 'hooks/useSTFItoUSD'
import React from 'react'

interface AmountProps {
  amount: any
  error?: boolean
  margin?: string
}

const Amount: React.FC<AmountProps> = ({ amount, error, margin }) => {
  const usd = useSTFItoUSD(amount)

  return (
    <Bold error={error} margin={margin}>
      {amount} STFI ~ {usd} USD
    </Bold>
  )
}

export default Amount
