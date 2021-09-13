import { useDigitizingFees } from 'hooks'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { ButtonPaymentBlack, Info, MarginLeft, ZeroBalance } from './styles'
import { Bold, Border, ButtonTransparentBorder, Right, SemiBold, SpaceBetween } from 'components/NFTConfirm/styles'
import Question from 'components/Input/Question'
import { useSaveDraft } from 'state/user/hooks'
import DisplayBalance  from './DisplayBalance'
import { useNFT, useSteps } from 'state/marketplace/hooks'
import { useSTFIBalance } from 'hooks/useSTFIBalance'
import Loading from './../../assets/icons/buttonloader.svg'
import { LoadingIcon } from 'components/WaitingConfirmation/styles'
import { STEP } from 'state/marketplace/types'

const PaymentCard: React.FC = () => {
  const { t } = useTranslation()

  const saveDraft = useSaveDraft()

  const fees = useDigitizingFees()

  const nft = useNFT()

  const STFIBalance = useSTFIBalance()

  const { step, next, nftOrAuction, loader } = useSteps()

  if (!nft) return null

  const noBalance = STFIBalance === 0

  const blackButtonText = (): string => {
    if (noBalance) return 'getBalance'
    switch (step) {
      case STEP.ALLOW_TRANSFER:
        return 'allowTransferOwnership'
      case STEP.ADD_NFT:
        return 'saveToBlockchain'
      case STEP.ALLOW_MONETIZING:
        return 'allowForMonetizing'
      case STEP.ADD_AUCTION:
        return 'addToMarketplace'
      default:
        return 'error'
    }
  }

  const title = (): string => {
    switch (step) {
      case STEP.ALLOW_MONETIZING:
        return 'confirmMonetizing'
      case STEP.ADD_AUCTION:
        return 'addAssetToMarketplace'
      default:
        return 'confirmPayment'
    }
  }

  const description = (): string => {
    switch (step) {
      case STEP.ALLOW_TRANSFER:
        return 'payFromYourAccount'
      case STEP.ADD_NFT:
        return 'paymentAllowedDigitize'
      default:
        return `step${step}desc`
    }
  }

  return (
    <Right minHeight="60vh">
      <Bold>{t(title())}</Bold>
      <SpaceBetween>
        <SemiBold>{t(nftOrAuction ? 'digitizingFees' : 'monetizingFees')}</SemiBold>
        <DisplayBalance  amount={fees} />
      </SpaceBetween>
      {!nftOrAuction && <div>{t('monetizingFeesCharge')}</div>}
      <Border />
      {nftOrAuction && (
        <React.Fragment>
          <SpaceBetween>
            <SemiBold error={noBalance}>{t('yourBalance')}</SemiBold>
            <DisplayBalance  amount={STFIBalance} error={noBalance} />
          </SpaceBetween>
          <Border />
          <SpaceBetween>
            <SemiBold>{t('totalPaymentAmount')}</SemiBold>
            <DisplayBalance  amount={fees} />
          </SpaceBetween>
        </React.Fragment>
      )}
      {noBalance && <ZeroBalance>{t('notEnoughBalanceDigitize')}</ZeroBalance>}
      <Info>
        {t(description())}
        {(step === STEP.ALLOW_TRANSFER || step === STEP.ALLOW_MONETIZING) && <Question text="payFromAccountDesc" />}
      </Info>
      <ButtonPaymentBlack disabled={loader} onClick={next}>
        {t(blackButtonText())}
        {loader && (
          <MarginLeft>
            <LoadingIcon src={Loading} alt="Loading" />
          </MarginLeft>
        )}
      </ButtonPaymentBlack>
      <ButtonTransparentBorder onClick={saveDraft}>{t('cancelAndSaveAsDraft')}</ButtonTransparentBorder>
    </Right>
  )
}

export default PaymentCard
