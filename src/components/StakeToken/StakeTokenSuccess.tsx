import { Shadow } from 'components/DelistCard/DelistCard.style'
import { ButtonPaymentBlack, PaymentModal } from 'components/NFTSummary/styles'

import SuccessImg from '../../assets/images/delistSuccess.png'
import Text from '../Text'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { StakeTokenSuccessCard } from './StakeToken.styles'
interface CardProps {
  isOpen: boolean
  close: () => void
}

const StakeTokenSuccess: React.FC<CardProps> = ({ isOpen, close }) => {
  const { t } = useTranslation()
  if (!isOpen) return null
  return (
    <React.Fragment>
      <Shadow onClick={close} />
      <PaymentModal>
        <StakeTokenSuccessCard minHeight='50vh' width='27vw'>
          <img src={SuccessImg} />
          <Text
            fontFamily='Roboto'
            fontSize='1.125rem'
            FontWeight='500'
            color='#736e6e'
            margin='0 10px 0 0'
            textAlign='center'
          >
            {t('stakeTokenSuccess')}
          </Text>

          <ButtonPaymentBlack width='95%' height='8vh'>
          {t('checkStakeBalance')}
          </ButtonPaymentBlack>
        </StakeTokenSuccessCard>
      </PaymentModal>
    </React.Fragment>
  )
}

export default StakeTokenSuccess
