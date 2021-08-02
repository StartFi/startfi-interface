import { useDigitizingFees } from 'hooks'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { NFTSummaryProps } from '.'
import { Info } from './styles'
import {
  Bold,
  Border,
  ButtonBlack,
  ButtonTransparentBorder,
  Right,
  SemiBold,
  SpaceBetween
} from 'components/NFTConfirm/styles'
import Question from 'components/Input/Question'
import { useHistory } from 'react-router-dom'
import { useSaveDraft, useUser } from 'state/user/hooks'
import ZeroBalance from './ZeroBalance'
import ConnectWallet from './ConnectWallet'
import Amount from './Amount'
import { useNFT } from 'state/marketplace/hooks'
import { useSTFIBalance } from 'hooks/useSTFIBalance'
import { useAllowedSTFI } from 'hooks/useAllowedSTFI'
import { useAllowed } from 'hooks/useAllowed'

const PaymentCard: React.FC<NFTSummaryProps> = ({ step, next }) => {
  const { t } = useTranslation()

  const history = useHistory()

  const saveDraft = useSaveDraft()

  const fees = useDigitizingFees()

  const nft = useNFT()

  const user = useUser()

  const STFIBalance = useSTFIBalance()

  const allowedStfi = useAllowedSTFI()

  const allowed = useAllowed()

  if (!nft) return null

  return (
    <Right minHeight="60vh">
      <Bold>{t('confirmPayment')}</Bold>
      <SpaceBetween>
        <SemiBold>{t('digitizingFees')}</SemiBold>
        <Amount amount={fees} />
      </SpaceBetween>
      <Border />
      <SpaceBetween>
        <SemiBold>{t('yourBalance')}</SemiBold>
        <Amount amount={STFIBalance} />
      </SpaceBetween>
      <Border />
      <SpaceBetween>
        <SemiBold>{t('totalPaymentAmount')}</SemiBold>
        <Amount amount={fees} />
      </SpaceBetween>
      {user ? (
        STFIBalance > 0 ? (
          <div>
            <Info>
              {t(step === 5 || step === 9 ? 'payFromYourAccount' : 'paymentAllowedDigitize')}
              {(step === 5 || step === 9) && <Question text="payFromAccountDesc" />}
            </Info>
            <ButtonBlack onClick={next}>
              {t(
                (step === 5 && allowedStfi === 0) || (step === 9 && !allowed)
                  ? 'allowPayment'
                  : step === 6
                  ? 'saveToBlockchain'
                  : 'addToMarketplace'
              )}{' '}
            </ButtonBlack>
          </div>
        ) : (
          <ZeroBalance />
        )
      ) : (
        <ConnectWallet />
      )}

      <ButtonTransparentBorder
        onClick={() => (nft.step < 4 ? saveDraft(nft) : history.push('/inventory/off-market/' + nft.id))}
      >
        {t('cancelAndSaveAsDraft')}
      </ButtonTransparentBorder>
    </Right>
  )
}

export default PaymentCard
