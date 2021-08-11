import ButtonWishlist from 'components/Button/ButtonWishlist'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import { usePopup } from 'state/application/hooks'
import { useAuctionNFT, useBidOrBuy, useBidOrBuyValue, useBuyNFT, usePlaceBid } from 'state/marketplace/hooks'
import { useUserBalance } from 'state/user/hooks'
import { shortenAddress } from 'utils'
import uriToHttp from 'utils/uriToHttp'
import {
  Bold,
  Border,
  ButtonBlack,
  ButtonTransparent,
  MarginLeft,
  Right,
  SemiBold,
  SpaceBetween,
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
  TextBlack
} from './styles'

const NFTConfirm: React.FunctionComponent = () => {
  const { t } = useTranslation()

  const history = useHistory()

  const balance = useUserBalance()

  const auctionNFT = useAuctionNFT()

  const placebid = usePlaceBid()

  const buynft = useBuyNFT()

  const bidOrBuy = useBidOrBuy()

  const v: any = useBidOrBuyValue()

  const value = bidOrBuy ? parseFloat(v) : auctionNFT?.auction.listingPrice

  const popup = usePopup()

  if (!auctionNFT) {
    popup({ success: false, message: 'noNFT' })
    history.goBack()
    return null
  }

  if (!value) {
    popup({ success: false, message: 'noValue' })
    history.goBack()
    return null
  }

  const { ownername, issuername, ownerdetails, nft } = auctionNFT

  const service = (): number => value * 1

  const total = (value: any, service: any): number => {
    return parseFloat(value) + parseFloat(service)
  }

  const confirm = () => {
    if (bidOrBuy) placebid()
    else buynft()
  }

  return (
    <Container>
      <Left>
        <Rows>
          <Img src={uriToHttp(nft.dataHash)[1]} />
          <Column>
            <Bold>{nft.name}</Bold>
            <Text>Prediction: Round 12 (Bronze) - Only 100 Available</Text>
            <MarginLeftBorder />
            <Baseline>
              <MarginRight>{t('publisher')}</MarginRight>
              <SemiBold>{issuername}</SemiBold>
            </Baseline>
            <SemiBold>
              {nft.royalty}% {t('reselling')}
            </SemiBold>
            <MarginLeftBorder />
            <Baseline>
              <MarginRight>{t('owner')}</MarginRight>
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
      <MarginLeft>
        <Right minHeight="74vh">
          <Bold>{t(bidOrBuy ? 'confirmBidding' : 'confirmPayment')}</Bold>
          <TextBlack>{t('bidDesc', { ownername, owner: shortenAddress(nft.owner, 6) })}</TextBlack>
          <SpaceBetween>
            <Bold>{t(bidOrBuy ? 'biddingOffer' : 'paymentAmount')}</Bold>
            <Bold>{value} STFI</Bold>
          </SpaceBetween>
          <Border />
          <SpaceBetween>
            <SemiBold>{t(bidOrBuy ? 'biddingBalance' : 'paymentBalance')}</SemiBold>
            <Bold>{value} STFI</Bold>
          </SpaceBetween>
          <SpaceBetween>
            <SemiBold>{t('yourBalance')}</SemiBold>
            <Bold>{balance} STFI</Bold>
          </SpaceBetween>
          <SpaceBetween>
            <SemiBold>{t('serviceFees')}</SemiBold>
            <Bold>{service()} STFI</Bold>
          </SpaceBetween>
          <Border />
          <SpaceBetween>
            <Bold>{t(bidOrBuy ? 'totalBidAmount' : 'totalPaymentAmount')}</Bold>
            <Bold>{total(value, service())} STFI</Bold>
          </SpaceBetween>
          <ButtonBlack onClick={() => confirm()}>{t(bidOrBuy ? 'confirmBidding' : 'confirmPayment')}</ButtonBlack>
          <ButtonWishlist nftId={nft.id} type="NFTConfirm" />
          <ButtonTransparent onClick={() => history.goBack()}>
            {t(bidOrBuy ? 'cancelBidding' : 'cancelPayment')}
          </ButtonTransparent>
        </Right>
      </MarginLeft>
    </Container>
  )
}

export default NFTConfirm
