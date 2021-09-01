import Timer from 'components/Timer/Timer'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import { usePopup } from 'state/application/hooks'
import { useAuctionNFT } from 'state/marketplace/hooks'
import uriToHttp from 'utils/uriToHttp'
import Payment from './Payment'
import {
  Bold,
  SemiBold,
  Baseline,
  Text,
  Container,
  Img,
  Bold16,
  Column,
  Left,
  MarginBorder,
  MarginBottom,
  MarginLeftBorder,
  MarginRight,
  Rows,
  TextBlack,
  TimerContainer,
} from './styles'

const NFTConfirm: React.FunctionComponent = () => {
  const { t } = useTranslation()

  const history = useHistory()

  const auctionNFT = useAuctionNFT()

  const popup = usePopup()

  if (!auctionNFT) {
    console.log(auctionNFT)
    // popup({ success: false, message: 'noNFT' })
    // history.goBack()
    return null
  }

  const { ownername, issuername, ownerdetails, nft } = auctionNFT

  return (
    <Container>
      <Left>
        <TimerContainer>
        <Text margin="0px 10px 0px 10px">
          {t('auctionsEndIn')}:
          </Text>
          <Timer timeStamp={auctionNFT.auction.expireTimestamp} helperString='Auction'></Timer>
        </TimerContainer>
        <Rows>
          <Img src={uriToHttp(nft.dataHash)[1]} />
          <Column>
            <Bold>{nft.name}</Bold>
            <Text>Prediction: Round 12 (Bronze) - Only 100 Available</Text>
            <MarginLeftBorder />
            <Baseline>
              <MarginRight>{t('OriginallyCratedBy')}</MarginRight>
              <SemiBold>{issuername}</SemiBold>
            </Baseline>
            <SemiBold>
              {nft.royalty}% {t('reselling')}
            </SemiBold>
            <MarginLeftBorder />
            <Baseline>
              <MarginRight>{t('seller')}</MarginRight>
              <SemiBold>{ownername}</SemiBold>
            </Baseline>
          </Column>
        </Rows>
        <MarginBorder />
        <MarginBottom>
          <Bold>
            {t('about')} {nft.name}
          </Bold>
        </MarginBottom>
        <TextBlack>{nft.description}</TextBlack>
        <MarginBorder />
        <MarginBottom>
          <Baseline>
            <Bold16>{t('detailsCreated')}</Bold16>
            <Bold>{ownername}</Bold>
          </Baseline>
        </MarginBottom>
        <TextBlack>{ownerdetails}</TextBlack>
      </Left>
      <Payment />
    </Container>
  )
}

export default NFTConfirm
