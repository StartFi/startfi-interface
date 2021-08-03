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
  loader?: boolean
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

  const minted = useMinted()

  const fees = useDigitizingFees()

  const allowedSTFI = useAllowedSTFI()

  const allowed = useAllowed()

  const [agree, setAgree] = useState<boolean>(false)

  const [loader, setLoader] = useState<boolean>(false)

  if (!nft) return null

  const next = () => {
    switch (step) {
      case 4:
          return agree ? setStep(allowedSTFI ? 6 : 5) : null
      case 5:
          setLoader(true)
          approveToken(STARTFI_NFT_PAYMENT_ADDRESS, fees).then(() => {
            setStep(6)
            setLoader(false)    
          })
        break; 
      case 6:
        return mint()
      case 8:
        return setStep(allowed ? 10 : 9)
      case 9:
        if (!allowed) {
          setLoader(true)
          approve(STARTFI_Marketplace_ADDRESS, nft.id).then(()=>{
            setStep(10)
            setLoader(false)    
          })
        }
        break;
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
            <PaymentCard step={step} next={next} loader={loader}/>
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
            <PaymentCard step={step} next={next} loader={loader}/>
            </MarginLeft>
          )}
        </Columns>
      </Card>
    </Container>
  )
}

export default NFTSummary
