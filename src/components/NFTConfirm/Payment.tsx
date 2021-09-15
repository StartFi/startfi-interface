import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import { usePopup } from 'state/application/hooks'
import ButtonWishlist from 'UI/Buttons/ButtonWishlist'
import {
  useAuctionNFT,
  useBidOrBuy,
  useBidOrBuyValue,
  useApproveBuyNFT,
  useConfirmBuyNFT,
  usePlaceBid
} from 'state/marketplace/hooks'
import { useSTFIBalance } from 'hooks/blockchain-hooks/useSTFIBalance'
import { shortenAddress } from 'utils'
import { LoadingIcon } from 'components/WaitingConfirmation/styles'
import {
  Bold,
  Border,
  ButtonBlack,
  ButtonPaymentBlack,
  ButtonTransparent,
  MarginLeft,
  Right,
  SemiBold,
  SpaceBetween,
  TextBlack
} from './styles'
import Loading from './../../assets/icons/buttonloader.svg'
import DisplayBalance from 'components/NFTSummary/DisplayBalance'

const Payment: React.FC = () => {
  const { t } = useTranslation()
  const [loader, setLoader] = useState(false)
  const [approved, setApproved] = useState(false)
  const history = useHistory()

  const popup = usePopup()

  const balance = useSTFIBalance()

  const placebid = usePlaceBid()

  const aprroveNFT = useApproveBuyNFT(setLoader, setApproved)
  const confirmNFT = useConfirmBuyNFT(setLoader)

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
    else if (!approved) aprroveNFT()
    else confirmNFT()
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
          <DisplayBalance amount={value}></DisplayBalance>
        </SpaceBetween>
        <Border width="115%" left="-23px" />

        <SpaceBetween>
          <SemiBold>{t('yourBalance')}</SemiBold>
          {balance ? <DisplayBalance amount={balance}></DisplayBalance> : null}
        </SpaceBetween>

        <Border width="115%" left="-23px" />
        <SpaceBetween>
          <SemiBold>{t(bidOrBuy ? 'totalBidAmount' : 'totalPaymentAmount')}</SemiBold>
          <DisplayBalance amount={total(value, service())}></DisplayBalance>
          {/* <Bold margin="5px 0px">{total(value, service())} STFI</Bold> */}
        </SpaceBetween>
        <ButtonPaymentBlack onClick={() => confirm()} disabled={loader}>
          {t(bidOrBuy ? 'confirmBidding' : approved ? 'confirmPayment' : 'approvePayment')}
          {loader && (
            <MarginLeft marginLeft="2vw">
              <LoadingIcon src={Loading} alt="Loading" />
            </MarginLeft>
          )}
        </ButtonPaymentBlack>
        <ButtonWishlist nftId={nft.id} type="NFTConfirm" />

        <ButtonTransparent onClick={() => history.goBack()}>
          {t(bidOrBuy ? 'cancelBidding' : 'cancelPayment')}
        </ButtonTransparent>
      </Right>
    </MarginLeft>
  )
}

export default Payment
