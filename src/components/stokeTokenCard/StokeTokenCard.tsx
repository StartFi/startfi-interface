import { Shadow } from 'components/BidOrBuy/styles'
import { Right, Bold, SpaceBetween, SemiBold, ButtonBlack, ButtonTransparentBorder } from 'components/NFTConfirm/styles'
import Amount from 'components/NFTSummary/Amount'
import { PaymentModal } from 'components/NFTSummary/styles'
import Text from '../Text'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Divider } from 'components/InMarketAsset/InMarket.styles'

interface StokeTokenCardProps {
  isOpen: boolean
  close: () => void
}

const StokeTokenCard = ({ isOpen, close }) => {
  const { t } = useTranslation()
  if (!isOpen) return null
  return (
    <React.Fragment>
      <Shadow onClick={close} />
      <PaymentModal>
        <Right minHeight='70vh'>
          <Bold>{t('allowTransAction')}</Bold>
          <SpaceBetween>
            <Text fontFamily='Roboto' fontSize='1rem' FontWeight='400' color='#000000' margin='0 30px 0 0'>
              {t('increasedStake')}
            </Text>
            <Amount amount={20} />

          </SpaceBetween>
          <Divider left='-7.8%' width='115.5%' backgroundColor='#D1D1D1'></Divider>
          <SpaceBetween>
            <Text fontFamily='Roboto' fontSize='1rem' FontWeight='400' color='#000000' margin='0 10px 0 0'>
              {t('currentStakeAfterInc')}
            </Text>
            <Amount amount={0} />
          </SpaceBetween>
          <Divider left='-7.8%' width='115.5%' backgroundColor='#D1D1D1'></Divider>
          <SpaceBetween>
            <Text fontFamily='Roboto' fontSize='1rem' FontWeight='400' color='#000000' margin='0 10px 0 0'>
              {t('stfiBalanceAfterInc')}
            </Text>
            <Amount amount={0} />
          </SpaceBetween>
          <Divider left='-7.8%' width='115.5%' backgroundColor='#D1D1D1'></Divider>
          <Text fontFamily='Roboto' fontSize='1rem' FontWeight='400' color='#000000' margin='0 10px 0 0'>
            {t('allowMetaMaskConnectionToIncreaseStake')}
          </Text>
          <ButtonBlack>{t('allow')}</ButtonBlack>
          <ButtonTransparentBorder>{t('cancel')}</ButtonTransparentBorder>
        </Right>
      </PaymentModal>
    </React.Fragment>
  )
}

export default StokeTokenCard
