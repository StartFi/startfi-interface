import styled from 'styled-components'
import { Row } from 'theme'

export const Container = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #ffffff;
  border-radius: 8px;
  padding-bottom: 4vh;
  z-index: 999;
`

export const Title = styled.div`
  font-weight: 500;
  font-size: 18px;
  color: #000000;
  padding: 4.5vh 0;
  border-bottom: 1px solid #d1d1d1;
  text-align: center;
`

export const Body = styled.div`
  padding: 0 4vw;
`

export const Price = styled.div`
  font-weight: 500;
  font-size: 18px;
  color: #000000;
  padding-left: 1vw;
  padding-bottom: 1vh;
  margin-top: 4.5vh;
`

export const PriceUnderline = styled.div`
  border-bottom: 1px solid #000000;
  width: 2.5vw;
`

export const Balance = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-end;
  font-weight: 500;
  font-size: 18px;
  color: #000000;
`

export const InputContainer = styled(Row)`
  margin-top: 3vh;
  margin-bottom: 9vh;
  background: #ffffff;
  border: 1px solid #dddddd;
  border-radius: 8px;
`

export const STFI = styled.div`
  font-weight: bold;
  color: #000000;
  border-right: 1px solid #dddddd;
  padding: 2vh 2vw 2vh 1.5vw;
`

export const USD = styled(Row)`
  border-left: 1px solid #dddddd;
  padding: 2vh 1vw;
  width: 10vw;
`

export const Input = styled.input`
  width: 24vw;
  border: none;
  outline: none;
  padding: 2vh 2vw;
  color: #444444;
`

export const USDPrice = styled.input`
  border: none;
  outline: none;
  width: 5.2vw;
  color: #444444;
`

export const USDWord = styled.div`
  font-weight: bold;
  color: #000000;
`

export const ButtonBidOrBuy = styled.button`
  width: 12vw;
  height: 6vh;
  cursor: pointer;
  box-sizing: border-box;
  border-radius: 4px;
  border: 1px solid #d6d6d6;
  background-color: white;
`

export const ButtonBidOrBuyCancel = styled(ButtonBidOrBuy)`
  color: #9b9b9b;
`

export const ButtonBidOrBuyGetBalance = styled(ButtonBidOrBuy)`
  border: 1px solid #000000;
  color: #000000;
`

export const ButtonBidOrBuySetBidding = styled(ButtonBidOrBuy)`
  color: white;
  background-color: black;
`

export const Shadow = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
`