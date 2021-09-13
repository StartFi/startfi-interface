import { Shadow } from 'components/DelistCard/DelistCard.style'
import { ButtonPaymentBlack, PaymentModal } from 'components/NFTSummary/styles'

import SuccessImg from '../../assets/images/delistSuccess.png'
import Loading from './../../assets/icons/loading.svg'

import Text from '../../UI/Text'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { StakeTokenSuccessCard } from './StakeToken.styles'
import { LoadingIcon } from 'components/WaitingConfirmation/styles'
interface CardProps {
  isOpen: boolean
  close: () => void
  waitingConfirmation: boolean
}

const StakeTokenSuccess: React.FC<CardProps> = ({ isOpen, close, waitingConfirmation }) => {
  const { t } = useTranslation()
  if (!isOpen) return null
  return (
    <React.Fragment>
      <Shadow onClick={close} />
      <PaymentModal>
        <StakeTokenSuccessCard minHeight="50vh" width="27vw" justifyContent={waitingConfirmation ? 'start' : ''}>
          {waitingConfirmation ? <LoadingIcon src={Loading} alt="Loading" /> : <img src={SuccessImg} />}
          <Text
            fontFamily="Roboto"
            fontSize="1.125rem"
            FontWeight="500"
            color="#736e6e"
            margin={waitingConfirmation ? '30px 10px 0 0' : '0 10px 0 0'}
            textAlign="center"
          >
            {waitingConfirmation ? t('waitIncreaseStakeConfirm') : t('stakeTokenSuccess')}
          </Text>

          {!waitingConfirmation ? (
            <ButtonPaymentBlack width="95%" height="8vh" onClick={close}>
              {t('checkStakeBalance')}
            </ButtonPaymentBlack>
          ) : null}
        </StakeTokenSuccessCard>
      </PaymentModal>
    </React.Fragment>
  )
}

export default StakeTokenSuccess
