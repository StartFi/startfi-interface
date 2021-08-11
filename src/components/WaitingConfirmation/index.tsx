import React from 'react'
import { useTranslation } from 'react-i18next'
import { useAuctionNFT, useWalletConfirmation } from 'state/marketplace/hooks'
import { shortenAddress } from 'utils'
import Loading from './../../assets/icons/loading.svg'
import {
  Footer,
  LoadingIcon,
  WhiteShadow,
  SidePadding,
  Text,
  TopPadding,
  WalletConfirmationContainer
} from './styles'

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

export default WaitingConfirmation;
