import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

interface IPlaceBidProps {
  title: string
  button: string
  isOpen: boolean
  close: () => void
}

const Container = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  background: #ffffff;
  border-radius: 8px;
  padding-bottom: 4vh;
  z-index: 9;
`

const Title = styled.div`
  font-weight: 500;
  font-size: 18px;
  color: #000000;
  padding: 4.5vh 0;
  border-bottom: 1px solid #d1d1d1;
  text-align: center;
`

const Body = styled.div`
  padding: 0 4vw;
`

const Price = styled.div`
  font-weight: 500;
  font-size: 18px;
  color: #000000;
  padding-left: 1vw;
  padding-bottom: 1vh;
  margin-top: 4.5vh;
`

const PriceUnderline = styled.div`
  border-bottom: 1px solid #000000;
  width: 2.5vw;
`

const Balance = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-end;
  font-weight: 500;
  font-size: 18px;
  color: #000000;
`

const InputContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  margin-top: 3vh;
  margin-bottom: 9vh;
  background: #ffffff;
  border: 1px solid #dddddd;
  border-radius: 8px;
`

const ButtonsContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
`

const STFI = styled.div`
  font-weight: bold;
  color: #000000;
  border-right: 1px solid #dddddd;
  padding: 2vh 2vw 2vh 1.5vw;
`

const USD = styled.div`
  border-left: 1px solid #dddddd;
  padding: 2vh 1vw;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  width: 10vw;
`

const Input = styled.input`
  width: 24vw;
  border: none;
  outline: none;
  padding: 2vh 2vw;
  color: #444444;
`

const USDPrice = styled.div`
  color: #444444;
`

const USDWord = styled.div`
  font-weight: bold;
  color: #000000;
`

const ButtonPlaceBid = styled.button`
  width: 12vw;
  height: 6vh;
  cursor: pointer;
  box-sizing: border-box;
  border-radius: 4px;
  border: 1px solid #d6d6d6;
  background-color: white;
`

export const ButtonPlaceBidCancel = styled(ButtonPlaceBid)`
  color: #9b9b9b;
`

export const ButtonPlaceBidGetBalance = styled(ButtonPlaceBid)`
  border: 1px solid #000000;
  color: #000000;
`

export const ButtonPlaceBidSetBidding = styled(ButtonPlaceBid)`
  color: white;
  background-color: black;
`


const PlaceBid: React.FunctionComponent<IPlaceBidProps> = ({title, button, isOpen, close}) => {
  const { t } = useTranslation()

  const [bid, setBid] = useState(0)

  const balance = 0.00005

  const usd = 43.5

  if (!isOpen) return null

  return (
    <Container>
      <Title>{t(title)}</Title>
      <Body>
        <Price>{t('price')}</Price>
        <PriceUnderline/>
        <Balance>
          {t('balance')} {balance} STFI
        </Balance>
        <InputContainer>
          <STFI>STFI</STFI>
          <Input type="number" value={bid} onChange={(e:any)=>setBid(e.target.value)}/>
          <USD>
            <USDPrice>{usd}</USDPrice>
            <USDWord>USD</USDWord>
          </USD>
        </InputContainer>
        <ButtonsContainer>
          <ButtonPlaceBidCancel onClick={close}>{t('cancel')}</ButtonPlaceBidCancel>
          <ButtonPlaceBidGetBalance>{t('getBalance')}</ButtonPlaceBidGetBalance>
          <ButtonPlaceBidSetBidding>{t(button)}</ButtonPlaceBidSetBidding>
        </ButtonsContainer>
      </Body>
    </Container>
  )
}

export default PlaceBid
