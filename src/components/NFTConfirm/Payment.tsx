import React from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import { usePopup } from 'state/application/hooks'
import ButtonWishlist from 'components/Button/ButtonWishlist'
import { useAuctionNFT, useBidOrBuy, useBidOrBuyValue, useBuyNFT, usePlaceBid } from 'state/marketplace/hooks'
import { useSTFIBalance } from 'hooks/useSTFIBalance'
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
import Amount from 'components/NFTSummary/Amount'

const Payment: React.FC = () => {
  const { t } = useTranslation()

  const history = useHistory()

  const popup = usePopup()

  const balance = useSTFIBalance()

  const placebid = usePlaceBid()

  const buynft = useBuyNFT()

  const bidOrBuy = useBidOrBuy()

  const value = parseFloat(useBidOrBuyValue() as any)

  const auctionNFT = useAuctionNFT()

  if (!auctionNFT) {
    popup({ success: false, message: t('noNFT') })
    history.goBack()
    return null
  }

  const { nft } = auctionNFT

  if (value === 0) {
    popup({ success: false, message: t('noValue') })
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
    <MarginLeft marginLeft="5vw">
      <Right minHeight="74vh">
        <Bold>{t(bidOrBuy ? 'confirmBidding' : 'confirmPayment')}</Bold>
        <TextBlack>
          {t('bidDesc')}
          <span>{nft?.name}</span>
          {t('by')} <span>{shortenAddress(nft.owner, 6)}</span>
        </TextBlack>
        <SpaceBetween>
          <SemiBold>{t(bidOrBuy ? 'biddingOffer' : 'paymentAmount')}</SemiBold>
          <Amount amount={value}></Amount>
        </SpaceBetween>
        <Border width="115%" left="-23px" />

        <SpaceBetween>
          <SemiBold>{t('yourBalance')}</SemiBold>
          {balance ? <Amount amount={balance}></Amount> : null}
        </SpaceBetween>

        <Border width="115%" left="-23px" />
        <SpaceBetween>
          <SemiBold>{t(bidOrBuy ? 'totalBidAmount' : 'totalPaymentAmount')}</SemiBold>
          <Amount amount={total(value, service())}></Amount>
          {/* <Bold margin="5px 0px">{total(value, service())} STFI</Bold> */}
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
