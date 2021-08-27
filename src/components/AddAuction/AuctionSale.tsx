import React from 'react'
import { Input } from 'components/Input'
import { useTranslation } from 'react-i18next'
import { GetStakes, Stakes } from '../MintCard.tsx/styles'
import InputSTFI from 'components/Input/InputSTFI'
import { useAddAuction } from 'state/marketplace/hooks'
import { useHistory } from 'react-router-dom'

const AuctionSale: React.FC = () => {
  const { t } = useTranslation()

  const { auction, handleChange, missing } = useAddAuction()
  const history = useHistory()

  return (
    <React.Fragment>
      <InputSTFI
        name="listingPrice"
        label="NFTprice"
        value={auction.listingPrice || 1}
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
        <GetStakes onClick={() => history.push('/marketplace/stakeTokens')}>{t('getStakes')}</GetStakes>
      </Stakes>
    </React.Fragment>
  )
}

export default AuctionSale
