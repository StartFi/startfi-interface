import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useAddToMarketplace, useAuction, useMinted, useMintNFT, useNFT } from 'state/marketplace/hooks'
import { MarginLeft } from 'components/NFTConfirm/styles'
import Minted from '../MintNFT/Minted'
import { Container, Card, Columns, Left, Name, Prepare, PaymentModal } from './styles'
import { WhiteShadow } from 'components/WaitingConfirmation/styles'
import { useApproveToken } from 'hooks/startfiToken'
import { useApproveNft } from 'hooks/startfiNft'
import NFTBoxes from './NFTBoxes'
import AuctionBoxes from './AuctionBoxes'
import Footer from './Footer'
import PaymentCard from './PaymentCard'
import Question from 'components/Input/Question'
import { useDigitizingFees } from 'hooks'
import { useAllowedSTFI } from 'hooks/useAllowedSTFI'
import { useAllowed } from 'hooks/useAllowed'
import { address as STARTFI_NFT_PAYMENT_ADDRESS } from '../../constants/abis/StartFiNFTPayment.json'
import { address as STARTFI_Marketplace_ADDRESS } from '../../constants/abis/StartFiMarketPlace.json'

export interface NFTSummaryProps {
  step: number
  next?: () => void
}

const NFTSummary: React.FC = () => {
  const approveToken = useApproveToken()

  const approve = useApproveNft()

  const { t } = useTranslation()

  const nft = useNFT()

  const auction = useAuction()

  const [step, setStep] = useState<number>(auction ? 8 : 4)

  const mint = useMintNFT()

  const addToMarketplace = useAddToMarketplace()

  const [agree, setAgree] = useState<boolean>(false)

  const minted = useMinted()

  const fees = useDigitizingFees()

  const allowedStfi = useAllowedSTFI()

  const allowed = useAllowed()

  if (!nft) return null

  const next = async () => {
    switch (step) {
      case 4:
        if (agree) {
          if (allowedStfi) {
            setStep(step + 2)
          } else {
            setStep(step + 1)
          }
        }
        return null
      case 5:
        await approveToken(STARTFI_NFT_PAYMENT_ADDRESS, fees)
        return setStep(step + 1)
      case 6:
        return mint()
      case 8:
        return !allowed ? setStep(step + 1) : setStep(step + 2)
      case 9:
        if (!allowed) {
          const tokenId = nft?.tokenId ? nft?.tokenId : 1
          await approve(STARTFI_Marketplace_ADDRESS, tokenId)
        }
        return setStep(step + 1)
      case 10:
        return addToMarketplace()
      default:
    }
  }

  return (
    <Container>
      {(step === 9 || step === 10) && (
        <React.Fragment>
          <WhiteShadow />
          <PaymentModal>
            <PaymentCard step={step} next={next}/>
          </PaymentModal>
        </React.Fragment>
      )}
      {minted && <Minted />}
      <Prepare>
        {t(step === 4 ? 'prepareNFT' : step === 8 ? 'monetizingYourAssets' : 'digitizeAsset')}
        {(step === 5 || step === 6) && <Question text="digitizeAssetDesc" tooltipWidth="40vw" />}
      </Prepare>
      <Card>
        <Name>{nft.name}</Name>
        <Columns>
          <Left>
            <NFTBoxes step={step} />
            <AuctionBoxes step={step} />
            {(step === 4 || step === 8) && (
              <Footer step={step} agree={agree} onAgree={() => setAgree(!agree)} next={next} />
            )}
          </Left>
          {(step === 5 || step === 6) && (
            <MarginLeft>
            <PaymentCard step={step} next={next}/>
            </MarginLeft>
          )}
        </Columns>
      </Card>
    </Container>
  )
}

export default NFTSummary
