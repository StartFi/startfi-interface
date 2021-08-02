import styled from 'styled-components'
import { Row, Center } from 'theme/components'
import { ButtonBlack, ButtonTransparentBorder } from 'components/NFTConfirm/styles'
import { Link } from 'react-router-dom'

export const Container = styled.div`
  width: 100%;
`

export const Body = styled(Row)`
  align-items: stretch;
  margin-top: 5vh;
`

export const CardBase = styled.div`
  max-height: 85vh;
  padding: 5vh 3vw;
  background: #ffffff;
  border: 1px solid #e3e3e3;
  box-sizing: border-box;
  box-shadow: 0px 0px 20px rgba(239, 239, 239, 0.25);
  border-radius: 8px 8px 0px 0px;
  overflow: auto;
`

export const Left = styled(CardBase)`
  width: 37%;
  padding: 5vh 0;
`

export const Right = styled(CardBase)`
  width: 60%;
`

export const DropDown = styled.div`
  margin: 10vh 0;
`

export const Label = styled.div`
  margin-bottom: 2vh;
`

export const Step2Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-around;
  flex: 1 1 auto;
`

export const Margin = styled(Row)`
  margin: 6vh 0 3vh 0;
`

export const Radios = styled(Row)`
  width: 35%;
`

export const Royalty = styled(Row)`
  width: 16vw;
  margin: 3vh 0;
`

export const RadioLabel = styled.span`
  font-weight: bold;
  font-size: 14px;
  margin-left: 1vw;
`

export const Text = styled.div`
  margin-left: 2vw;
`

export const Price = styled(Row)`
  width: 70%;
  margin: 5vh 0;
`

export const QualifyAmount = styled(Price)`
  width: 80%;
`

export const BidOffers = styled.div`
  margin-bottom: 2vh;
`

export const MinBid = styled.div`
  margin: 3vh 0;
`

export const OpenFor = styled(Row)`
  width: 60%;
`

export const NeedHelp = styled.div`
  font-weight: bold;
  font-size: 14px;
  padding: 0 3vw;
  margin-bottom: 2vh;
`

export const Underline = styled.hr`
  margin-top: 2vh;
  width: 3vw;
  height: 0.3vh;
  text-align: left;
  margin-left: 0;
  margin: 0 3vw;
  background-color: ${({ theme }) => theme.black};
`

export const Question = styled(Row)`
  height: 100px;
`

export const Answer = styled.div`
  font-size: 14px;
  color: #555555;
  padding-bottom: 6vh;
`

export const QA = styled.div`
  cursor: pointer;
  border-bottom: 1px solid #ececec;
  padding: 0 3vw;
`

export const Img = styled.img`
  margin-left: 2vw;
`

export const HeaderContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-end;
`

export const LeftContainer = styled.div`
  width: 40%;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  font-weight: 500;
  font-size: 1.125rem;
  cursor: pointer;
  img {
    margin-right: 1vw;
  }
`

export const HeaderRight = styled.div`
  width: 60%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: flex-end;
`

export const Box = styled.div`
  position: relative;
  box-sizing: border-box;
  margin-bottom: 2vh;
  padding: 3vh 2vw;
  background: #fbfbfb;
  border: 1px solid #f4f4f4;
  border-radius: 6px;
`

export const Edit = styled(Row)`
  position: absolute;
  top: 2vh;
  right: 1vw;
  background: #ffffff;
  box-shadow: 3px 5px 10px 2px rgba(0, 0, 0, 0.11);
  border-radius: 8px;
  justify-content: space-evenly;
  width: 8vw;
  padding: 1.5vh 0;
`

export const MintedBorder = styled.div`
  margin-top: 2vh;
  border: 1px solid #eeeeee;
  width: 100%;
`

export const MintedButtonBlack = styled(ButtonBlack)`
  margin-top: 3vh;
  border-radius: 100px;
`

export const MintedButtonWhite = styled(ButtonTransparentBorder)`
  margin-top: 3vh;
  border-radius: 100px;
`

export const CheckIcon = styled.img`
  margin-right: 1vw;
`

export const AddedToMarketplaceContainer = styled(Center)`
  width: 60%;
  text-align: center;
`

export const Header = styled.p`
  font-weight: 900;
  font-size: 36px;
  text-transform: uppercase;
`

export const AddedToMarketplaceText = styled.p`
  font-weight: 400;
  font-size: 16px;
  margin-bottom: 12vh;
  color: #5b5b5b;
`

export const PageLink = styled(Link)`
  font-weight: bold;
  font-size: 40px;
  position: relative;
  text-decoration: none;
  color: #000000;
  &:hover {
    &:hover:after {
      content: '';
      position: absolute;
      top: 120%;
      right: 70%;
      width: 30%;
      height: 3px;
      background: #000000;
    }
  }
`

export const CardContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  height: 100%;
`

export const CardHeader = styled(Row)`
  align-items: flex-start;
`

export const Title = styled.div`
  text-transform: uppercase;
`

export const CardUnderline = styled.hr`
  margin-top: 2vh;
  width: 3vw;
  height: 0.3vh;
  text-align: left;
  margin-left: 0;
  background-color: ${({ theme }) => theme.black};
`

export const Footer = styled.div`
  align-self: flex-end;
  margin-top: auto;
`
