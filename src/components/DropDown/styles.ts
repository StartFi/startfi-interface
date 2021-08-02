import styled from 'styled-components'
import { Row } from 'theme/components'

interface WidthProps {
  readonly width: string
}

export const Container = styled.div<WidthProps>`
  width: ${props => props.width};
  position: relative;
  z-index: 9999;
`

export const LabelRow = styled(Row)`
  min-height: 6vh;
  border: 1px solid #dddddd;
  box-sizing: border-box;
  border-radius: 8px;
  padding: 2vh 2vw;
  cursor: pointer;
`

export const Label = styled.div`
  text-transform: capitalize;
`

export const Items = styled.div<WidthProps>`
  margin-top: 2vh;
  border: 1px solid #dddddd;
  border-radius: 8px;
  position: absolute;
  width: ${props => props.width};
`

interface ItemProps {
  readonly selected: boolean
  readonly last: boolean
}

export const Item = styled.div<ItemProps>`
  border-bottom: ${props => (props.last ? 'none' : '1px solid #DDDDDD')};
  padding: 3vh 1vw;
  cursor: pointer;
  text-transform: capitalize;
  border-radius: ${props => (props.selected ? 'none' : props.last ? '0px 0px 8px 8px' : '8px 8px 0px 0px')};
  color: ${props => (props.selected ? 'white' : 'black')};
  background-color: ${props => (props.selected ? 'black' : 'white')};
  &:hover {
    color: white;
    background-color: black;
    border-radius: 0;
  }
`

export const BlurLayer = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
`
