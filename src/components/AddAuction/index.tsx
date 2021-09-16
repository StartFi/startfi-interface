import React from 'react'
import { useTranslation } from 'react-i18next'
import { Font500, Font700, Note } from '../MintCard.tsx/styles'
import InputSTFI from 'UI/Inputs/InputSTFI'
import AuctionSale from './AuctionSale'
import AuctionBid from './AuctionBid'
import ChooseType from './ChooseType'
import { MarketplaceListings } from 'state/types/MarketplaceListings'
import { useAddAuction, useStep } from 'state/marketplace/hooks'
import { STEP } from 'state/marketplace/types'

const title = (step: STEP, auction: MarketplaceListings): string => {
  if (step === STEP.CHOOSE_TYPE) return 'howToMonetize'
  if (auction.isBedEnabled && auction.isSellForEnabled) return 'auctionSaleAndBidTitle'
  else if (auction.isSellForEnabled) return 'auctionSaleTitle'
  else if (auction.isBedEnabled) return 'auctionBidTitle'
  return ''
}

const AddAuction: React.FC = () => {
  const { t } = useTranslation()

  const step = useStep()

  const { auction, handleChange, missing } = useAddAuction()

  const component = (step: number, auction: MarketplaceListings) => {
    if (step === STEP.CHOOSE_TYPE) return <ChooseType />
    if (auction.isBedEnabled && auction.isSellForEnabled)
      return (
        <React.Fragment>
          <InputSTFI
            name="listingPrice"
            label="sellingPrice"
            value={auction.listingPrice || 0}
            onChange={handleChange}
            error={missing.includes('listingPrice')}
          />
          <AuctionBid />
        </React.Fragment>
      )
    if (auction.isSellForEnabled) return <AuctionSale />
    if (auction.isBedEnabled) return <AuctionBid />
    return null
  }

  return (
    <React.Fragment>
      <Font500>{t(title(step, auction))}</Font500>
      {component(step, auction)}
      {step === STEP.AUCTION_DETAILS && (
        <Note>
          <Font700>{t('note')}</Font700>
          {t('auctionNote')}
        </Note>
      )}
    </React.Fragment>
  )
}

export default AddAuction
