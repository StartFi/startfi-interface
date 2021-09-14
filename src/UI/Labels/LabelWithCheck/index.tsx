import React from 'react'
import Check from '../../../assets/icons/check.svg'
import { useTranslation } from 'react-i18next'
import { LabelContainer, Missed } from '../styles'
import { DefaultTheme, StyledComponent } from 'styled-components'

interface LabelWithCheckProps {
  Label: StyledComponent<'div', DefaultTheme, {}, never>
  text: string
  error: boolean
  verified?: boolean
  underline?: boolean
}

const LabelWithCheck: React.FC<LabelWithCheckProps> = ({ Label, text, verified, error, underline }) => {
  const { t } = useTranslation()
  return (
    <LabelContainer underline={underline} error={error}>
      <Label>{text}</Label>
      {verified ? <img src={Check} alt="Verified" /> : error ? <Missed>{t('missed')}</Missed> : null}
    </LabelContainer>
  )
}

export default LabelWithCheck
