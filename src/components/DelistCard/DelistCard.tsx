import { Divider } from 'components/InMarketAsset/InMarket.styles'
import React, { useEffect, useState } from 'react'
import { NFT } from 'services/models/NFT'
// import { useTranslation } from 'react-i18next'
import {
  DelistModal,
  Container,
  Shadow,
  DelistCardHeader,
  DelistingDuration,
  CounterSegment,
  CounterContainer,
  CheckContainer,
  DelistMain,
  DelistSuccessContainer,
  DelistButton,
  ButtonContainer,
  SuccessImgContainer
} from './DelistCard.style'
import Text from '../Text'
import { useCountDownTimer } from 'hooks/countDownTimer'
import delistSuccessImg from '../../assets/images/delistSuccess.png'
import { useHistory } from 'react-router-dom'
import { Auction } from 'services/models/Auction'

interface DelistCardProps {
  isOpen: boolean
  close: () => void
  nft: NFT
  auction: Auction
}

const DelistCard: React.FC<DelistCardProps> = ({ isOpen, close, nft, auction }) => {
  const timeLeft = useCountDownTimer(auction?.expireTimestamp)
  const [disabled, setDisabled] = useState<boolean>(true)
  const [delistSuccess, setDelistSuccess] = useState<boolean>(false)
  const timerComponents: any = []
 

  const history = useHistory()

  const handelCheckBoxChanges = e => {
    setDisabled(!e.target.checked)
  }

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
        <div key={interval}>
          <Divider left='40%' top='60%' width='40.5%' backgroundColor='#E2E2E2'></Divider>
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
      <DelistModal>
        <Container minHeight='70vh'>
          <DelistCardHeader>
            <Text fontFamily='Roboto' fontSize='1.2rem' color='#000000' font-weight='500' margin='5px 0px 15px 0px'>
              Delisting Asset "{nft?.name}"
            </Text>
            <Divider left='-7.8%' width='115.5%' backgroundColor='#D1D1D1'></Divider>
          </DelistCardHeader>

          {!delistSuccess ? (
            <DelistMain>
              {timerComponents.length > 0 ? (
                <Text
                  fontFamily='Roboto'
                  fontSize='0.875rem'
                  color='#444444'
                  font-weight='400'
                  textAlign='justify'
                  textJustify='auto'
                >
                  Delisting the asset from the market place right now Will cost you stakes if it’s didn’t Exceed the
                  minimaum duration of delisting
                </Text>
              ) : (
                <Text
                  fontFamily='Roboto'
                  fontSize='0.875rem'
                  color='#444444'
                  font-weight='400'
                  textAlign='justify'
                  textJustify='auto'
                >
                  Delisting the asset now means it will be removed from the marketplace are you sure you want to delist
                  it?
                </Text>
              )}

              <DelistingDuration>
                {timerComponents.length > 0 ? (
                  <Text
                    textTransform='upperCase'
                    fontFamily='Roboto'
                    fontSize='0.875rem'
                    color='#000000'
                    font-weight='500'
                    textAlign='justify'
                    textJustify='auto'
                  >
                    minimum delisting duration Left
                  </Text>
                ) : null}
              </DelistingDuration>
              <CounterContainer>{timerComponents}</CounterContainer>
              <CheckContainer>
                <input type='checkbox' onChange={handelCheckBoxChanges} />
                <Text fontFamily='Roboto' fontSize='10.5px' color='#000000' font-weight='500'>
                  I’m sure about delisting my asset which will charge me stake fees
                </Text>
              </CheckContainer>
              <ButtonContainer>
                <DelistButton
                  onClick={() => setDelistSuccess(true)}
                  disabled={disabled}
                  backgroundColor='#000000'
                  color='#ffffff'
                >
                  Delist Now
                </DelistButton>
                <DelistButton onClick={close} backgroundColor='transparent' border='1px solid #000000'>
                  Cancel Delisting
                </DelistButton>
              </ButtonContainer>
            </DelistMain>
          ) : (
            <DelistSuccessContainer>
              <img src={delistSuccessImg} />
              <Text
                fontFamily='Roboto'
                fontSize='1rem'
                color='#444444'
                font-weight='500'
                margin='35px 0px 0px 0px'
                textAlign='center'
              >
                Your asset has been Delisted and moved to “Inventory, Off marketplace”
              </Text>
              <div>
                <div>
                  <DelistButton
                    backgroundColor='transparent'
                    padding='15px'
                    textDecoration='underline'
                    fontWeight='500'
                    fontSize='0.9rem'
                  >
                    Check my Stake Balance
                  </DelistButton>
                  <DelistButton
                    onClick={() => history.push('/inventory/home/draft')}
                    backgroundColor='transparent'
                    border='1px solid #000000'
                    fontWeight='500'
                    fontSize='0.9rem'
                  >
                    Check my Inventory
                  </DelistButton>
                </div>
                <DelistButton
                  onClick={() => history.push('/marketplace/nfts')}
                  backgroundColor='#000000'
                  color='#ffffff'
                >
                  Go Back to Marketplace
                </DelistButton>
              </div>
            </DelistSuccessContainer>
          )}
        </Container>
      </DelistModal>
    </React.Fragment>
  )
}

export default DelistCard
