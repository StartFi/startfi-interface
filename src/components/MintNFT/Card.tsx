import React, { useCallback, useState } from 'react'
import { ButtonDraft, ButtonMint, ButtonMintBack } from 'components/Button'
import styled from 'styled-components'
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'
import { useHistory } from 'react-router'
import Step1Icon from './../../assets/icons/step1.svg'
import Step2Icon from './../../assets/icons/step2.svg'
import Step3Icon from './../../assets/icons/step3.svg'
import { useTranslation } from 'react-i18next'
import { useAddNFT } from 'state/nfts/hooks'
import { useActiveWeb3React } from 'hooks'
import { useSaveDraft } from 'state/user/hooks'
import { NFT } from 'state/nfts/reducer'

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  height: 100%;
`

const Header = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
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

const Card: React.FC = () => {
  const history = useHistory()

  const { account } = useActiveWeb3React()

  const { t } = useTranslation()

  const addNft = useAddNFT()

  const saveDraft = useSaveDraft()

  const [nft, setNFT] = useState<NFT>({
    id: 0,
    name: '',
    description: '',
    category: '',
    owner: '',
    onAuction: false,
    issuer: '',
    issueDate: new Date(),
    image: '',
    price: 0,
    hash: '',
    tags: []
  })

  const getNFT = (account: string): NFT => {
    return {
      ...nft,
      owner: account,
      issuer: account,
      issueDate: new Date()
    }
  }

  const [missing, setMissing] = useState<string[]>([])

  const [step, setStep] = useState<number>(1)

  const handleChange = useCallback(
    (e: any) => {
      if (e.persist) e.persist()
      if (e.target.value)
        setMissing(missing => {
          var newMissing = [...missing]
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
    var newMissing: string[] = []
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
          if (account) {

           

            addNft(getNFT(account))

            history.push('/mintednft')
          } else history.push('/')
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

  return (
    <Container>
      <Header>
        <div>
          <Title>{t('mintNFTTitle')}</Title>
          <Underline />
        </div>
        <img src={StepIcon()} alt="Step" />
      </Header>
      {step === 1 ? (
        <Step1 state={nft} handleChange={handleChange} missing={missing} />
      ) : step === 2 ? (
        <Step2 state={nft} handleChange={handleChange} missing={missing} />
      ) : (
        <Step3 state={nft} handleChange={handleChange} missing={missing} />
      )}
      <Footer>
        <ButtonMintBack onClick={() => (step > 1 ? setStep(step - 1) : null)}>{t('back')}</ButtonMintBack>
        <ButtonDraft
          onClick={() => {
            if (account) {
              saveDraft(getNFT(account))
              history.push('/')
            } else history.push('/')
          }}
        >
          {t('saveDraft')}
        </ButtonDraft>
        <ButtonMint onClick={() => next()}>{t('next')}</ButtonMint>
      </Footer>
    </Container>
  )
}

export default Card
