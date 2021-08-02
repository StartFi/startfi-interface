import { useDigitizingFees } from 'hooks'
import React, { useEffect, useState } from 'react'
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
import { useSaveDraft } from 'state/user/hooks'
import ZeroBalance from './ZeroBalance'
import ConnectWallet from './ConnectWallet'
import Amount from './Amount'
import { useWeb3React } from '@web3-react/core'
import { useTokenBalance } from 'hooks/startfiToken'
import { useNFT } from 'state/marketplace/hooks'

interface PaymentCardProps extends NFTSummaryProps {
  allowedStfi: number
  allowed: boolean
}

const PaymentCard: React.FC<PaymentCardProps> = ({ step, next, allowedStfi, allowed }) => {
  const { t } = useTranslation()

  const history = useHistory()

  const saveDraft = useSaveDraft()

  const fees = useDigitizingFees()

  const nft = useNFT()

  const { account } = useWeb3React()

  const getStfiBalance = useTokenBalance()

  const [stfiBalance, setStfiBalance] = useState<number>(0)

  useEffect(() => {
    const getBalance = async () => {
      const balanceHexString = await getStfiBalance(account as string)
      const balance = balanceHexString?.length < 5 ? parseInt(balanceHexString, 16) : Number(balanceHexString)
      setStfiBalance(balance)
    }
    account && getBalance()
  }, [account, getStfiBalance])

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
        <Amount amount={stfiBalance} />
      </SpaceBetween>
      <Border />
      <SpaceBetween>
        <SemiBold>{t('totalPaymentAmount')}</SemiBold>
        <Amount amount={fees} />
      </SpaceBetween>
      {account ? (
        stfiBalance > 0 ? (
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
