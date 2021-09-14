import { useSTFItoUSD } from 'hooks/useSTFItoUSD'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router'

import { useBidOrBuyValue, useSetBidOrBuy, useIsValid } from 'state/marketplace/hooks'


import { useSTFIBalance } from 'hooks/useSTFIBalance'
import { Row } from 'theme'
import Text from '../Text'
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
import { AuctionNFT } from 'services/models/AuctionNFT'

interface BidOrBuyProps {
  bidOrBuy: boolean
  isOpen: boolean
  minBid: number
  lastBidding: number
  auction: AuctionNFT
  close: () => void
}

const BidOrBuy: React.FunctionComponent<BidOrBuyProps> = ({ bidOrBuy, isOpen, close, minBid, lastBidding }) => {
  const { t } = useTranslation()

  const history = useHistory()

  const balance = useSTFIBalance()
  const setBidOrBuy = useSetBidOrBuy()

  const [value, setValue] = useState(useBidOrBuyValue())

  const usd = useSTFItoUSD(value)
  const isValidBid = useIsValid(value, minBid)
  const [showInvalidBidMessage, setShowInvalidBidMessage] = useState<boolean>(false)
  const [invalidBidMessage, setInvalidBidMessage] = useState<string>('')
  const title = bidOrBuy ? 'placeBid' : 'proceedToPayment'

  const button = bidOrBuy ? 'setBidding' : 'proceedToPayment'

  useEffect(() => {
    if (isValidBid) {
      setInvalidBidMessage('')
      setShowInvalidBidMessage(false)
    } else if (!isValidBid && value < minBid) {
      setInvalidBidMessage(`${t('invalidMinBid')}${minBid}`)
    } else {
      setInvalidBidMessage(`${t('invalidBid')}${lastBidding}`)
    }
  }, [value])

  if (!isOpen) return null

  return (
    <React.Fragment>
      <Shadow onClick={close} />
      <Container>
        <Title>
          {t(title)}
          {showInvalidBidMessage ? (
            <Text
              fontFamily='Roboto'
              fontSize='0.7rem'
              color='#ff0000'
              spanWeight='800'
              marginLeft='1rem'
              margin='15px 0px 0px 0px'
            >
              {invalidBidMessage}
            </Text>
          ) : null}
        </Title>

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
          <Text
            fontFamily='Roboto'
            fontSize='0.7rem'
            color='#ff0000'
            spanWeight='600'
            marginLeft='1rem'
            margin='-40px 0px 20px 0px'
          >
            {t('minBidding')} :
            <span>
              {minBid} {t('stake')}
            </span>
          </Text>

          <Row>
            <ButtonBidOrBuyCancel onClick={close}>{t('cancel')}</ButtonBidOrBuyCancel>
            <ButtonBidOrBuyGetBalance>{t('getBalance')}</ButtonBidOrBuyGetBalance>
            <ButtonBidOrBuySetBidding
              onClick={() => {
                if (value !== 0) {
                  setBidOrBuy(bidOrBuy, value)
                  isValidBid ? history.push('/marketplace/buyorbid') : setShowInvalidBidMessage(true)
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
