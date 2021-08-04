import React, { useEffect, useRef, useState } from 'react'
import Check from './../../assets/icons/check.svg'
import Upload from './../../assets/icons/upload.svg'
import Decrement from './../../assets/icons/decrement.svg'
import Increment from './../../assets/icons/increment.svg'
import Pause from './../../assets/icons/pause.svg'
import { useTranslation } from 'react-i18next'
import Label from './Label'
import {
  Border,
  ButtonFile,
  Character,
  FileInput,
  Img,
  InputContainer,
  InputFileFooter,
  InputFileHeader,
  InputNumber,
  InputOutline,
  InputUnderline,
  LabelBlack,
  LabelContainer,
  LabelGrey,
  Missed,
  Outline,
  OutlineNumber
} from './styles'
import { DefaultTheme, StyledComponent } from 'styled-components'

interface LabelWithCheckProps {
  Label: StyledComponent<'div', DefaultTheme, {}, never>
  text: string
  error: boolean
  verified?: boolean
  underline?: boolean
}

export const LabelWithCheck: React.FC<LabelWithCheckProps> = ({ Label, text, verified, error, underline }) => {
  const { t } = useTranslation()
  return (
    <LabelContainer underline={underline} error={error}>
      <Label>{text}</Label>
      {verified ? <img src={Check} alt="Verified" /> : error ? <Missed>{t('missed')}</Missed> : null}
    </LabelContainer>
  )
}

interface InputFileProps {
  name: string
  label: string
  value: any
  onChange: (e: any) => void
  error: boolean
  progress: number
  filename: string
}

export const InputFile: React.FC<InputFileProps> = ({ name, label, value, onChange, error, progress, filename }) => {
  const { t } = useTranslation()

  const ref = useRef<HTMLInputElement>(null)

  const [file, setFile] = useState('')

  return (
    <div>
      <InputFileHeader>
        <LabelWithCheck text={label} Label={LabelBlack} error={error} />
        {filename && (
          <ButtonFile
            onClick={() => {
              setFile('')
              onChange({ target: { files: [null] }, name: 'dataHash' })
            }}
          >
            {t('Delete')}
          </ButtonFile>
        )}
      </InputFileHeader>
      <InputFileFooter>
        <FileInput onClick={() => (progress === 0 ? ref.current?.click() : null)} minWidth="11vw" error={error}>
          <input
            type="file"
            name={name}
            ref={ref}
            style={{ display: 'none' }}
            value={file}
            onChange={(e: any) => {
              setFile(e.target.value)
              onChange(e)
            }}
          />
          <div>{t(progress === 0 ? 'upload' : progress === 100 ? 'uploaded' : 'uploading')}</div>
          <img src={progress === 0 ? Upload : progress === 100 ? Check : Pause} alt="Upload file" />
        </FileInput>
        {filename && (
          <FileInput minWidth="28vw">
            <div>{filename.substring(0, 20)}</div>
            <div>{progress} %</div>
          </FileInput>
        )}
      </InputFileFooter>
    </div>
  )
}

interface InputProps {
  name: string
  value: any
  onChange: (e: any) => void
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

export const Input: React.FC<InputProps> = ({
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
    onChange(e)
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
        <OutlineNumber width={outlineWidth || '12vw'}>
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

interface InputNumberButtonsProps {
  name: string
  value: number
  onChange: (e: any) => void
}

export const InputNumberButtons: React.FC<InputNumberButtonsProps> = ({ name, value, onChange }) => {
  const [number, setNumber] = useState(value)

  return (
    <Border>
      <Img
        onClick={() => {
          if (value > 0) {
            setNumber(number - 1)
            onChange({ target: { name, value: number - 1 } })
          }
        }}
      >
        <img src={Decrement} alt="Decrement" />
      </Img>
      <div>{value}</div>
      <Img
        onClick={() => {
          setNumber(number + 1)
          onChange({ target: { name, value: number + 1 } })
        }}
      >
        <img src={Increment} alt="Increment" />
      </Img>
    </Border>
  )
}
