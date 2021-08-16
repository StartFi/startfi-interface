import styled from 'styled-components'
import { Row } from 'theme'

export const Header = styled(Row)`
  padding-bottom: 6vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const Results = styled.div`
  color: #2c2c2c;
`

export const NFTList = styled(Row)`
  justify-content: space-evenly;
  flex-wrap: wrap;
`

export const Nft = styled.div`
  margin-bottom: 8vh;
`

export const Padding = styled.div`
  padding: 0 2vw;
`

export const DropDownContainer = styled.div`
  display: flex;
  width: 40%;
  align-items: center;
`
export const DropDownImgIcons = styled.img`
  width: 40px;
  height: 40px;
  cursor: pointer;
  margin-top: 5px;
`
