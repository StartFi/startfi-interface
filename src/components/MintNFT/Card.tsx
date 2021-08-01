import React, { useCallback, useEffect, useState } from 'react'
import { ButtonDraft, ButtonMint, ButtonMintBack } from 'components/Button'
import styled from 'styled-components'
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'
import Step7 from './Step7'
import Step1Icon from './../../assets/icons/step1.svg'
import Step2Icon from './../../assets/icons/step2.svg'
import Step3Icon from './../../assets/icons/step3.svg'
import { useTranslation } from 'react-i18next'
import { useSaveDraft } from 'state/user/hooks'
import { NFT } from 'services/models/NFT'
import { Row } from 'theme/components'
import { usePopup } from 'state/application/hooks'
import { useHistory } from 'react-router-dom'
import { useAuction, useNFT, useSaveAuction, useSaveNFT } from 'state/marketplace/hooks'
import { Auction } from 'services/models/Auction'
import { address as STARTFI_NFT_ADDRESS } from '../../constants/abis/StartfiRoyaltyNFT.json'
const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  height: 100%;
`

const Header = styled(Row)`
  align-items: flex-start;
`

const Title = styled.div`
  text-transform: uppercase;
`

const Underline = styled.hr`
  margin-top: 2vh;
  width: 3vw;
  height: 0.3vh;
  text-align: left;
  margin-left: 0;
  background-color: ${({ theme }) => theme.black};
`

const Footer = styled.div`
  align-self: flex-end;
  margin-top: auto;
`
interface CardProps {
  currentStep?: number
  draft: NFT
  offMarketNft: NFT
}

const Card: React.FC<CardProps> = ({ currentStep, draft, offMarketNft }) => {
  const { t } = useTranslation()

  const history = useHistory()

  const saveDraft = useSaveDraft()

  const saveNFT = useSaveNFT()

  const saveAuction = useSaveAuction()

  const savedNFT = useNFT()

  const savedAuction = useAuction()

  const [nft, setNFT] = useState<NFT>(
    savedNFT || {
      id: 0, //faker.number({ min: 5, max: 5 }),
      // uuid: faker.uuid(),
      category: '',
      dataHash: '',
      name: '',
      tags: [],
      description: '',
      owner: '',
      issuer: '',
      issueDate: new Date(),
      txtHash: '',
      royalty: 0,
      filename: '',
      chainId: 0
    }
  )

  const [auction, setAuction] = useState<Auction>(
    savedAuction || {
      id: 'string',
      contractAddress: STARTFI_NFT_ADDRESS,
      nft:'0',
      listingPrice: 0,
      seller: '',
      expireTimestamp: 0,
      isForSale: false,
      isForBid: false,
      bids: [],
      listTime: new Date(),
      listingTxt: '',
      status: 'open',
      minBid: 0,
      qualifyAmount: 0,
      chainId: 0
    }
  )

  const [missing, setMissing] = useState<string[]>([])

  const [step, setStep] = useState<number>(currentStep || 1)

  const popup = usePopup()

  const handleChange = useCallback(
    (e: any) => {
      if (e.persist) e.persist()
      if (e.target.name === 'royalty' && parseInt(e.target.value) > 100) return
      if (e.target.value)
        setMissing(missing => {
          const newMissing = [...missing]
          newMissing.splice(newMissing.indexOf(e.target.name), 1)
          return newMissing
        })
      else
        setMissing(missing => {
          if (missing.includes(e.target.name)) return missing
          return [...missing, e.target.name]
        })
      setNFT(nft => {
        return { ...nft, [e.target.name]: e.target.value }
      })
    },
    [setNFT]
  )

  const next = () => {
    const newMissing: string[] = []
    Object.keys(nft).forEach((key: string) => (nft[key] ? null : newMissing.push(key)))
    switch (step) {
      case 1:
        if (['category', 'dataHash'].filter(f => newMissing.includes(f)).length === 0) {
          setMissing([])
          return setStep(2)
        }
        break
      case 2:
        if (['name', 'description'].filter(f => newMissing.includes(f)).length === 0) {
          setMissing([])
          return setStep(3)
        }
        break
      case 3:
        setMissing([])
        saveNFT(nft)
        return history.push('summary')
      case 7:
        const { isForSale, listingPrice, isForBid, minBid, qualifyAmount, expireTimestamp } = auction
        if (
          (isForSale && listingPrice > 0) ||
          (isForBid && minBid && minBid > 0 && qualifyAmount && qualifyAmount > 0 && expireTimestamp > 0)
        ) {
          saveAuction(auction)
          return history.push('summary')
        }
        break
      default:
    }
    setMissing(newMissing)
  }

  const StepIcon = () => {
    switch (step) {
      case 1:
        return Step1Icon
      case 2:
        return Step2Icon
      case 3:
        return Step3Icon
      case 7:
        return
      default:
    }
    return Step1Icon
  }

  const Step = () => {
    switch (step) {
      case 1:
        return <Step1 state={nft} handleChange={handleChange} missing={missing} />
      case 2:
        return <Step2 state={nft} handleChange={handleChange} missing={missing} />
      case 3:
        return <Step3 state={nft} handleChange={handleChange} missing={missing} />
      case 7:
        return <Step7 auction={auction} setAuction={setAuction} />
      default:
        return null
    }
  }

  useEffect(() => {
    if (draft) {
      setNFT(draft)
      setStep(2)
    }
    if (offMarketNft) {
      setNFT(offMarketNft)
      setStep(7)
    }
  }, [draft, offMarketNft])

  return (
    <Container>
      <Header>
        <div>
          <Title>{t('mintNFTTitle')}</Title>
          <h3>{step}</h3>
          <Underline />
        </div>
        {StepIcon() && <img src={StepIcon()} alt="Step" />}
      </Header>
      {Step()}
      <Footer>
        <ButtonMintBack onClick={() => (step > 1 && step < 4 ? setStep(step - 1) : null)}>{t('back')}</ButtonMintBack>
        <ButtonDraft  
          onClick={() =>
            step < 2 
            ? popup({ success: false, message :t('cannotAddDraft') }): 
            step < 4
              ? nft.category || nft.dataHash || nft.name || nft.description
                ? saveDraft(nft)
                : popup({ success: false, message: 'noEnteredData' })
              : history.push('/inventory/off-market/' + nft.id)
          }
        >
          {t(step === 7 ? 'saveAtOffMarketplace' : 'saveDraft')}
        </ButtonDraft>
        <ButtonMint onClick={() => next()}>{t(step !== 3 ? 'next' : 'submit')}</ButtonMint>
      </Footer>
    </Container>
  )
}

export default Card
