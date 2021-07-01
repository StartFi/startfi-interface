import MintingCongrats from 'components/MintingCongrats/mintingCongrats'
import MintNFT from 'components/MintNFT'
import React from 'react'
import { Route } from 'react-router-dom'

const Mint: React.FC = () => {
  return (
    <React.Fragment>
      <Route  path="/mint/minting" component={MintNFT} />
      <Route  path="/mint/draft/:draftId" component={MintNFT} />
      <Route path="/mint/minted" component={MintingCongrats} />
    </React.Fragment>
  )
}

export default Mint
