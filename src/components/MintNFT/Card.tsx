import React, { useCallback, useEffect, useState } from 'react'
import { ButtonDraft, ButtonMint, ButtonMintBack } from 'components/Button'
import styled from 'styled-components'
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'
import Step1Icon from './../../assets/icons/step1.svg'
import Step2Icon from './../../assets/icons/step2.svg'
import Step3Icon from './../../assets/icons/step3.svg'
import { useTranslation } from 'react-i18next'
import { useMintNFT } from 'state/marketplace/hooks'
import { useSaveDraft } from 'state/user/hooks'
import { NFT } from 'services/models/NFT'
import { Row } from 'theme/components'
import { usePopup } from 'state/application/hooks'
// import uriToHttp from 'utils/uriToHttp'
import * as faker from 'faker';


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

interface MintCardProps {
  draft: NFT
}

const Card: React.FC<MintCardProps> = ({ draft }) => {
  console.log('card draft', draft)
  const { t } = useTranslation()

  const mintNFT = useMintNFT()

  const saveDraft = useSaveDraft()

  const [nft, setNFT] = useState<NFT>({
    id: faker.random.number(),
    category: '',
    dataHash: '',
    name: '',
    tags: [],
    description: '',
    owner: '',
    issuer: '',
    issueDate: new Date(),
    txtHash: '',
    royalty: 0
  })

  // const [imgUrl,setImgUrl]=useState('')

  const [missing, setMissing] = useState<string[]>([])

  const [step, setStep] = useState<number>(1)

  const popup = usePopup()

  const handleChange = useCallback(
    (e: any) => {
      if (e.persist) e.persist()
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
        if (['category', 'image'].filter(f => newMissing.includes(f)).length === 0) {
          setMissing([])
          return setStep(2)
        }
        break
      case 2:
        if (['name', 'description'].filter(f => newMissing.includes(f)).length === 0) {
          setMissing([])
          mintNFT(nft)
        }
        break
      case 3:
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
      default:
    }
    return Step1Icon
  }

  useEffect(() => {
    if (draft) {
      setNFT(draft)

      // setImgUrl(uriToHttp(`${nft.image}`)[0])
    }

  }, [draft])
  console.log('nft',nft);

  return (
    <Container>
      <Header>
        <div>
          <Title>{t('mintNFTTitle')}</Title>
          <Underline />
        </div>
        <img src={StepIcon()} alt='Step' />
      </Header>

      {step === 1 ? (
        <Step1 state={nft}  draft={draft} handleChange={handleChange} missing={missing} />
      ) : step === 2 ? (
        <Step2 state={nft} handleChange={handleChange} missing={missing} />
      ) : (
        <Step3 state={nft} handleChange={handleChange} missing={missing} />
      )}
      <Footer>
        <ButtonMintBack onClick={() => (step > 1 ? setStep(step - 1) : null)}>{t('back')}</ButtonMintBack>
        {!draft?(
           <ButtonDraft
           onClick={() =>
             nft.category || nft.image || nft.name || nft.description
               ? saveDraft(nft)
               : popup({ success: false, message: 'No data entered to save' })
           }
         >
           {t('saveDraft')}
         </ButtonDraft>

        ):null}

        <ButtonMint onClick={() => next()}>{t(step === 1 ? 'next' : 'submit')}</ButtonMint>
      </Footer>
    </Container>
  )
}

export default Card
