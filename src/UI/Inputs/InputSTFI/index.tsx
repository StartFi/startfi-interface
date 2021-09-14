import { useSTFItoUSD } from 'hooks/useSTFItoUSD'
import { useUSDtoSTFI } from 'hooks/useUSDtoSTFI'
import React from 'react'
import Input from '../Input'
import PriceArrows from '../../../assets/icons/pricearrows.svg'
import { Arrows, ContainerSTFI } from '../styles'

interface InputSTFIProps {
  name: string
  label: string
  value: number
  onChange: (value: number, name: string) => void
  question?: string
  error?: boolean
}

const InputSTFI: React.FC<InputSTFIProps> = ({ name, label, value, onChange, question, error }) => {
  const STFItoUSD = useSTFItoUSD(value)
  const USDtoSTFI = useUSDtoSTFI()

  return (
    <ContainerSTFI>
      <Input
        name={name}
        label={label}
        value={value}
        onChange={(value: any) => onChange(value, name)}
        question={question}
        error={error}
        number
      />
      <Arrows src={PriceArrows} alt="Currency conversion" />
      <Input
        name="usd"
        currency="USD"
        value={STFItoUSD}
        onChange={(value: any) => USDtoSTFI(value).then(stfi => onChange(stfi, name))}
        number
      />
    </ContainerSTFI>
  )
}

export default InputSTFI
