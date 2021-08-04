import React from 'react'
import { LinkStyledButton } from '../../theme'
import { Label, Field, FirstBoxFields, FirstBoxLabel, Line } from './styles'
import { useTranslation } from 'react-i18next'

const ZeroBalance: React.FC = () => {
  const { t } = useTranslation()

  return (
    <React.Fragment>
      <FirstBoxFields>
        <Field>
          <Label>{t('zeroBalance')}</Label>
        </Field>
        <Line />
        <Field>
          <FirstBoxLabel>{t('zeroBalanceMessage')}</FirstBoxLabel>
        </Field>
        <Field>
          <LinkStyledButton onClick={() => console.log('redirect me to where I can buy some')}>
            {t('getBalance')}
          </LinkStyledButton>
        </Field>
      </FirstBoxFields>
    </React.Fragment>
  )
}

export default ZeroBalance
