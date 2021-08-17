import React from 'react'
import { QualifyAmount } from '../MintCard.tsx/styles'
import InputSTFI from 'components/Input/InputSTFI'
import OpenFor from './OpenFor'
import { useAddAuction } from 'state/marketplace/hooks'

const AuctionBid: React.FC = () => {
  const { auction, handleChange } = useAddAuction()

  return (
    <React.Fragment>
      <QualifyAmount>
        <InputSTFI name="minBid" label="minBid" value={auction.minBid || 0} onChange={handleChange} />
      </QualifyAmount>
      <OpenFor />
      <QualifyAmount>
        <InputSTFI
          question="qualifyAmountDesc"
          name="qualifyAmount"
          label="qualifyAmount"
          value={auction.qualifyAmount || 0}
          onChange={handleChange}
        />
      </QualifyAmount>
    </React.Fragment>
  )
}

export default AuctionBid
