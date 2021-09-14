import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Label from '../../Labels/Label'
import LabelWithCheck from '../../Labels/LabelWithCheck'
import { LabelGrey } from '../../Labels/styles'
import { Character, InputContainer, InputNumber, InputOutline, InputUnderline, Outline, OutlineNumber } from '../styles'

interface InputProps {
  name: string
  value: any
  onChange: (value: any, name: string) => void
  label?: string
  error?: boolean
  placeholder?: string
  underline?: boolean
  textarea?: number
  number?: boolean
  characters?: number
  height?: string
  outlineWidth?: string
  inputWidth?: string
  currency?: string
  question?: string
}

const Input: React.FC<InputProps> = ({
  name,
  label,
  value,
  onChange,
  placeholder,
  underline,
  textarea,
  number,
  characters,
  height,
  outlineWidth,
  inputWidth,
  error,
  currency,
  question
}) => {
  const { t } = useTranslation()

  const ref = useRef<HTMLInputElement>(null)

  const [underlineClick, setUnderlineClick] = useState(underline && !value)

  const [count, setCount] = useState(0)

  const handleChange = (e: any) => {
    const length = e.target.value.length
    if (characters && length > characters) return
    setCount(length)
    onChange(e.target.value, name)
  }

  useEffect(() => {
    if (!underlineClick) ref?.current?.focus()
  }, [underlineClick])

  return (
    <InputContainer direction={number ? 'row' : 'column'} align={number ? 'center' : 'flex-start'}>
      {number ? (
        label ? (
          <Label text={t(label)} question={question} />
        ) : null
      ) : value || textarea || underline ? (
        <div onClick={() => (underline ? setUnderlineClick(false) : null)} style={{ width: '100%' }}>
          <LabelWithCheck
            text={t(label)}
            Label={LabelGrey}
            verified={value}
            error={error || false}
            underline={underlineClick}
          />
        </div>
      ) : null}
      {underline && !underlineClick && (
        <InputUnderline ref={ref} type="text" name={name} value={value} onChange={handleChange} /> //placeholder={t(label)}
      )}
      {textarea && (
        <Outline height={height} error={error || false}>
          <InputOutline
            name={name}
            placeholder={t(placeholder ? placeholder : label)}
            value={value}
            onChange={handleChange}
            rows={textarea}
          />
          <Character>
            {(characters || 0) - count} {t('character')}
          </Character>
        </Outline>
      )}
      {number && (
        <OutlineNumber width={outlineWidth || '12vw'} error={error}>
          <InputNumber
            name={name}
            type="number"
            onChange={e => {
              handleChange({ target: { name, value: parseFloat(e.target.value) } })
            }}
            value={value}
            width={inputWidth || '7vw'}
          />
          {currency ? currency : 'STFI'}
        </OutlineNumber>
      )}
    </InputContainer>
  )
}

export default Input
