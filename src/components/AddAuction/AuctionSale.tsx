import React, { useEffect, useState } from 'react'
import InputSTFI from '../../UI/Inputs/InputSTFI'
import { useAddAuction } from 'state/marketplace/hooks'
import { Input } from 'UI/Inputs'
import { NoStakes, GetNow } from 'components/NFTproduct/Nftproduct.styles'
import { useTranslation } from 'react-i18next'
import { AutoRow } from 'UI/Row'
import { useHistory } from 'react-router-dom'
import { useNeedMoreStack } from 'state/user/hooks'

const AuctionSale: React.FC = () => {
  const { t } = useTranslation()
  const { auction, handleChange, missing } = useAddAuction()
  const history = useHistory()
  const [requiredStakes, setRequiredStakes] = useState(0)

  const listQualifyPercentage = 1
  const base = 100
  console.log(auction)
  useEffect(() => {
    const listingPrice = auction?.listingPrice || 0
    if (auction) {
      setRequiredStakes((listingPrice * listQualifyPercentage) / base)
    }
  }, [auction])

  return (
    <React.Fragment>
      <InputSTFI
        name='listingPrice'
        label='NFTprice'
        value={auction.listingPrice || 0}
        onChange={handleChange}
        error={missing.includes('listingPrice')}
      />

      <AutoRow>
        <Input
          question='requiredStakedDesc'
          name='requiredStack'
          label='Required Stack'
          value={requiredStakes}
          onChange={handleChange}
          number
        />

        <GetNow onClick={() => history.push('/marketplace/stakeTokens')}>{t('getNow')}</GetNow>
      </AutoRow>
      {useNeedMoreStack(requiredStakes) && <NoStakes margin='10px 0px 0px 0px'>{t('needsMoreStakes')}</NoStakes>}
    </React.Fragment>
  )
}

export default AuctionSale
