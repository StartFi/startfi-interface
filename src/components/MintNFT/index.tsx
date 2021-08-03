import React from 'react'
import Card from './Card'
import Questions from './Questions'
import { useLocation } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { NFT } from 'services/models/NFT'
import { useDraft, useOffMarketItem } from 'state/user/hooks'
import { Body, Container, Left, Right } from './styles'

interface LocationState {
  step?: number
}

interface DraftParams {
  id: string
}

const MintNFT: React.FC = () => {
  const location = useLocation<LocationState>()
  const { id }: DraftParams = useParams()
  const draft: NFT = useDraft(parseInt(id))
  const offMarketNft: NFT = useOffMarketItem(id)

  return (
    <Container>
      <Body>
        <Left>
          <Questions />
        </Left>
        <Right>
          <Card currentStep={location.state?.step} draft={draft} offMarketNft={offMarketNft} />
        </Right>
      </Body>
    </Container>
  )
}

export default MintNFT
