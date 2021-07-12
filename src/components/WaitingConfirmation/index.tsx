import React from 'react'
import { useTranslation } from 'react-i18next'
import { useAuctionNFT, useWalletConfirmation } from 'state/marketplace/hooks'
import styled from 'styled-components'
import { shortenAddress } from 'utils'
import Loading from './../../assets/icons/loading.svg'

export const WhiteShadow = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.82);
  z-index: 999;
`

export const WalletConfirmationContainer = styled.div`
  width: 32vw;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #ffffff;
  border: 1px solid #f2f2f2;
  box-shadow: 0px 4px 30px 3px rgba(0, 0, 0, 0.21);
  border-radius: 8px;
  z-index: 9999;
  text-align: center;
  padding: 3vh 0;
`

const TopPadding = styled.div`
  padding-top: 8vh;
`

export const SidePadding = styled.div`
  padding: 0 3vw;
`

const LoadingIcon = styled.img`
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;

  /* Safari */
  @-webkit-keyframes spin {
    0% {
      -webkit-transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
    }
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`

const Text = styled.div`
  font-weight: 500;
  font-size: 18px;
  letter-spacing: 0.04em;
  color: #000000;
  padding: 4vh 0 8vh 0;
`

const Footer = styled.div`
  font-size: 16px;
  letter-spacing: 0.04em;
  color: #000000;
`

const WaitingConfirmation: React.FC = () => {
  const { t } = useTranslation()

  const auctionNFT = useAuctionNFT()

  const confirmation = useWalletConfirmation()

  if (!confirmation) return null

  const { ownername, nft } = auctionNFT || {
    ownername: 'START FI',
    nft: { owner: '0xB3ba5E634F5a4B3EeD7ecFa59417E6fee4dcAF43' }
  }

  return (
    <React.Fragment>
      <WhiteShadow />
      <WalletConfirmationContainer>
        <SidePadding>
          <TopPadding />
          <LoadingIcon src={Loading} alt="Loading" />
          <Text>{t(`waitingConfirmation`, { confirmation, ownername, owner: shortenAddress(nft.owner, 6) })}</Text>
          <Footer>{t('confirmTransactionInWallet')}</Footer>
        </SidePadding>
      </WalletConfirmationContainer>
    </React.Fragment>
  )
}

export default WaitingConfirmation
