import Amount from 'components/MintNFT/Amount'
import { Bold, Border, Right, SemiBold, SpaceBetween,ButtonBlack, ButtonTransparentBorder} from 'components/NFTConfirm'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { PaymentModal, Shadow, Info } from './DelistCard.style'
import Question from 'components/Input/Question'
import { useDigitizingFees } from 'hooks'
import { useWeb3React } from '@web3-react/core'
import { useTokenBalance } from 'hooks/startfiToken'
interface PaymentCardProps {
    isOpen: boolean
    close: () => void
  }
const DelistCard: React.FC<PaymentCardProps> = ({isOpen,close}) => {
    const { account } = useWeb3React()
    const getStfiBalance = useTokenBalance()
  const { t } = useTranslation()
  const fees = useDigitizingFees()
  const [stfiBalance, setStfiBalance] = useState(0)
  useEffect(() => {
    const getBalance = async () => {
      const balanceHexString = await getStfiBalance(account as string)
      const balance = balanceHexString?.length < 5 ? parseInt(balanceHexString, 16) : Number(balanceHexString)
      setStfiBalance(balance)
    }
    account && getBalance()
  }, [account, getStfiBalance])
  if (!isOpen) return null
  return (
    <React.Fragment>
    <Shadow onClick={close} />
    <PaymentModal>
    <Right minHeight='70vh'>
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
      <Info>
      let statfi contract to pay from your account if approved
      <Question text="payFromAccountDesc" />
      </Info>
      <ButtonBlack>
      Allow Payment
      </ButtonBlack>
      <ButtonTransparentBorder>Cancel & Save as Draft</ButtonTransparentBorder>
      </Right>
    </PaymentModal>
    </React.Fragment>
  )
}

export default DelistCard;
