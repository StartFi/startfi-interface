import React from 'react'
import { useTranslation } from 'react-i18next'
import { Buttons, FooterContainer, Radio, RadioLabel } from './styles'
import Checked from './../../assets/icons/checked.svg'
import Unchecked from './../../assets/icons/unchecked.svg'
import { NFTSummaryProps } from '.'
import { ButtonDraft, ButtonMint } from 'components/Button'
import { useHistory } from 'react-router-dom'
import { usePopup } from 'state/application/hooks'
import { useSaveDraft } from 'state/user/hooks'
import { useNFT } from 'state/marketplace/hooks'

interface FooterProps extends NFTSummaryProps {
  agree: boolean
  onAgree: () => void
}

const Footer: React.FC<FooterProps> = ({ step, agree, onAgree, next }) => {
  const { t } = useTranslation()

  const history = useHistory()

  const popup = usePopup()

  const nft = useNFT()

  const saveDraft = useSaveDraft()

  if (!nft) return null

  return (
    <FooterContainer>
      {step === 4 && (
        <Radio>
          <img onClick={onAgree} src={agree ? Checked : Unchecked} alt="Check" />
          <RadioLabel>{t('confirmNFTData')}</RadioLabel>
        </Radio>
      )}
      <Buttons>
        <ButtonDraft
          onClick={() =>
            step < 4
              ? nft.category || nft.dataHash || nft.name || nft.description
                ? saveDraft(nft)
                : popup({ success: false, message: 'noEnteredData' })
              : history.push('/inventory/off-market/' + nft.id)
          }
        >
          {t(step === 4 ? 'saveDraft' : 'saveAtOffMarketplace')}
        </ButtonDraft>
        <ButtonMint disabled={!agree && step === 4} onClick={next}>
          {t(step === 4 ? 'next' : 'addToMarketplace')}
        </ButtonMint>
      </Buttons>
    </FooterContainer>
  )
}

export default Footer
