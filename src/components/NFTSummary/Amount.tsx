import { Bold } from 'components/NFTConfirm/styles'
import { useSTFItoUSD } from 'hooks/useSTFItoUSD'
import React from 'react'
import abbreviate from 'number-abbreviate'
import fixDecimal from 'utils/fixDecimal';
interface AmountProps {
  amount: any
  error?: boolean
  margin?: string
}

const Amount: React.FC<AmountProps> = ({ amount, error, margin }) => {
  const usd = useSTFItoUSD(amount)

  return (
    <Bold error={error} margin={margin}>
      {abbreviate(fixDecimal(amount))} STFI ~ {abbreviate(fixDecimal(usd))} USD
    </Bold>
  )
}

export default Amount
