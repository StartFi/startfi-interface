import styled from 'styled-components'
import { Row, SpaceBetween } from 'theme'

export const Container = styled(Row)`
  justify-content: flex-start;
  width: fit-content;
`

export const MarginLeft = styled.div`
  margin-right: 2vw;
`

export const Circle = styled(Row)`
  margin-left: 1vw;
  display: inline-flex;
  position: relative;
  background: #f7f7f7;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  justify-content: center;
`

interface TooltipProps {
  readonly minWidth?: string
}

export const Tooltip = styled.div<TooltipProps>`
  position: absolute;
  top: 2vh;
  left: 2vw;
  padding: 2vh 2vw;
  min-width: ${({ minWidth }) => (minWidth ? minWidth : '20vw')};
  background: #ffffff;
  border: 1px solid #f7f7f7;
  box-sizing: border-box;
  box-shadow: 6px 8px 11px 2px rgba(230, 230, 230, 0.25);
  border-radius: 8px;
  color: #555555;
  z-index: 99;
`

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

export const Missed = styled.div`
  font-size: 0.875rem;
  color: #ff0000;
`

export const ButtonFile = styled.button`
  font-size: 14px;
  text-decoration-line: underline;
  color: #444444;
  border: none;
  background-color: white;
  cursor: pointer;
  white-space: nowrap;
`

interface FileInputProps {
  readonly error?: boolean
  readonly minWidth?: string
  readonly borderRight?: boolean
}

export const FileInput = styled.div<FileInputProps>`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  align-items: center;
  border-right: ${props => (props.borderRight ? '1px solid #dddddd' : 'none')};
  height: 7vh;
  cursor: pointer;
  min-width: ${props => props.minWidth || 'none'};
`

interface LabelContainerProps {
  readonly error?: boolean
  readonly underline?: boolean
}

export const LabelContainer = styled.div<LabelContainerProps>`
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  align-items: baseline;
  padding-bottom: 2vh;
  border-bottom: ${props => (props.underline ? '1px solid' : 'none')} ${props => (props.error ? '#FF0000' : '#dddddd')};
`

export const InputFileHeader = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: baseline;
  max-width: 30vw;
`

export const InputFileFooter = styled(InputFileHeader)<FileInputProps>`
  justify-content: flex-start;
  margin-top: 2vh;
  border: 1px solid ${props => (props.error ? '#FF0000' : '#dddddd')};
  border-radius: 8px;
  width: fit-content;
`

export const InputUnderline = styled.input`
  width: 100%;
  border: none;
  outline: none;
  padding-bottom: 1vh;
  font-size: 1rem;
  color: #0b0b0b;
  border-bottom: 1px solid #dddddd;
`

export const InputOutline = styled.textarea`
  outline: none;
  background: #ffffff;
  border: none;
  resize: none;
`

export const Progress = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: #444;
`

export const LabelBlack = styled.div`
  margin-right: 1vw;
  color: black;
`

export const LabelGrey = styled.div`
  margin-right: 1vw;
  color: #7e7e7e;
`

interface OultineProps {
  readonly height?: string
  readonly error: boolean
}

export const Outline = styled.div<OultineProps>`
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  border: 1px solid ${props => (props.error ? '#FF0000' : '#dddddd')};
  border-radius: 8px;
  padding: 1.5vh 1.2vw;
  height: ${({ height }) => (height ? height : 'unset')};
`

export const Character = styled.div`
  font-size: 0.75rem;
  color: #444444;
  align-self: flex-end;
`

interface InputNumberProps {
  readonly width?: string
  readonly error?: boolean
}

export const InputNumber = styled.input<InputNumberProps>`
  border: none;
  outline: none;
  width: ${({ width }) => (width ? width : '7vw')};
`

export const OutlineNumber = styled.div<InputNumberProps>`
  display: flex;
  flex-flow: row nowrap;
  width: ${({ width }) => (width ? width : '12vw')};
  height: 7vh;
  background-color: #ffffff;
  border: 1px solid ${({ error }) => (error ? '#FF0000' : '#dddddd')};
  border-radius: 8px;
  align-items: center;
  padding-left: 1.2vw;
`

export const Border = styled.div<InputNumberProps>`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  align-content: center;
  align-items: center;
  border: 1px solid ${({ error }) => (error ? '#FF0000' : '#dddddd')};
  border-radius: 8px;
  width: 8vw;
  height: 6vh;
`

interface InputContainerProps {
  readonly direction: string
  readonly align: string
}

export const InputContainer = styled.div<InputContainerProps>`
  display: flex;
  flex-flow: ${props => props.direction} nowrap;
  align-items: ${props => props.align};
`

export const Img = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #dddddd;
  border-radius: 2px;
  width: 20px;
  height: 20px;
  padding: 5px;
`

export const ContainerSTFI = styled(SpaceBetween)`
  width: fit-content;
  margin: 2vh 0;
`

export const Arrows = styled.img`
  margin: 0 2vw;
`
