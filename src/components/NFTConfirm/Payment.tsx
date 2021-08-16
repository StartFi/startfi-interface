import React from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import { usePopup } from 'state/application/hooks'
import ButtonWishlist from 'components/Button/ButtonWishlist'
import { useAuctionNFT, useBidOrBuy, useBidOrBuyValue, useBuyNFT, usePlaceBid } from 'state/marketplace/hooks'
import { useUserBalance } from 'state/user/hooks'
import { shortenAddress } from 'utils'

import {
  Bold,
  Border,
  ButtonBlack,
  ButtonTransparent,
  MarginLeft,
  Right,
  SemiBold,
  SpaceBetween,
  TextBlack
} from './styles'

const Payment: React.FC = () => {
  const { t } = useTranslation()

  const history = useHistory()

  const popup = usePopup()

  const balance = useUserBalance()

  const placebid = usePlaceBid()

  const buynft = useBuyNFT()

  const bidOrBuy = useBidOrBuy()

  const value = parseFloat(useBidOrBuyValue() as any)

  const auctionNFT = useAuctionNFT()

  if (!auctionNFT) {
    popup({ success: false, message: 'noNFT' })
    history.goBack()
    return null
  }

  const { ownername, nft } = auctionNFT

  if (value === 0) {
    popup({ success: false, message: 'noValue' })
    history.goBack()
    return null
  }

  const service = (): number => value * 1

  const total = (value: any, service: any): number => {
    return parseFloat(value) + parseFloat(service)
  }

  const confirm = () => {
    if (bidOrBuy) placebid()
    else buynft()
  }

  return (
    <MarginLeft>
      <Right minHeight="74vh">
        <Bold margin="5px 0px">{t(bidOrBuy ? 'confirmBidding' : 'confirmPayment')}</Bold>
        <TextBlack>{t('bidDesc')}<span>{nft?.name}</span>{t('by')} <span>{shortenAddress(nft.owner, 6)}</span></TextBlack>
        <SpaceBetween>
          <Bold margin="5px 0px">{t(bidOrBuy ? 'biddingOffer' : 'paymentAmount')}</Bold>
          <Bold margin="5px 0px">{value} STFI</Bold>
        </SpaceBetween>
        <Border />
        <SpaceBetween>
          <SemiBold>{t(bidOrBuy ? 'biddingBalance' : 'paymentBalance')}</SemiBold>
          <Bold margin="5px 0px">{value} STFI</Bold>
        </SpaceBetween>
        <SpaceBetween>
          <SemiBold>{t('yourBalance')}</SemiBold>
          <Bold margin="5px 0px">{balance} STFI</Bold>
        </SpaceBetween>
        <SpaceBetween>
          <SemiBold>{t('serviceFees')}</SemiBold>
          <Bold margin="5px 0px">{service()} STFI</Bold>
        </SpaceBetween>
        <Border />
        <SpaceBetween>
          <Bold margin="5px 0px">{t(bidOrBuy ? 'totalBidAmount' : 'totalPaymentAmount')}</Bold>
          <Bold margin="5px 0px">{total(value, service())} STFI</Bold>
        </SpaceBetween>
        <ButtonBlack onClick={() => confirm()}>{t(bidOrBuy ? 'confirmBidding' : 'confirmPayment')}</ButtonBlack>
        <ButtonWishlist nftId={nft.id} type="NFTConfirm" />
        <ButtonTransparent onClick={() => history.goBack()}>
          {t(bidOrBuy ? 'cancelBidding' : 'cancelPayment')}
        </ButtonTransparent>
      </Right>
    </MarginLeft>
  )
}

export default Payment
