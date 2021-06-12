import React, { useState } from 'react'
import { Box } from '@material-ui/core'
import { Dictionary } from '../../constants'
import { ButtonDraft, ButtonMint } from 'components/Button'
import styled from 'styled-components'
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'
import { useHistory } from 'react-router'

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
  const [state, setState] = useState<Dictionary>({
    category: '',
    file: null,
    name: '',
    details: '',
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
    const newMissing: string[] = []
    Object.keys(state).forEach((key: string) => (state[key] ? null : newMissing.push(key)))
    switch (step) {
      case 1:
        if (['category', 'file'].filter(f => newMissing.includes(f)).length === 0) {
          setMissing([])
          return setStep(2)
        }
        break
      case 2:
        if (['name', 'details', 'description'].filter(f => newMissing.includes(f)).length === 0) {
          setMissing([])
          return setStep(3)
        }
        break
      case 3:
        history.push('/mintednft')
        console.log(state)
        break
      default:
    }
    setMissing(newMissing)
  }

  return (
    <Container>
      <Header>
        <Box>
          <Title>Create nft and start earnning</Title>
          <Underline />
        </Box>
        <Box>CREATE YOUR NFT</Box>
      </Header>
      {step === 1 ? (
        <Step1 state={state} handleChange={handleChange} missing={missing} />
      ) : step === 2 ? (
        <Step2 state={state} handleChange={handleChange} missing={missing} />
      ) : (
        <Step3 state={state} handleChange={handleChange} missing={missing} />
      )}
      <Footer>
        <ButtonDraft>Save as draft</ButtonDraft>
        <ButtonMint onClick={() => next()}>Next</ButtonMint>
      </Footer>
    </Container>
  )
}

export default Card
