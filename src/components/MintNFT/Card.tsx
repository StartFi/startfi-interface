import React, { useState } from 'react'
import { Box } from '@material-ui/core'
import { Dictionary } from '../../constants'
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

  const { t } = useTranslation()

  const addnft = useAddNFT()

  const [state, setState] = useState<Dictionary>({
    category: '',
    file: null,
    name: '',
    tags: '',
    description: '',
    price: 0,
    bidsoffers: 'false',
    bid: 0,
    type: 'Day'
  })

  const [missing, setMissing] = useState<string[]>([])

  const [step, setStep] = useState<number>(1)

  const handleChange = (e: any) =>
    setState({ ...state, [e.target.name]: e.target.type === 'file' ? e.target.files[0] : e.target.value })

  const next = () => {
    var newMissing: string[] = []
    Object.keys(state).forEach((key: string) => (state[key] ? null : newMissing.push(key)))
    switch (step) {
      case 1:
        if (['category', 'file'].filter(f => newMissing.includes(f)).length === 0) {
          setMissing([])
          return setStep(2)
        }
        break
      case 2:
        if (['name', 'tags', 'description'].filter(f => newMissing.includes(f)).length === 0) {
          setMissing([])
          return setStep(3)
        }
        break
      case 3:
        history.push('/mintednft')
        console.log(state)
        addnft({
          id: 0,
          owner: '',
          issueDate: 0,
          onAuction: state.bidsoffers,
          name: state.name,
          image: state.filehash,
          price: state.price,
          category: state.category,
          description: state.description
        })
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
        <Box>
          <Title>{t('mintNFTTitle')}</Title>
          <Underline />
        </Box>
        <img src={StepIcon()} alt="Step" />
      </Header>
      {step === 1 ? (
        <Step1 state={state} handleChange={handleChange} missing={missing} />
      ) : step === 2 ? (
        <Step2 state={state} handleChange={handleChange} missing={missing} />
      ) : (
        <Step3 state={state} handleChange={handleChange} missing={missing} />
      )}
      <Footer>
        <ButtonMintBack>{t('back')}</ButtonMintBack>
        <ButtonDraft>{t('saveDraft')}</ButtonDraft>
        <ButtonMint onClick={() => next()}>{t('next')}</ButtonMint>
      </Footer>
    </Container>
  )
}

export default Card
