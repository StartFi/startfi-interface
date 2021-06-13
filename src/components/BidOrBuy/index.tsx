import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router'
import { useUserBalance } from 'state/user/hooks'
import styled from 'styled-components'

interface BidOrBuyProps {
  bidOrBuy: boolean
  isOpen: boolean
  close: () => void
  nft: any
}

const Container = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #ffffff;
  border-radius: 8px;
  padding-bottom: 4vh;
  z-index: 999;
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

const USDPrice = styled.input`
  border: none;
  outline: none;
  width: 5.2vw;
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

const Shadow = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
`

const BidOrBuy: React.FunctionComponent<BidOrBuyProps> = ({ bidOrBuy, isOpen, close, nft }) => {
  
  const { t } = useTranslation()

  const history = useHistory()

  const balance = useUserBalance()

  const [value, setValue] = useState<number>(0)

  if (!isOpen) return null

  const usd = () => value * 10

  const title = bidOrBuy ? 'placeBid' : 'proceedToPayment'

  const button = bidOrBuy ? 'setBidding' : 'proceedToPayment'


  return (
    <React.Fragment>
      <Shadow />
      <Container>
        <Title>{t(title)}</Title>
        <Body>
          <Price>{t('price')}</Price>
          <PriceUnderline />
          <Balance>
            {t('balance')} {balance} STFI
          </Balance>
          <InputContainer>
            <STFI>STFI</STFI>
            <Input type="number" value={value} onChange={(e: any) => setValue(e.target.value)} />
            <USD>
              <USDPrice type="number" value={usd()} />
              <USDWord>USD</USDWord>
            </USD>
          </InputContainer>
          <ButtonsContainer>
            <ButtonPlaceBidCancel onClick={close}>{t('cancel')}</ButtonPlaceBidCancel>
            <ButtonPlaceBidGetBalance>{t('getBalance')}</ButtonPlaceBidGetBalance>
            <ButtonPlaceBidSetBidding onClick={() => {console.log({ bidOrBuy, value, nft });history.push('/nftconfirm', { bidOrBuy, value, nft })}}>
              {t(button)}
            </ButtonPlaceBidSetBidding>
          </ButtonsContainer>
        </Body>
      </Container>
    </React.Fragment>
  )
}

export default BidOrBuy
