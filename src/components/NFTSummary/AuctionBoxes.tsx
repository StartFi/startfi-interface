import React from 'react'
import { useTranslation } from 'react-i18next'
import { useAuction, useNFT, useStep } from 'state/marketplace/hooks'
import { STEP } from 'state/marketplace/types'
import { openFor } from 'utils'
import DisplaySTFIUSD from './DisplaySTFI-USD'
import EditableBox from './EditableBox'
import { Label, Data, Field, Line } from './styles'

const AuctionBoxes: React.FC = () => {
  const { t } = useTranslation()

  const step = useStep()

  const nft = useNFT()

  const auction = useAuction()

  if (!nft || !auction) return null

  return (
    <React.Fragment>
      <EditableBox editable={step === STEP.AUCTION_SUMMARY} link="/mint/steps" step={STEP.AUCTION_DETAILS}>
        {auction.isForSale && (
          <Field>
            <Label>{t('pricing')}</Label>
            <Data>
              <DisplaySTFIUSD amount={auction.listingPrice || 0} />
            </Data>
          </Field>
        )}
        <Line />
        {auction.isForBid && (
          <React.Fragment>
            <Field>
              <Label>{t('minimumBidding')}</Label>
              <Data>
                <DisplaySTFIUSD amount={auction.minBid || 0} />
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
                <DisplaySTFIUSD amount={auction.qualifyAmount || 0} />
              </Data>
            </Field>
          </React.Fragment>
        )}
      </EditableBox>
      <EditableBox>
        <Field>
          <Label>{t('tokenId')}</Label>
          <Data>{nft.id}</Data>
        </Field>
        <Line />
        <Field>
          <Label>{t('contractAddressAttribute')}</Label>
          <Data>{auction.contractAddress}</Data>
        </Field>
      </EditableBox>
    </React.Fragment>
  )
}

export default AuctionBoxes
