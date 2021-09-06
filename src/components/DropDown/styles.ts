import styled from 'styled-components'
import { Row } from 'theme/components'

interface WidthProps {
  readonly width: string
  readonly itemsWidth?: string
  readonly marginRight?: string
  readonly left?: string
}

export const Container = styled.div<WidthProps>`
  width: ${props => props.width};
  position: relative;
  height:5vh;
  margin-right:${props => props.marginRight};;
  /* z-index: 9999; */


`


export const LabelRow = styled(Row)<{ border?: string,LabelWidth?:string,boxShadow?:string,iconPosition?:string }>`
  min-height: 6vh;
  /* height:6vh; */
  width:${({LabelWidth }) =>LabelWidth};
  border: 1px solid #dddddd;
  border: ${({ border }) => border};
  box-sizing: border-box;
  border-radius: 8px;
  box-shadow: ${({boxShadow }) =>boxShadow};
  padding: 2vh 2vw;
  cursor: pointer;

  & img {
    position: relative;
    left:${({iconPosition }) =>iconPosition};
  }

`

export const Label = styled.div`
  text-transform: capitalize;
  color: #2c2c2c;
  font-size:0.876rem;
`

export const Items = styled.div<WidthProps>`
  margin-top: 2vh;
  margin-right:30px;
  border: 1px solid #dddddd;
  border-radius: 8px;
  position: absolute;
  left: ${props => props.left};
  /* position: relative; */
  z-index: 9999;
  width: ${props => props.width};
  width: ${props => props.itemsWidth};
  background-color: white;
`

interface ItemProps {
  readonly selected: boolean
  readonly last: boolean
  readonly first: boolean
}

export const Item = styled.div<ItemProps>`
  border-bottom: ${props => (props.last ? 'none' : '1px solid #DDDDDD')};
  padding: 3vh 1vw;
  cursor: pointer;

  text-transform: capitalize;
  border-radius: ${props => (props.first?'8px 8px 0px 0px' : props.last ? '0px 0px 8px 8px' : '0px 0px 0px 0px')};
  border-radius: ${props => (props.selected &&props.first? '8px 8px 0px 0px' :'none')};
  color: ${props => (props.selected ? 'white' : 'black')};
  background-color: ${props => (props.selected ? 'black' : 'white')};
  &:hover {
    color: white;
    background-color: black;
    /* border-radius: 0; */
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

