import React from 'react'
import Decrement from './../../assets/icons/decrement.svg'
import Increment from './../../assets/icons/increment.svg'
import { Border, Img } from './styles'

interface InputNumberButtonsProps {
  name: string
  value: number
  onChange: (value: number, name: string) => void
  error?: boolean
}

const InputNumberButtons: React.FC<InputNumberButtonsProps> = ({ name, value, onChange, error }) => {
  return (
    <Border error={error}>
      <Img onClick={() => (value > 0 ? onChange(value - 1, name) : null)}>
        <img src={Decrement} alt="Decrement" />
      </Img>
      <div>{value}</div>
      <Img onClick={() => onChange(value + 1, name)}>
        <img src={Increment} alt="Increment" />
      </Img>
    </Border>
  )
}

export default InputNumberButtons
