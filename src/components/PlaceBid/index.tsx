import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

interface IPlaceBidProps {
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
  width: 55vw;
  height: 55vh;
`

const Title = styled.div`
  font-weight: 500;
  font-size: 18px;
  color: #000000;
  padding: 4vh 0;
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
  border-bottom: 1px solid #000000;
  padding-left: 1vw;
  padding-bottom: 1vh;
  width: fit-content;
  margin-top: 4vh;
  margin-bottom: 1vh;
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
  margin-top: 2vh;
  margin-bottom: 8vh;
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
  padding: 2vh 2vw;
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
  width: 30vw;
  border: none;
  outline: none;
  padding: 2vh 2vw;
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


const PlaceBid: React.FunctionComponent<IPlaceBidProps> = ({isOpen, close}) => {
  const { t } = useTranslation()

  const [bid, setBid] = useState(0)

  const balance = 0.00005

  const usd = 43.5

  if (!isOpen) return null

  return (
    <Container>
      <Title>{t('placeBid')}</Title>
      <Body>
        <Price>{t('price')}</Price>
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
          <ButtonPlaceBidSetBidding>{t('setBidding')}</ButtonPlaceBidSetBidding>
        </ButtonsContainer>
      </Body>
    </Container>
  )
}

export default PlaceBid
