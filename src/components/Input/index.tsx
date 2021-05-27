import React, { useRef, useState } from 'react'
import { TextField, styled as styledmui, makeStyles, Box, Grid } from '@material-ui/core'
import { COLORS } from 'theme'
import Check from './../../assets/icons/check.svg'
import Upload from './../../assets/icons/upload.svg'
import Decrement from './../../assets/icons/decrement.svg'
import Increment from './../../assets/icons/increment.svg'
import styled from 'styled-components'

export const InputBase = styledmui(TextField)({
  backgroundColor: COLORS.white,
  color: COLORS.placeholder,
  boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.135216)'
})

const useStyles = makeStyles({
  textfield: {
    width: '44vw',
    height: '6vh',
    backgroundColor: COLORS.white,
    borderRadius: '4px 0px 0px 4px',
    fontSize: '0.875rem'
  },
  placeholder: {
    fontSize: '0.875rem',
    color: COLORS.placeholder
  }
})

interface InputSearchProps {
  value: string
  onChange: (event: React.ChangeEvent<{}>) => void
}

export const InputSearch = (props: InputSearchProps) => {
  const classes = useStyles()
  return (
    <InputBase
      {...props}
      label="what are you looking for?"
      variant="filled"
      InputProps={{
        className: classes.textfield,
        disableUnderline: true
      }}
      InputLabelProps={{ className: classes.placeholder }}
    />
  )
}

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
`

interface FileInputProps {
  readonly error?: boolean
}

const FileInput = styled(Box)<FileInputProps>`
  border: 1px solid ${props => (props.error ? '#FF0000' : '#dddddd')};
  border-radius: 8px;
  height: 7vh;
  cursor: pointer;
`

export const LabelWithCheck = ({ Label, text, verified, error }: any) => (
  <Box display="flex" flexDirection="row" flexWrap="no" alignItems="baseline">
    <Label>{text}</Label>
    {verified ? <img src={Check} alt="Verified" /> : error && <Missed>Missed</Missed>}
  </Box>
)

export const InputFile = ({ name, label, value, onChange, error }: any) => {
  const ref = useRef<HTMLInputElement>(null)

  return (
    <Box>
      <Grid container direction="row" justify="space-between" alignItems="baseline">
        <LabelWithCheck text={label} Label={LabelBlack} error={error} />
        {value && <ButtonFile onClick={() => onChange({ target: { files: [null] }, type: 'file' })}>Delete</ButtonFile>}
      </Grid>
      <Grid container direction="row" justify="space-between" alignItems="baseline" style={{ marginTop: '2vh' }}>
        <FileInput
          display="flex"
          flexDirection="row"
          justifyContent="space-around"
          alignItems="center"
          onClick={() => ref.current?.click()}
          minWidth="11vw"
          error={error}
        >
          <input type="file" name={name} ref={ref} style={{ display: 'none' }} onChange={onChange} />
          <Box>Uploading</Box>
          <img src={Upload} alt="Upload file" />
        </FileInput>
        {value && value.name && (
          <FileInput
            display="flex"
            flexDirection="row"
            justifyContent="space-around"
            alignItems="center"
            minWidth="28vw"
          >
            <Box>{value.name}</Box>
            <Box>50%</Box>
          </FileInput>
        )}
      </Grid>
    </Box>
  )
}

const InputUnderline = styled.input`
  width: 100%;
  border: none;
  border-bottom: 1px solid #dddddd;
  outline: none;
  padding: 2vh 0;
  font-size: 1rem;
  color: #0b0b0b;
`

const InputOutline = styled.textarea`
  outline: none;
  background: #ffffff;
  border: none;
  resize: none;
  line-height: 28px;
  letter-spacing: 0.04em;
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

const Outline = styled(Grid)<OultineProps>`
  border: 1px solid ${props => (props.error ? '#FF0000' : '#dddddd')};
  border-radius: 8px;
  padding: 1.5vh 1.2vw;
  margin-top: 2vh;
  height: ${props => props.height};
`

const Character = styled(Box)`
  font-size: 0.75rem;
  color: #444444;
`

const InputNumber = styled.input`
  border: none;
  outline: none;
  width: 7vw;
`

const OutlineNumber = styled.div`
  display: flex;
  flex-flow: row nowrap;
  width: 12vw;
  height: 7vh;
  background: #ffffff;
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
  error
}: any) => {
  const [count, setCount] = useState(0)

  const handleChange = (e: any) => {
    const length = e.target.value.length
    if (length > characters) return
    setCount(length)
    onChange(e)
  }

  return (
    <Grid container direction={number ? 'row' : 'column'} alignItems={number ? 'center' : 'flex-start'}>
      {number ? (
        <LabelBlack>{label}</LabelBlack>
      ) : value || textarea ? (
        <LabelWithCheck text={label} Label={LabelGrey} verified={value} error={error} />
      ) : null}
      {underline && (
        <InputUnderline type="text" name={name} placeholder={label} value={value} onChange={handleChange} />
      )}
      {textarea && (
        <Outline container direction="column" height={height} error={error}>
          <InputOutline
            name={name}
            placeholder={placeholder ? placeholder : label}
            value={value}
            onChange={handleChange}
            rows={textarea}
          />
          <Character alignSelf="flex-end">{characters - count} Character</Character>
        </Outline>
      )}
      {number && (
        <OutlineNumber>
          <InputNumber type="number" />
          STFI
        </OutlineNumber>
      )}
    </Grid>
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

export const InputNumberButtons = () => {
  const [value, setValue] = useState(0)

  return (
    <Border>
      <Img onClick={() => (value > 0 ? setValue(value - 1) : null)}>
        <img src={Decrement} alt="Decrement" />
      </Img>
      <Box>{value}</Box>
      <Img onClick={() => setValue(value + 1)}>
        <img src={Increment} alt="Increment" />
      </Img>
    </Border>
  )
}
