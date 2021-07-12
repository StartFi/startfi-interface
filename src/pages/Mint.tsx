import MintingCongrats from 'components/MintingCongrats/mintingCongrats'
import MintNFT from 'components/MintNFT'
import Header from 'components/MintNFT/Header'
import NFTSummary from 'components/MintNFT/NFTSummary'
import React from 'react'
import { Route } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
  background-color: #fafafa;
  padding: 4vh 3.2vw;
`

const Mint: React.FC = () => {
  return (
    <Container>
      <Header />
      <Route path="/mint/steps" component={MintNFT} />
      <Route path="/mint/summary" component={NFTSummary} />
      <Route path="/mint/minted" component={MintingCongrats} />
    </Container>
  )
}

export default Mint
