import React from 'react'
import { useTranslation } from 'react-i18next'
import { useAuction, useNFT } from 'state/marketplace/hooks'
import { openFor } from 'utils'
import { NFTSummaryProps } from '.'
import Amount from './Amount'
import EditableBox from './EditableBox'
import { Label, Data, Field, Line } from './styles'

const AuctionBoxes: React.FC<NFTSummaryProps> = ({ step }) => {
  const { t } = useTranslation()

  const nft = useNFT()

  const auction = useAuction()

  if (!nft || !auction) return null

  return (
    <React.Fragment>
      <EditableBox editable={step === 8} link="/mint/steps" state={{ step: 7 }}>
        <Field>
          <Label>{t('pricing')}</Label>
          <Data>
            <Amount amount={auction.listingPrice} />
          </Data>
        </Field>
        <Line />
        <Field>
          <Label>{t('minimumBidding')}</Label>
          <Data>
            <Amount amount={auction.minBid || 0} />
          </Data>
        </Field>
        <Line />
        <Field>
          <Label>{t('auctionTime')}</Label>
          <Data>
            {t('openedFor')} {`${openFor(auction.expireTimestamp)}`}
          </Data>
        </Field>
        <Line />
        <Field>
          <Label>{t('qualifyAmount')}</Label>
          <Data>
            <Amount amount={auction.qualifyAmount || 0} />
          </Data>
        </Field>
      </EditableBox>
      <EditableBox>
        <Field>
          <Label>{t('tokenId')}</Label>
          <Data>{nft.id}</Data>
        </Field>
        <Line />
        <Field>
          <Label>{t('contractAddressAttribute')}</Label>
          <Data></Data>
        </Field>
      </EditableBox>
    </React.Fragment>
  )
}

export default AuctionBoxes
