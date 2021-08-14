import styled from 'styled-components'
import { Row } from 'theme'

export const LoadingDiv = styled('div') <{ $display?: boolean }>`
  position: absolute;
  z-index: 100;
  top: 50%;
  left: 50%;
  display: ${({ $display }) => ($display ? 'block' : 'none')};
  opacity: 1;
`
export const Grid = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 130px;
`

export const LeftGrid = styled.div`
  width: 50%;
`

export const RightGrid = styled.div`
  width: 50%;
`
export const ImgCard = styled.div`
  width: 444px;
  height: 500px;
  margin-top: 30px;
  position: relative;
  border-radius: 8px;

  & img {
    width: 100%;
    height: 100%;
    position: absolute;
  }

  & p {
    height: 50px;
    width: 147px;
    background-color: #2e2e2e;
    color: #ffffff;
    position: absolute;
    top: -16px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

export const LeftTextCard = styled.div`
  height: 223px;
  width: 444px;
  margin-top: 20px;
  border-radius: 8px;
  background-color: #fbfbfb;
`

export const CreatedTitle = styled.div`
  height: 57px;
  border-bottom: 1px solid #eeeeee;
  display: flex;
  align-items: center;
  justify-content: center;
  & p {
    font-family: Roboto;
    font-weight: 400;
    font-size: 1rem;
    color: #323232;

    & span {
      font-weight: 500;
      font-size: 1.125rem;
      color: #000000;
      margin-left: 7px;
    }
  }
`

export const CreatedText = styled.div`
  padding-right: 27px;
  padding-left: 27px;
  & p {
    font-family: Roboto;
    font-weight: 400;
    font-size: 1rem;
    line-height: 1.75rem;
    color: #000000;
    text-align: justify;
  }
`

export const RightTitle = styled.div`
  margin-top: 30px;
  margin-left: 2px;
  margin-bottom: 12px;
  font-family: Roboto;
  font-weight: 700;
  font-size: 1.125rem;
  line-height: 1.1875rem;
`

export const RightSubTitle = styled.div`
  width: 445px;
  font-family: Roboto;
  margin-left: 2px;
  font-weight: 400;
  font-size: 1rem;
  margin-bottom: 17px;
`

export const PublisherCard = styled('div') <{ height?: string }>`
  height: ${({ height }) => height};
  width: 445px;
  border-radius: 8px;
  margin-bottom: 30px;
  background-color: #fbfbfb;
  display: flex;
  flex-direction:column;
  align-items: start;
`

export const BuyCard = styled.div`
  height: 210px;
  width: 445px;
  padding-left: 23px;
  border-radius: 8px;
  margin-bottom: 30px;
  background-color: #fbfbfb;
`

export const LastBiddingContainer = styled.div`
  position: relative;
  top: 16px;
  display: flex;
  align-items: center;
`

export const BuyButtons = styled('div') <{ $opacity?: boolean }>`
  display: flex;
  position: relative;
  margin-top: 27px;
  height: 45px;
  margin-right: 23px;
`
export const PlaceBid = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 20px;
  width: 135px;
  height: 45px;
  border-radius: 8px;
  border: solid 1px #ececec;
  background-color: #fbfbfb;
  & button {
    border: none;
    background: transparent;
    cursor: pointer;
  }
`

export const BuyNow = styled.div`
  & button {
    position: relative;
    top: 30px;
    width: 95%;
    height: 50px;
    border-radius: 4px;
    background-color: #000000;
    border: 1px solid #000000;
    color: #ffffff;
    font-size: 1rem;
    font-family: Roboto;
    letter-spacing: 0.04em;
    cursor: pointer;
  }
`

export const DescriptionCard = styled('div') <{ overflowY?: string }>`
  height: 317px;
  width: 445px;
  border-radius: 8px;
  margin-bottom: 30px;
  overflow-y: ${({ overflowY }) => overflowY};
  background-color: #fbfbfb;
`

export const DescriptionTitle = styled.div`
  height: 57px;
  border-bottom: 1px solid #eeeeee;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  & p {
    padding-left: 19px;
    font-family: Roboto;
    font-weight: 500;
    font-size: 1.125rem;
    line-height: 1.1875rem;
    color: #000000;
  }
`
export const DescriptionText = styled.div`
  padding-right: 27px;
  padding-left: 27px;

  & p {
    font-family: Roboto;
    font-weight: 400;
    font-size: 1rem;
    line-height: 1.75rem;
    color: #000000;
    text-align: justify;
    letter-spacing: 0.04em;
  }
`

export const OwnerText = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: -15px;
`

export const Name = styled(Row)`
  width: 445px;
`

export const Stakes = styled(Row)`
  justify-content: flex-end;
  width: fit-content;
`

export const NoStakes = styled.li`
  color: #d90000;
`

export const GetNow = styled.div`
  margin-left: 2vw;
  font-weight: 500;
  text-decoration: underline;
`
export const TagContainer = styled('div') <{ margin?: string; lastChildWidth?: string }>`
  width: 445px;
  height: 90px;
  border-radius: 8px;
  margin-bottom: 30px;
  display: flex;
  flex-wrap: wrap;


  & div {
     display: flex;
    align-items:center;
     width: fit-content;
    height: 35px;
    margin: 5px 5px;
    background: #f4f4f4;
   border-radius: 4px;
    outline: none;
    border: transparent;
    & p {
     margin:15px ;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  & :last-child {
    /* width: ${({ lastChildWidth }) => lastChildWidth ?? '87px'}; */
  }
`
export const TimerContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  width: 449px;
  height: 68px;
  padding: 20px 33px 20px 21px;
  box-shadow: inset 0 0 10px 0 rgba(0, 0, 0, 0.25), 0 0 8px 0 rgba(0, 0, 0, 0.25);
  border: solid 1px #ececec;
  background-color: #fbfbfb;
`
