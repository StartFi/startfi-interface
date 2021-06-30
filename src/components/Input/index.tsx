import React, { useEffect, useRef, useState } from 'react'
import Check from './../../assets/icons/check.svg'
import Upload from './../../assets/icons/upload.svg'
import Decrement from './../../assets/icons/decrement.svg'
import Increment from './../../assets/icons/increment.svg'
import Pause from './../../assets/icons/pause.svg'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

export const InputBase = styled.input`
  box-sizing: border-box;
`

export const InputSearch = styled(InputBase)`
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.135216);
  border-radius: 4px 0px 0px 4px;
  padding: 0 2vw;
  width: 40vw;
  border: none;
  outline: none;
  &::placeholder {
    font-size: 14px;
    color: #afafaf;
  }
`

const Missed = styled.div`
  font-size: 0.875rem;
  color: #ff0000;
`

const ButtonFile = styled.button`
  font-size: 14px;
  text-decoration-line: underline;
  color: #444444;
  border: none;
  background-color: white;
  cursor: pointer;
`

interface FileInputProps {
  readonly error?: boolean
  readonly minWidth?: string
}

const FileInput = styled.div<FileInputProps>`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  align-items: center;
  border: 1px solid ${props => (props.error ? '#FF0000' : '#dddddd')};
  border-radius: 8px;
  height: 7vh;
  cursor: pointer;
  min-width: ${props => props.minWidth || 'none'};
`

interface LabelContainerProps {
  readonly error?: boolean
  readonly underline?: boolean
}

const LabelContainer = styled.div<LabelContainerProps>`
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  align-items: baseline;
  padding-bottom: 2vh;
  border-bottom: ${props => (props.underline ? '1px solid' : 'none')} ${props => (props.error ? '#FF0000' : '#dddddd')};
`

export const LabelWithCheck = ({ Label, text, verified, error, underline }: any) => (
  <LabelContainer underline={underline} error={error}>
    <Label>{text}</Label>
    {verified ? <img src={Check} alt="Verified" /> : error ? <Missed>Missed</Missed> : null}
  </LabelContainer>
)

const InputFileHeader = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: baseline;
`

const InputFileFooter = styled(InputFileHeader)`
  margin-top: 2vh;
`

export const InputFile = ({ name, label, value, onChange, error, progress, filename }: any) => {
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
        <FileInput onClick={() => ref.current?.click()} minWidth="11vw" error={error}>
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
          <div>{t(progress === 0 ? 'upload' : (progress === 100 ? 'uploaded' : 'uploading'))}</div>
          <img src={progress === 0 ? Upload : (progress === 100 ? Check : Pause)} alt="Upload file" />
        </FileInput>
        {filename && (
          <FileInput minWidth="28vw">
            <div>{filename.substring(0, 20)}</div>
            <div>{progress}</div>
          </FileInput>
        )}
      </InputFileFooter>
    </div>
  )
}

const InputUnderline = styled.input`
  width: 100%;
  border: none;
  outline: none;
  padding-bottom: 1vh;
  font-size: 1rem;
  color: #0b0b0b;
  border-bottom: 1px solid #dddddd;
`

const InputOutline = styled.textarea`
  outline: none;
  background: #ffffff;
  border: none;
  resize: none;
`

const Label = styled.div`
  margin-right: 2vw;
`

export const LabelBlack = styled(Label)`
  color: black;
`

export const LabelGrey = styled(Label)`
  color: #7e7e7e;
`

interface OultineProps {
  readonly height: string
  readonly error: boolean
}

const Outline = styled.div<OultineProps>`
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  border: 1px solid ${props => (props.error ? '#FF0000' : '#dddddd')};
  border-radius: 8px;
  padding: 1.5vh 1.2vw;
  height: ${props => props.height};
`

const Character = styled.div`
  font-size: 0.75rem;
  color: #444444;
  align-self: flex-end;
`

export const InputNumber = styled.input`
  border: none;
  outline: none;
  width: 7vw;
`

export const OutlineNumber = styled.div`
  display: flex;
  flex-flow: row nowrap;
  width: 12vw;
  height: 7vh;
  background-color: #ffffff;
  border: 1px solid #dddddd;
  border-radius: 8px;
  align-items: center;
  padding-left: 1.2vw;
`

const Border = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  align-content: center;
  align-items: center;
  border: 1px solid #dddddd;
  border-radius: 8px;
  width: 8vw;
  height: 6vh;
`

interface InputContainerProps {
  readonly direction: string
  readonly align: string
}

const InputContainer = styled.div<InputContainerProps>`
  display: flex;
  flex-flow: ${props => props.direction} nowrap;
  align-items: ${props => props.align};
`

export const Input = ({
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
  error,
  currency
}: any) => {
  const { t } = useTranslation()

  const ref = useRef<HTMLInputElement>(null)

  const [underlineClick, setUnderlineClick] = useState(underline && !value)

  const [count, setCount] = useState(0)

  const handleChange = (e: any) => {
    const length = e.target.value.length
    if (length > characters) return
    setCount(length)
    onChange(e)
  }

  useEffect(() => {
    if (!underlineClick && ref && ref.current) ref.current.focus()
  }, [underlineClick])

  return (
    <InputContainer direction={number ? 'row' : 'column'} align={number ? 'center' : 'flex-start'}>
      {number ? (
        label ? (
          <LabelBlack>{t(label)}</LabelBlack>
        ) : null
      ) : value || textarea || underline ? (
        <div onClick={() => (underline ? setUnderlineClick(false) : null)} style={{ width: '100%' }}>
          <LabelWithCheck text={t(label)} Label={LabelGrey} verified={value} error={error} underline={underlineClick} />
        </div>
      ) : null}
      {underline && !underlineClick && (
        <InputUnderline ref={ref} type="text" name={name} value={value} onChange={handleChange} /> //placeholder={t(label)}
      )}
      {textarea && (
        <Outline height={height} error={error}>
          <InputOutline
            name={name}
            placeholder={t(placeholder ? placeholder : label)}
            value={value}
            onChange={handleChange}
            rows={textarea}
          />
          <Character>
            {characters - count} {t('character')}
          </Character>
        </Outline>
      )}
      {number && (
        <OutlineNumber>
          <InputNumber name={name} type="number" onChange={handleChange} value={value} />
          {currency ? currency : 'STFI'}
        </OutlineNumber>
      )}
    </InputContainer>
  )
}

const Img = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #dddddd;
  border-radius: 2px;
  width: 20px;
  height: 20px;
  padding: 5px;
`

interface InputNumberButtonsProps {
  name: string
  value: number
  onChange: (e: any) => void
}

export const InputNumberButtons = ({ name, value, onChange }: InputNumberButtonsProps) => {
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
