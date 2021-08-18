import MarketplaceHeader from 'components/Header/MarketplaceHeader'
import NFTConfirm from 'components/NFTConfirm'
import Nftproduct from 'components/NFTproduct/Nftproduct'
import StakeToken from 'components/StakeToken/StakeToken'
import WishList from 'components/WishList'
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
      <MarketplaceHeader />
      <Route path="/marketplace/nfts" component={NFTs} />
      <Route path="/marketplace/nft/:nft/:auction" component={Nftproduct} />
      <Route path="/marketplace/buyorbid" component={NFTConfirm} />
      <Route path="/marketplace/wishList" component={WishList} />
      <Route path="/marketplace/stakeTokens" component={StakeToken} />
    </MarketplaceWrapper>
  )
}

export default Marketplace
