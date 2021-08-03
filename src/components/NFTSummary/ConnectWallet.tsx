import React from 'react'
import { Field, FirstBoxFields, FirstBoxLabel, Line } from './styles'
import { useTranslation } from 'react-i18next'
import { LinkStyledButton } from 'theme'

const ConnectWallet: React.FC = () => {
  const { t } = useTranslation()

  return (
    <React.Fragment>
      <FirstBoxFields>
        <Field>
          <FirstBoxLabel>{t('marketplaceConnectWallet')}</FirstBoxLabel>
        </Field>
        <Line />
        <Field>
          <LinkStyledButton onClick={() => console.log('show whatever to user to connect to his wallet')}>
            {t('connectWallet')}
          </LinkStyledButton>
        </Field>
      </FirstBoxFields>
    </React.Fragment>
  )
}

export default ConnectWallet
