import React from 'react'
import { ButtonMintBack } from 'UI/Buttons/ButtonMintBack'
import { ButtonDraft } from 'UI/Buttons/ButtonDraft'
import { ButtonMint } from 'UI/Buttons/ButtonMint'
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

// (step > 1 && step < 4 ? setStep(step - 1) : null)
// const draft: NFT = useDraft(parseInt(id))
// const offMarketNft: NFT = useOffMarketItem(id)
// useEffect(() => {
//   if (draft) {
//     setNFT(draft)
//     setStep(2)
//   }
//   if (offMarketNft) {
//     setNFT(offMarketNft)
//     setStep(7)
//   }
// }, [draft, offMarketNft])
