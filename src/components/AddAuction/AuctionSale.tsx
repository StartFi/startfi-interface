import React from 'react'
import InputSTFI from '../../UI/Inputs/InputSTFI'
import { useAddAuction } from 'state/marketplace/hooks'

const AuctionSale: React.FC = () => {
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
    </React.Fragment>
  )
}

export default AuctionSale
