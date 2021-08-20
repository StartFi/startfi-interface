import MintNFT from 'components/MintCard.tsx'
import AddedToMarketplace from 'components/AddAuction/AddedToMarketplace'
import Header from 'components/MintCard.tsx/Header'
import NFTSummary from 'components/NFTSummary'
import React, { useEffect } from 'react'
import { Route } from 'react-router-dom'
import styled from 'styled-components'
import { useSaveNFT, useSetStep } from 'state/marketplace/hooks'
import { initialNFT } from 'state/marketplace/initial'
import { STEP } from 'state/marketplace/types'

const Container = styled.div`
  width: 100%;
  background-color: #fafafa;
  padding: 4vh 3.2vw;
`

const Mint: React.FC = () => {
  const saveNFT = useSaveNFT()

  const setStep = useSetStep()

  useEffect(() => {
    return () => {
      saveNFT(initialNFT)
      setStep(STEP.STEP1)
    }
  }, [saveNFT, setStep])

  return (
    <Container>
      <Header />
      <Route path="/mint/steps" component={MintNFT} />
      <Route path="/mint/summary" component={NFTSummary} />
      <Route path="/mint/addedtomarketplace" component={AddedToMarketplace} />
    </Container>
  )
}

export default Mint
