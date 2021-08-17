import React from 'react'
import { useTranslation } from 'react-i18next'
import { useAddAuction } from 'state/marketplace/hooks'
import { MarginLeft, RadioDesc, Row } from '../MintCard.tsx/styles'

const ChooseType: React.FC = () => {
  const { t } = useTranslation()

  const { handleChange } = useAddAuction()

  const onClick = (sell: boolean, bid: boolean) => {
    handleChange(sell, 'isForSale')
    handleChange(bid, 'isForBid')
  }

  return (
    <React.Fragment>
      <Row>
        <input type="radio" name="radio" onChange={() => onClick(true, true)} />
        <MarginLeft>
          <div>{t('auctionAndSell')}</div>
          <RadioDesc>{t('auctionAndSellDesc')}</RadioDesc>
        </MarginLeft>
      </Row>
      <Row>
        <input type="radio" name="radio" onChange={() => onClick(false, true)} />
        <MarginLeft>
          <div>{t('auctionOnly')}</div>
          <RadioDesc>{t('auctionDesc')}</RadioDesc>
        </MarginLeft>
      </Row>
      <Row>
        <input type="radio" name="radio" onChange={() => onClick(true, false)} />
        <MarginLeft>
          <div>{t('sellOnly')}</div>
          <RadioDesc>{t('sellDesc')}</RadioDesc>
        </MarginLeft>
      </Row>
    </React.Fragment>
  )
}

export default ChooseType
