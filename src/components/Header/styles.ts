import styled from 'styled-components'
import { CenteredRow, Row } from 'theme/components'

export const Img = styled.img`
  margin-right: 1vw;
`

export const Search = styled(Row)`
  display: flex;
  justify-content: start;
  align-items: stretch;
  height: 6vh;
  width: 45%;
`

export const TabsCategory = styled(Row)`
  margin-top: 2vh;
  margin-bottom: 4vh;
  padding: 3vh 0;
  padding-right: 10vw;
  border-bottom: 1px solid #efefef;
`

interface TabProps {
  readonly selected: boolean
}

export const Tab = styled(CenteredRow)<TabProps>`
  cursor: pointer;
  width: fit-content;
  padding-bottom: 1vh;
  border-bottom: ${props => (props.selected ? '2px solid #000000;' : 'none;')};
`

export const FirstRow = styled(Row)`
  /* margin-bottom: 4vh; */
  & img {
    cursor: pointer;
    margin-right: 12px;
  }
`

// export const LogoImg=styled.img`
// width:40px;
// height:40px
// `

export const ConnectWallet = styled.div`
  width: 100%;
  text-align: center;
  background: rgba(255, 0, 0, 0.05);
  border: 1px solid rgba(228, 0, 0, 0.1);
  border-radius: 4px;
  text-transform: capitalize;
  color: #ba0404;
  padding: 1vh 0;
  margin-top: 4vh;
`
