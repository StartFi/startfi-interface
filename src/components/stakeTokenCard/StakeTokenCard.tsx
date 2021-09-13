/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { Shadow } from 'components/BidOrBuy/styles'
import { Bold, ButtonTransparentBorder, MarginLeft } from 'components/NFTConfirm/styles'
import DisplayBalance  from 'components/NFTSummary/DisplayBalance'
import { ButtonPaymentBlack, PaymentModal } from 'components/NFTSummary/styles'
import Text from '../Text'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Divider } from 'components/InMarketAsset/InMarket.styles'
import Loading from './../../assets/icons/buttonloader.svg'
import { LoadingIcon } from 'components/WaitingConfirmation/styles'
import { Container, TextContainer, ButtonContainer } from './StakeTokenCard.styles'

interface StokeTokenCardProps {
  isOpen: boolean
  close: () => void
  loader?: boolean
  next?: () => void
  buttonText: string
  increasedStake?: number
  stakeAfterIncreased?: number
  stfiBalanceAfterStack?: number
}

const StakeTokenCard: React.FC<StokeTokenCardProps> = React.memo(
  ({ isOpen, close, loader, next, buttonText, increasedStake, stakeAfterIncreased, stfiBalanceAfterStack }) => {
    const { t } = useTranslation()
    if (!isOpen) return null
    return (
      <React.Fragment>
        <Shadow onClick={close} />
        <PaymentModal>
          <Container minHeight="80vh" width="30vw">
            <Bold>{t('allowTransAction')}</Bold>
            <TextContainer>
              <Text fontFamily="Roboto" fontSize="1rem" FontWeight="400" color="#000000">
                {t('increasedStake')}
              </Text>
              <DisplayBalance  amount={increasedStake} margin="15px 0px 0px 30px" />
            </TextContainer>
            <Divider left="-6.7%" width="113%" backgroundColor="#D1D1D1"></Divider>
            <TextContainer>
              <Text fontFamily="Roboto" fontSize="1rem" FontWeight="400" color="#000000">
                {t('currentStakeAfterInc')}
              </Text>
              <DisplayBalance  amount={stakeAfterIncreased} margin="10px 0px 0px 10px" />
            </TextContainer>
            <Divider left="-6.7%" width="113%" backgroundColor="#D1D1D1"></Divider>
            <TextContainer>
              <Text fontFamily="Roboto" fontSize="1rem" FontWeight="400" color="#000000">
                {t('stfiBalanceAfterInc')}
              </Text>
              <DisplayBalance  amount={stfiBalanceAfterStack} margin="10px 0px 0px 10px" />
            </TextContainer>
            <Divider left="-6.7%" width="113%" backgroundColor="#D1D1D1"></Divider>
            <Text fontFamily="Roboto" fontSize="1rem" FontWeight="400" color="#000000" margin="0 5px 0 0">
              {t('allowMetaMaskConnectionToIncreaseStake')}
            </Text>

            <ButtonContainer>
              <ButtonPaymentBlack onClick={next} width="30vw" height="8vh">
                {t(buttonText)}
                {loader && (
                  <MarginLeft>
                    <LoadingIcon src={Loading} alt="Loading" />
                  </MarginLeft>
                )}
              </ButtonPaymentBlack>

              <ButtonTransparentBorder width="30vw" height="8vh" onClick={close}>
                {t('cancel')}
              </ButtonTransparentBorder>
            </ButtonContainer>
          </Container>
        </PaymentModal>
      </React.Fragment>
    )
  }
)

export default StakeTokenCard
