import React from 'react'
import InputSTFI from 'components/Input/InputSTFI'
import OpenFor from './OpenFor'
import { useAddAuction } from 'state/marketplace/hooks'

const AuctionBid: React.FC = () => {
  const { auction, handleChange } = useAddAuction()

  return (
    <React.Fragment>
      <InputSTFI name="minBid" label="minBid" value={auction.minBid || 0} onChange={handleChange} />
      <OpenFor />
      <InputSTFI
        question="qualifyAmountDesc"
        name="qualifyAmount"
        label="qualifyAmount"
        value={auction.qualifyAmount || 0}
        onChange={handleChange}
      />
    </React.Fragment>
  )
}

export default AuctionBid
