import React from 'react'
import { ButtonDraft, ButtonMint, ButtonMintBack } from 'components/Button'
import { useTranslation } from 'react-i18next'
import { useSaveDraft } from 'state/user/hooks'

import { useSteps } from 'state/marketplace/hooks'
import {
  CardContainer,
  CardHeader,
  CardUnderline,
  Footer,
  Title,
  Body,
  Container,
  Left,
  Right,
  Stepicon
} from './styles'

import { StepIcon } from '../../constants'
import AddAuction from 'components/AddAuction'
import AddNFT from 'components/AddNFT'
import Questions from './Questions'

const MintNFT: React.FC = () => {
  const { t } = useTranslation()

  const saveDraft = useSaveDraft()

  const { step, next, back, nftOrAuction } = useSteps()

  const icon = StepIcon(step)

  return (
    <Container>
      <Body>
        <Left>
          <Questions />
        </Left>
        <Right>
          <CardContainer>
            <CardHeader>
              <div>
                <Title>{t('mintNFTTitle')}</Title>
                <CardUnderline />
              </div>
              {icon && <Stepicon src={icon} alt="Step" />}
            </CardHeader>
            {nftOrAuction ? <AddNFT /> : <AddAuction />}
            <Footer>
              <ButtonMintBack onClick={back}>{t('back')}</ButtonMintBack>
              <ButtonDraft onClick={saveDraft}>{t(nftOrAuction ? 'saveDraft' : 'saveAtOffMarketplace')}</ButtonDraft>
              <ButtonMint onClick={next}>{t('next')}</ButtonMint>
            </Footer>
          </CardContainer>
        </Right>
      </Body>
    </Container>
  )
}

export default MintNFT

