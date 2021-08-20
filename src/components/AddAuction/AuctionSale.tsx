import React from 'react'
import { Input } from 'components/Input'
import { useTranslation } from 'react-i18next'
import { GetStakes, Stakes } from '../MintCard.tsx/styles'
import InputSTFI from 'components/Input/InputSTFI'
import { useAddAuction } from 'state/marketplace/hooks'

const AuctionSale: React.FC = () => {
  const { t } = useTranslation()

  const { auction, handleChange, missing } = useAddAuction()

  return (
    <React.Fragment>
      <InputSTFI
        name="listingPrice"
        label="NFTprice"
        value={auction.listingPrice || 0}
        onChange={handleChange}
        error={missing.includes('listingPrice')}
      />
      <Stakes>
        <Input
          name="requiredStakes"
          label="requiredStakes"
          value={auction.requiredStakes}
          onChange={handleChange}
          question="requiredStakedDesc"
          error={missing.includes('requiredStakes')}
          number
        />
        <GetStakes>{t('getStakes')}</GetStakes>
      </Stakes>
    </React.Fragment>
  )
}

export default AuctionSale
