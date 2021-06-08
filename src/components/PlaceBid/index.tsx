import { ButtonPlaceBidCancel, ButtonPlaceBidGetBalance, ButtonPlaceBidSetBidding } from 'components/Button'
import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

interface IPlaceBidProps {}

const Container = styled.div`
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

const PlaceBid: React.FunctionComponent<IPlaceBidProps> = props => {
  const { t } = useTranslation()

  const balance = 0.00005

  const usd = 43.5

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
          <Input />
          <USD>
            <USDPrice>{usd}</USDPrice>
            <USDWord>USD</USDWord>
          </USD>
        </InputContainer>
        <ButtonsContainer>
          <ButtonPlaceBidCancel>{t('cancel')}</ButtonPlaceBidCancel>
          <ButtonPlaceBidGetBalance>{t('getBalance')}</ButtonPlaceBidGetBalance>
          <ButtonPlaceBidSetBidding>{t('setBidding')}</ButtonPlaceBidSetBidding>
        </ButtonsContainer>
      </Body>
    </Container>
  )
}

export default PlaceBid
