import { Divider } from 'components/InMarketAsset/InMarket.styles'
import React from 'react'
import { NFT } from 'services/models/NFT'
// import { useTranslation } from 'react-i18next'
import {
  PaymentModal,
  Container,
  Shadow,
  DelistCardHeader,
  DelistingDuration,
  CounterSegment,
  CounterContainer,
  CheckContainer
} from './DelistCard.style'
import Text from '../Text'
import { useCountDownTimer } from 'hooks/countDownTimer'

interface PaymentCardProps {
  isOpen: boolean
  close: () => void
  nft: NFT
}

const DelistCard: React.FC<PaymentCardProps> = ({ isOpen, close, nft }) => {
  const timeLeft = useCountDownTimer(1628267099000)
  const timerComponents: any = []

  Object.keys(timeLeft).forEach(interval => {
    if (!timeLeft[interval]) {
      return
    }
    let modifiedInterval: string = ''
    if (interval === 'D') modifiedInterval = 'Days'
    if (interval === 'H') modifiedInterval = 'Hours'
    if (interval === 'M') modifiedInterval = 'Minutes'

    if (interval !== 'S') {
      timerComponents.push(
        <div>
          <Divider  left='40%' top="60%" width='40.5%' backgroundColor='#E2E2E2'></Divider>
          <CounterSegment>
            <p>{timeLeft[interval]}</p>
            <p>{modifiedInterval}</p>
          </CounterSegment>
        </div>
      )
    }
  })

  if (!isOpen) return null
  return (
    <React.Fragment>
      <Shadow onClick={close} />
      <PaymentModal>
        <Container minHeight='70vh'>
          <DelistCardHeader>
            <Text fontFamily='Roboto' fontSize='1.2rem' color='#000000' font-weight='500' margin='5px 0px 15px 0px'>
              Delisting Asset "{nft?.name}"
            </Text>
            <Divider left='-7.8%' width='115.5%' backgroundColor='#D1D1D1'></Divider>
          </DelistCardHeader>
          <Text fontFamily='Roboto' fontSize='0.875rem' color='#444444' font-weight='400' textAlign="justify" textJustify="auto">
            Delisting the asset from the market place right now Will cost you stakes if it’s didn’t Exceed the minimaum
            duration of delisting
          </Text>

          <DelistingDuration>
            <Text
              textTransform='upperCase'
              fontFamily='Roboto'
              fontSize='0.875rem'
              color='#000000'
              font-weight='500'

              textAlign="justify" textJustify="auto"
            >
              minimum delisting duration Left
            </Text>
          </DelistingDuration>
          <CounterContainer>{timerComponents}</CounterContainer>
          <CheckContainer>
            <input type="checkbox"/>
            <Text fontFamily='Roboto' fontSize='10.5px' color='#000000' font-weight='500' >
            I’m sure about delisting my asset which will charge me stake fees
            </Text>

          </CheckContainer>
        </Container>
      </PaymentModal>
    </React.Fragment>
  )
}

export default DelistCard
