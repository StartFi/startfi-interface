import { Divider } from 'components/InMarketAsset/InMarket.styles'
import React, { useState } from 'react'
import { NFT } from 'services/models/NFT'
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

} from './DelistCard.style'
import Text from '../Text'
import { useCountDownTimer } from 'hooks/countDownTimer'
import delistSuccessImg from '../../assets/images/delistSuccess.png'
import { useHistory } from 'react-router-dom'
import { Auction } from 'services/models/Auction'
import { useTranslation } from 'react-i18next'
import { useDelistAuction } from 'state/marketplace/hooks'

interface DelistCardProps {
  isOpen: boolean
  close: () => void
  nft: NFT
  auction: Auction
}

const DelistCard: React.FC<DelistCardProps> = ({ isOpen, close, nft, auction }) => {
  const { t } = useTranslation();
  const timeLeft = useCountDownTimer(1630751434000)
  const [disabled, setDisabled] = useState<boolean>(true)
  const [delistSuccess, setDelistSuccess] = useState<boolean>(false)
  const timerComponents: any = []
  const delist = useDelistAuction(auction.id)


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
        <div >
          <Divider left='40%' top='60%' width='40.5%' backgroundColor='#E2E2E2'></Divider>
          <CounterSegment>
            <p>{timeLeft[interval]}</p>
            <p>{t(modifiedInterval)}</p>
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
              {t('delistAsset')} {nft?.name}
            </Text>
            <Divider left='-7.8%' width='115.5%' backgroundColor='#D1D1D1'></Divider>
          </DelistCardHeader>

          {!delistSuccess ? (
            <DelistMain>
              {timerComponents.length > 0 && auction?.bids.length>0 ? (
                <Text
                  fontFamily='Roboto'
                  fontSize='0.875rem'
                  color='#444444'
                  font-weight='400'
                  textAlign='justify'
                  textJustify='auto'
                >
                 {t('delistCost')}
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
                 {t('delistNow')}
                </Text>
              )}

              <DelistingDuration>
                {timerComponents.length > 0 && auction?.bids.length>0 ? (
                  <Text
                    textTransform='upperCase'
                    fontFamily='Roboto'
                    fontSize='0.875rem'
                    color='#000000'
                    font-weight='500'
                    textAlign='justify'
                    textJustify='auto'
                  >
                  {t('minDelistLef')}
                  </Text>
                ) : null}
              </DelistingDuration>
              {auction?.bids.length>0?(<CounterContainer>{timerComponents}</CounterContainer>):null}

              <CheckContainer>
                <input type='checkbox' onChange={handelCheckBoxChanges} />
                <Text fontFamily='Roboto' fontSize='10.5px' color='#000000' font-weight='500'>
                 {t('delistConfirm')}
                </Text>
              </CheckContainer>
              <ButtonContainer>
                <DelistButton
                  onClick={() => {
                    delist()
                    setDelistSuccess(true)
                  }}
                  disabled={disabled}
                  backgroundColor='#000000'
                  color='#ffffff'
                >
                  {t('delistNowButton')}
                </DelistButton>
                <DelistButton onClick={close} backgroundColor='transparent' border='1px solid #000000'>
                  {t('cancelDelisting')}
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
                {t('DelistSuccess')}
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
                    {t('checkStake')}
                  </DelistButton>
                  <DelistButton
                    onClick={() => history.push('/inventory/home/draft')}
                    backgroundColor='transparent'
                    border='1px solid #000000'
                    fontWeight='500'
                    fontSize='0.9rem'
                  >
                    {t('checkInventory')}
                  </DelistButton>
                </div>
                <DelistButton
                  onClick={() => history.push('/marketplace/nfts')}
                  backgroundColor='#000000'
                  color='#ffffff'
                >
                {t('BackToMarketplace')}
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
