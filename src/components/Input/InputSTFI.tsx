import { useSTFItoUSD } from 'hooks/useSTFItoUSD'
import { useUSDtoSTFI } from 'hooks/useUSDtoSTFI'
import React from 'react'
import { Input } from '.'
import PriceArrows from './../../assets/icons/pricearrows.svg'

interface InputSTFIProps {
  name: string
  label: string
  value: number
  onChange: (value: number, name: string) => void
  question?: string
}

const InputSTFI: React.FC<InputSTFIProps> = ({ name, label, value, onChange, question }) => {
  const STFItoUSD = useSTFItoUSD(value)
  const USDtoSTFI = useUSDtoSTFI()

  return (
    <React.Fragment>
      <Input
        name={name}
        label={label}
        value={value}
        onChange={(value: any) => onChange(value, name)}
        question={question}
        number
      />
      <img src={PriceArrows} alt="Currency conversion" />
      <Input
        name="usd"
        currency="USD"
        value={STFItoUSD}
        onChange={(value: any) => USDtoSTFI(value).then(stfi => onChange(stfi, name))}
        number
      />
    </React.Fragment>
  )
}

export default InputSTFI
