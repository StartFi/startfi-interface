import { Shadow } from 'components/BidOrBuy/styles'
import {  Bold, ButtonTransparentBorder, MarginLeft } from 'components/NFTConfirm/styles'
import Amount from 'components/NFTSummary/Amount'
import { ButtonPaymentBlack, PaymentModal } from 'components/NFTSummary/styles'
import Text from '../Text'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Divider } from 'components/InMarketAsset/InMarket.styles'
import Loading from './../../assets/icons/buttonloader.svg'
import { LoadingIcon } from 'components/WaitingConfirmation/styles'
import { Container, TextContainer } from './StokenTokenCard.styles'

interface StokeTokenCardProps {
  isOpen: boolean
  close: () => void
  loader?: boolean
  next?: () => void
  buttonText: string
}

const StokeTokenCard: React.FC<StokeTokenCardProps> = ({ isOpen, close, loader, next, buttonText }) => {
  const { t } = useTranslation()
  if (!isOpen) return null
  return (
    <React.Fragment>
      <Shadow onClick={close} />
      <PaymentModal>
        <Container minHeight='70vh'>
          <Bold>{t('allowTransAction')}</Bold>
          <TextContainer>
            <Text fontFamily='Roboto' fontSize='1rem' FontWeight='400' color='#000000' margin='0 10px 0 0'>
              {t('increasedStake')}
            </Text>
            <Amount amount={201} />
          </TextContainer>
          <Divider left='-6.7%' width='113%' backgroundColor='#D1D1D1'></Divider>
          <TextContainer>
            <Text fontFamily='Roboto' fontSize='1rem' FontWeight='400' color='#000000' margin='0 10px 0 0'>
              {t('currentStakeAfterInc')}
            </Text>
            <Amount amount={232} />
          </TextContainer>
          <Divider left='-6.7%' width='113%' backgroundColor='#D1D1D1'></Divider>
          <TextContainer>
            <Text fontFamily='Roboto' fontSize='1rem' FontWeight='400' color='#000000' margin='0 0px 0 0'>
              {t('stfiBalanceAfterInc')}
            </Text>
            <Amount amount={258} />
          </TextContainer>
          <Divider left='-6.7%' width='113%' backgroundColor='#D1D1D1'></Divider>
          <Text fontFamily='Roboto' fontSize='1rem' FontWeight='400' color='#000000' margin='0 5px 0 0'>
            {t('allowMetaMaskConnectionToIncreaseStake')}
          </Text>

          <ButtonPaymentBlack onClick={next} width='30vw' height='8vh'>
            {t(buttonText)}
            {loader && (
              <MarginLeft>
                <LoadingIcon src={Loading} alt='Loading' />
              </MarginLeft>
            )}
          </ButtonPaymentBlack>

          <ButtonTransparentBorder width='30vw' height='8vh'>
            {t('cancel')}
          </ButtonTransparentBorder>
        </Container>
      </PaymentModal>
    </React.Fragment>
  )
}

export default StokeTokenCard
