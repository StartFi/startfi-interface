import React from 'react'
import { useTranslation } from 'react-i18next'
import { useMinted, useNFT, useSteps } from 'state/marketplace/hooks'
import { MarginLeft } from 'components/NFTConfirm/styles'
import Minted from '../AddNFT/Minted'
import { Container, Card, Columns, Left, Name, Prepare, PaymentModal } from './styles'
import { WhiteShadow } from 'components/WaitingConfirmation/styles'
import NFTBoxes from './NFTBoxes'
import AuctionBoxes from './AuctionBoxes'
import Footer from './Footer'
import PaymentCard from './PaymentCard'
import Question from 'components/Input/Question'
import { useUserAddress } from 'state/user/hooks'
import { ConnectWallet } from 'components/Header/styles'
import { STEP } from 'state/marketplace/types'

const NFTSummary: React.FC = () => {
  const { t } = useTranslation()

  const minted = useMinted()

  const address = useUserAddress()

  const nft = useNFT()

  const { step, nftOrAuction } = useSteps()

  if (!nft) return null


  return (
    <Container>
      {!address && <ConnectWallet>{t('marketplaceConnectWallet')}</ConnectWallet>}
      {(step === STEP.ALLOW_MONETIZING || step === STEP.ADD_AUCTION) && (
        <React.Fragment>
          <WhiteShadow />
          <PaymentModal>
            <PaymentCard />
          </PaymentModal>
        </React.Fragment>
      )}
      {minted && <Minted />}
      <Prepare>
        {t(
          step === STEP.NFT_SUMMARY
            ? 'prepareNFT'
            : step === STEP.AUCTION_SUMMARY
            ? 'monetizingYourAssets'
            : 'digitizeAsset'
        )}
        {(step === STEP.ALLOW_TRANSFER || step === STEP.ADD_NFT) && (
          <Question text="digitizeAssetDesc" tooltipWidth="40vw" />
        )}
      </Prepare>
      <Card>
        <Name>{nft.name}</Name>
        <Columns>
          <Left>
            <NFTBoxes />
            {!nftOrAuction && <AuctionBoxes />}
            {(step === STEP.NFT_SUMMARY || step === STEP.AUCTION_SUMMARY) && <Footer />}
          </Left>
          {(step === STEP.ALLOW_TRANSFER || step === STEP.ADD_NFT) && (
            <MarginLeft marginLeft="3vw">
              <PaymentCard />
            </MarginLeft>
          )}
        </Columns>
      </Card>
    </Container>
  )
}

export default NFTSummary
