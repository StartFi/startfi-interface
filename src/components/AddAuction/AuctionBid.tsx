import React from 'react'
import InputSTFI from 'components/Input/InputSTFI'
import OpenFor from './OpenFor'
import { useAddAuction } from 'state/marketplace/hooks'

const AuctionBid: React.FC = () => {
  const { auction, handleChange, missing } = useAddAuction()

  return (
    <React.Fragment>
      <InputSTFI
        name="minBid"
        label="minBid"
        value={auction.minBid || 1}
        onChange={handleChange}
        error={missing.includes('minBid')}
      />
      <OpenFor />
      <InputSTFI
        question="qualifyAmountDesc"
        name="qualifyAmount"
        label="qualifyAmount"
        value={auction.qualifyAmount || 2}
        onChange={handleChange}
        error={missing.includes('qualifyAmount')}
      />
    </React.Fragment>
  )
}

export default AuctionBid
