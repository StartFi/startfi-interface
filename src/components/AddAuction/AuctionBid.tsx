import React from 'react'
import InputSTFI from 'UI/Inputs/InputSTFI'
import OpenFor from './OpenFor'
import { useAddAuction } from 'state/marketplace/hooks'

const AuctionBid: React.FC = () => {
  const { auction, handleChange, missing } = useAddAuction()
  if (!process.env.REACT_APP_MIN_QUALIFY_AMOUNT) {
    console.log('No min qualify amount in env')
    return null
  }
  const minQualify = parseInt(process.env.REACT_APP_MIN_QUALIFY_AMOUNT)

  return (
    <React.Fragment>
      <InputSTFI
        name="minBid"
        label="minBid"
        value={auction.minBid || 0}
        onChange={handleChange}
        error={missing.includes('minBid')}
      />
      <OpenFor />
      <InputSTFI
        question="qualifyAmountDesc"
        name="qualifyAmount"
        label="qualifyAmount"
        value={auction.insuranceAmount || 0}
        onChange={handleChange}
        error={
          missing.includes('qualifyAmount') ||
          (auction.insuranceAmount !== undefined && auction.insuranceAmount < minQualify)
        }
      />
    </React.Fragment>
  )
}

export default AuctionBid
