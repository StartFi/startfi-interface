import { useSTFItoUSD } from 'hooks/useSTFItoUSD'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router'
import { useBidOrBuyValue, useSetBidOrBuy } from 'state/marketplace/hooks'
import { useSTFIBalance } from 'state/user/hooks'
import { Row } from 'theme'
import {
  Balance,
  Container,
  Body,
  ButtonBidOrBuyCancel,
  ButtonBidOrBuyGetBalance,
  ButtonBidOrBuySetBidding,
  Input,
  InputContainer,
  Price,
  PriceUnderline,
  STFI,
  Shadow,
  Title,
  USD,
  USDPrice,
  USDWord
} from './styles'

interface BidOrBuyProps {
  bidOrBuy: boolean
  isOpen: boolean
  close: () => void
}

const BidOrBuy: React.FunctionComponent<BidOrBuyProps> = ({ bidOrBuy, isOpen, close }) => {
  const { t } = useTranslation()

  const history = useHistory()

  const balance = useSTFIBalance()

  const setBidOrBuy = useSetBidOrBuy()

  const [value, setValue] = useState(useBidOrBuyValue())

  const usd = useSTFItoUSD(value)

  if (!isOpen) return null

  const title = bidOrBuy ? 'placeBid' : 'proceedToPayment'

  const button = bidOrBuy ? 'setBidding' : 'proceedToPayment'

  return (
    <React.Fragment>
      <Shadow onClick={close} />

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
              <USDPrice type="number" value={usd} />
              <USDWord>USD</USDWord>
            </USD>
          </InputContainer>

          <Row>
            <ButtonBidOrBuyCancel onClick={close}>{t('cancel')}</ButtonBidOrBuyCancel>
            <ButtonBidOrBuyGetBalance>{t('getBalance')}</ButtonBidOrBuyGetBalance>
            <ButtonBidOrBuySetBidding
              onClick={() => {
                if (value !== 0) {
                  setBidOrBuy(bidOrBuy, value)
                  history.push('/marketplace/buyorbid')
                }
              }}
            >
              {t(button)}
            </ButtonBidOrBuySetBidding>
          </Row>
        </Body>
      </Container>
    </React.Fragment>
  )
}

export default BidOrBuy
