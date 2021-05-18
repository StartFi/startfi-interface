import React, { Suspense } from 'react'
import {  Route, Switch } from 'react-router-dom'
import styled from 'styled-components'
import GoogleAnalyticsReporter from '../components/analytics/GoogleAnalyticsReporter'
import Header from '../components/Header'
import Polling from '../components/Header/Polling'
import URLWarning from '../components/Header/URLWarning'
import Popups from '../components/Popups'
import Web3ReactManager from '../components/Web3ReactManager'
// import { ApplicationModal } from '../state/application/actions'
// import { useModalOpen, useToggleModal } from '../state/application/hooks'
import DarkModeQueryParamReader from '../theme/DarkModeQueryParamReader'

//  for  Card testing
// import NTFCard from '../components/NFTcard/nftcard'
// import { NftCardContent } from 'components/NFTcard/nftcard.interface';
import Nftproduct from 'components/NFTproduct/Nftproduct'

// DEMO NTF CARD CONTENT
// const nftCrd: NftCardContent = {
//   ntfImg: 'https://picsum.photos/200',
//   title: 'Apple Watch Series 4 GPS',
//   price: '16 ETH',
//   description: 'Redesigned from scratch and completely revised'
// }

const AppWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  overflow-x: hidden;
`

const HeaderWrapper = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  width: 100%;
  justify-content: space-between;
`

const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-top: 100px;
  align-items: center;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 10;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    padding: 16px;
    padding-top: 2rem;
  `};

  z-index: 1;
`

const Marginer = styled.div`
  margin-top: 5rem;
`

export default function App() {
  // for testing only
  // const navigateToCard = (card: NftCardContent) => {console.log(card)}

  return (
    <Suspense fallback={null}>
      <Route component={GoogleAnalyticsReporter} />
      <Route component={DarkModeQueryParamReader} />
      <AppWrapper>
        <URLWarning />
        <HeaderWrapper>
          <Header />
        </HeaderWrapper>
        <BodyWrapper>
          <Popups />
          <Polling />

          <Web3ReactManager>
            <Switch>
              {/* testing */}
              {/* <NTFCard
                cardContent={nftCrd}
                navigateToCard={navigateToCard}
                addToWhiteList={navigateToCard}
                placeBid={navigateToCard}
              ></NTFCard> */}


                <Route path='/product' component={Nftproduct} />
                <Nftproduct/>

            </Switch>

          </Web3ReactManager>


          <Marginer />
        </BodyWrapper>

      </AppWrapper>
    </Suspense>
  )
}
