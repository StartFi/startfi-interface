import React from 'react'
import { useTranslation } from 'react-i18next'
import { useAuction, useNFT, useStep } from 'state/marketplace/hooks'
import { STEP } from 'state/marketplace/types'
import { openFor } from 'utils'
import DisplayBalance from './DisplayBalance'
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
        {auction.isSellForEnabled && (
          <Field>
            <Label>{t('pricing')}</Label>
            <Data>
              <DisplayBalance amount={auction.listingPrice || 0} />
            </Data>
          </Field>
        )}
        <Line />
        {auction.isBedEnabled && (
          <React.Fragment>
            <Field>
              <Label>{t('minimumBidding')}</Label>
              <Data>
                <DisplayBalance amount={auction.minBid || 0} />
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
                <DisplayBalance amount={auction.insuranceAmount || 0} />
              </Data>
            </Field>
          </React.Fragment>
        )}
      </EditableBox>
      <EditableBox>
        <Field>
          <Label>{t('tokenId')}</Label>
          <Data>{nft.tokenId}</Data>
        </Field>
        <Line />
        <Field>
          <Label>{t('contractAddressAttribute')}</Label>
          <Data>{auction.nFTContractAddress}</Data>
        </Field>
      </EditableBox>
    </React.Fragment>
  )
}

export default AuctionBoxes
