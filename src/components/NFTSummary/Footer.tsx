import React from 'react'
import { useTranslation } from 'react-i18next'
import { Buttons, FooterContainer, Radio, RadioLabel } from './styles'
import Checked from './../../assets/icons/checked.svg'
import Unchecked from './../../assets/icons/unchecked.svg'
import { ButtonDraft } from 'UI/Buttons/ButtonDraft'
import { ButtonMint } from 'UI/Buttons/ButtonMint'
import { useSaveDraft } from 'state/user/hooks'
import { useAddNFT, useSteps } from 'state/marketplace/hooks'

const Footer: React.FC = () => {
  const { t } = useTranslation()

  const { nft } = useAddNFT()

  const saveDraft = useSaveDraft()

  const { next, nftOrAuction, agree, setAgree } = useSteps()

  if (!nft) return null

  return (
    <FooterContainer>
      {nftOrAuction && (
        <Radio>
          <img onClick={() => setAgree(!agree)} src={agree ? Checked : Unchecked} alt="Check" />
          <RadioLabel>{t('confirmNFTData')}</RadioLabel>
        </Radio>
      )}
      <Buttons>
        <ButtonDraft onClick={saveDraft}>{t(nftOrAuction ? 'saveDraft' : 'saveAtOffMarketplace')}</ButtonDraft>
        <ButtonMint disabled={!agree && nftOrAuction} onClick={next}>
          {t(nftOrAuction ? 'next' : 'addToMarketplace')}
        </ButtonMint>
      </Buttons>
    </FooterContainer>
  )
}

export default Footer
