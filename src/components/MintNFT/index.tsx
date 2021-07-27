import React from 'react'
import styled from 'styled-components'
import Card from './Card'
import Questions from './Questions'
import { Row } from 'theme/components'
import { useLocation } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { NFT } from 'services/models/NFT'
import { useDraft } from 'state/user/hooks'

const Container = styled.div`
  width: 100%;
`

const Body = styled(Row)`
  align-items: stretch;
  margin-top: 5vh;
`

const CardBase = styled.div`
  max-height: 85vh;
  padding: 5vh 3vw;
  background: #ffffff;
  border: 1px solid #e3e3e3;
  box-sizing: border-box;
  box-shadow: 0px 0px 20px rgba(239, 239, 239, 0.25);
  border-radius: 8px 8px 0px 0px;
  overflow: auto;
`

const Left = styled(CardBase)`
  width: 37%;
  padding: 5vh 0;
`

const Right = styled(CardBase)`
  width: 60%;
`

interface LocationState {
  step?: number
}

interface DraftParams {
  draftId: string;
}


const MintNFT: React.FC = () => {
  const location = useLocation<LocationState>()
  const {draftId}: DraftParams = useParams()
  const draft:NFT=useDraft(parseInt(draftId));



  return (
    <Container>
      <Body>
        <Left>
          <Questions />
        </Left>
        <Right>
          <Card currentStep={location.state?.step} draft={draft}/>
        </Right>
      </Body>
    </Container>
  )
}

export default MintNFT
