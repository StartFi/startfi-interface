import React, { useEffect, useState } from 'react'
import InputSTFI from '../../UI/Inputs/InputSTFI'
import { useAddAuction } from 'state/marketplace/hooks'

import { Input } from 'UI/Inputs'

const AuctionSale: React.FC = () => {
  const { auction, handleChange, missing } = useAddAuction()
  // const
  const [requiredStakes, setRequiredStakes] = useState(0)
  const listQualifyPercentage = 1
  const base = 100
  console.log(auction)
  useEffect(() => {
    const listingPrice =auction?.listingPrice||0
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

      <Input
        question='requiredStakedDesc'
        name='requiredStack'
        label='Required Stack'
        value={requiredStakes}
        onChange={handleChange}
        number
      />
    </React.Fragment>
  )
}

export default AuctionSale
