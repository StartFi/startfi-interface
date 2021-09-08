import { useSTFItoUSD } from 'hooks/useSTFItoUSD'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router'
import { useBidOrBuyValue, useSetBidOrBuy, useIsMoreThanMin } from 'state/marketplace/hooks'
import { useUserBalance } from 'state/user/hooks'
import { useSTFIBalance } from 'hooks/useSTFIBalance'
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
import { usePopup } from 'state/application/hooks'
import { AuctionNFT } from 'services/models/AuctionNFT'

interface BidOrBuyProps {
  bidOrBuy: boolean
  isOpen: boolean
  minBid: number
  auction: AuctionNFT
  close: () => void
}

const BidOrBuy: React.FunctionComponent<BidOrBuyProps> = ({ bidOrBuy, isOpen, close, minBid,auction }) => {
  const { t } = useTranslation()

  const history = useHistory()

  const balance = useSTFIBalance()
  const setBidOrBuy = useSetBidOrBuy()

  const [value, setValue] = useState(useBidOrBuyValue())

  const usd = useSTFItoUSD(value)
  const popup = usePopup()
  const isMoreThanMin = useIsMoreThanMin(value,minBid,auction)

  if (!isOpen) return null

  const title = bidOrBuy ? 'placeBid' : 'proceedToPayment'

  const button = bidOrBuy ? 'setBidding' : 'proceedToPayment'
  console.log(value)

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
            <Input type='number' value={value} onChange={(e: any) => setValue(e.target.value)} />
            <USD>
              <USDPrice type='number' value={usd} />
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
                  isMoreThanMin
                    ? history.push('/marketplace/buyorbid')
                    :  popup({ success: false, message: `Your Bidding is less than min Bidding of ${minBid}` })

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
