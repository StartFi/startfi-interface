import { useSTFItoUSD } from 'hooks/useSTFItoUSD'
import { useUSDtoSTFI } from 'hooks/useUSDtoSTFI'
import React from 'react'
import { Input } from '.'
import PriceArrows from './../../assets/icons/pricearrows.svg'

interface InputSTFIProps {
  name: string
  label: string
  value: number
  onChange: (value: number) => void
}

const InputSTFI: React.FC<InputSTFIProps> = ({ name, label, value, onChange }) => {
  const STFItoUSD = useSTFItoUSD(value)
  const USDtoSTFI = useUSDtoSTFI()

  return (
    <React.Fragment>
      <Input name={name} label={label} value={value} onChange={(e: any) => onChange(e.target.value)} number />
      <img src={PriceArrows} alt="Currency conversion" />
      <Input
        name="usd"
        currency="USD"
        value={STFItoUSD}
        onChange={(e: any) => USDtoSTFI(e.target.value).then(stfi => onChange(stfi))}
        number
      />
    </React.Fragment>
  )
}

export default InputSTFI
