import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useAddToMarketplace, useAuction, useMinted, useMintNFT, useNFT } from 'state/marketplace/hooks'
import { MarginLeft } from 'components/NFTConfirm/styles'
import Minted from '../MintNFT/Minted'
import { Container, Card, Columns, Left, Name, Prepare, PaymentModal } from './styles'
import { WhiteShadow } from 'components/WaitingConfirmation/styles'
import { address as STARTFI_NFT_PAYMENT_ADDRESS } from '../../constants/abis/StartFiNFTPayment.json'
import { useApproveToken, useGetAllowance } from 'hooks/startfiToken'
import { address as STARTFI_Marketplace_ADDRESS } from '../../constants/abis/StartFiMarketPlace.json'
import { useApproveNft, useGetApproverAddress, useGetNftOwner } from 'hooks/startfiNft'
import NFTBoxes from './NFTBoxes'
import AuctionBoxes from './AuctionBoxes'
import Footer from './Footer'
import PaymentCard from './PaymentCard'
import Question from 'components/Input/Question'
import { useWeb3React } from '@web3-react/core'

export interface NFTSummaryProps {
  step: number
  next?: () => void
}

const NFTSummary: React.FC = () => {
  const { account } = useWeb3React()

  const approveToken = useApproveToken()

  const getOwnerAddress = useGetNftOwner()

  const approve = useApproveNft()

  const { t } = useTranslation()

  const nft = useNFT()

  const auction = useAuction()

  const [step, setStep] = useState<number>(auction ? 8 : 4)

  const mint = useMintNFT()

  const addToMarketplace = useAddToMarketplace()

  const [agree, setAgree] = useState<boolean>(false)

  const minted = useMinted()

  const getApproverAddress = useGetApproverAddress()

  const getAllowedStfi = useGetAllowance()

  const [allowedStfi, setAllowedStfi] = useState<number>(0)

  const [allowed, setAllowed] = useState<boolean>(false)

  useEffect(() => {
    const getNFTAllowed = async () => {
      // const approver = await getApproverAddress(nft?.tokenId  as number)
      console.log(nft, 'nft')
      // temporary until tokeinId issue is fixed
      const tokenId = nft?.tokenId ? nft?.tokenId : 1
      const owner = await getApproverAddress(tokenId)
      if (owner === account) {
        const approver = await getApproverAddress(tokenId)
        console.log(approver, 'approver')

        if (approver === (STARTFI_Marketplace_ADDRESS as any)) {
          setAllowed(true)
        }
      }
    }
    account && getNFTAllowed()
  }, [allowed, account, nft, getApproverAddress])
  
  useEffect(() => {
    const getAllowed = async () => {
      const allowedHexString = await getAllowedStfi(account as string, STARTFI_NFT_PAYMENT_ADDRESS)
      console.log({ allowedHexString })
      const allowed = allowedHexString?.length < 5 ? parseInt(allowedHexString, 16) : allowedHexString
      setAllowedStfi(allowed)
    }
    account && getAllowed()
  }, [account, getAllowedStfi])

  if (!nft) return null

  const next = async () => {
    switch (step) {
      case 4:
        if (agree) {
          console.log({ allowedStfi })
          if (allowedStfi) {
            setStep(step + 2)
          } else {
            setStep(step + 1)
          }
        }
        return null
      case 5:
        await approveToken(STARTFI_NFT_PAYMENT_ADDRESS, 5)
        return setStep(step + 1)
      case 6:
        return mint()
      case 8:
        return !allowed ? setStep(step + 1) : setStep(step + 2)
      case 9:
        if (!allowed) {
          const tokenId = nft?.tokenId ? nft?.tokenId : 1

          await approve(STARTFI_Marketplace_ADDRESS, tokenId)
          // await approve(STARTFI_Marketplace_ADDRESS,nft.id);
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
            <PaymentCard step={step} next={next} allowedStfi={allowedStfi} allowed={allowed}/>
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
            <PaymentCard step={step} next={next} allowedStfi={allowedStfi} allowed={allowed}/>
            </MarginLeft>
          )}
        </Columns>
      </Card>
    </Container>
  )
}

export default NFTSummary
