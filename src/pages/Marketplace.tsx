import NFTsHeader from 'components/Header/NFTsHeader'
import NFTConfirm from 'components/NFTConfirm'
import Nftproduct from 'components/NFTproduct/Nftproduct'
import React from 'react'
import { Route } from 'react-router-dom'
import styled from 'styled-components'
import NFTs from './NFTs'

const MarketplaceWrapper = styled.div`
  padding: 4vh 3.2vw;
  width: 100%;
  z-index: 1;
`

const Marketplace: React.FC = () => {
  return (
    <MarketplaceWrapper>
      <NFTsHeader />
      <Route path="/marketplace/nfts" component={NFTs} />
      <Route path="/marketplace/nft/:nft/:auction" component={Nftproduct} />
      <Route path="/marketplace/buyorbid" component={NFTConfirm} />
    </MarketplaceWrapper>
  )
}

export default Marketplace
