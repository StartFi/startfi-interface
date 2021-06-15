import NFTsHeader from 'components/Header/NFTsHeader'
import WaitingConfirmation from 'components/WaitingConfirmation'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import {
  useAuctionNFT,
  useBidOrBuy,
  useBidOrBuyValue,
  useBuyNFT,
  useConfirmationLoading,
  usePlaceBid,
  useSetConfirmationLoading
} from 'state/marketplace/hooks'
import { useUserBalance } from 'state/user/hooks'
import styled from 'styled-components'
import { shortenAddress } from 'utils'
import uriToHttp from 'utils/uriToHttp'

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
`

const Left = styled.div`
  flex-grow: 1;
  border-right: 1px solid #eeeeee;
  padding-right: 4vw;
`

const Right = styled.div`
  width: 28vw;
  margin-left: 4vw;
  padding: 3vh 2vw;
  background-color: #fafafa;
  border-radius: 8px;
  min-height: 74vh;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
`

const Row = styled.div`
  display: flex;
  flex-flow: row nowrap;
`

const Rows = styled(Row)`
  margin-bottom: 5vh;
`

const SpaceBetween = styled(Row)`
  justify-content: space-between;
  align-items: baseline;
`

const Baseline = styled(Row)`
  align-items: baseline;
`

const Column = styled.div`
  margin-left: 2vw;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  width: 100%;
`

const Bold = styled.div`
  font-weight: bold;
  letter-spacing: 0.04em;
  font-size: 18px;
  color: #000000;
  text-transform: capitalize;
`

const MarginRight = styled(Bold)`
  min-width: 7vw;
  margin-right: 1vw;
`

const Bold16 = styled.div`
  font-weight: bold;
  font-size: 16px;
  color: #000000;
  letter-spacing: 0.04em;
  margin-right: 1vw;
`

const Text = styled.div`
  letter-spacing: 0.04em;
  color: #323232;
`

const TextBlack = styled(Text)`
  color: #000000;
  line-height: 28px;
`

const SemiBold = styled.div`
  font-weight: 500;
  font-size: 16px;
  letter-spacing: 0.04em;
  color: #000000;
  text-transform: capitalize;
`

const Border = styled.div`
  border-bottom: 1px solid #eeeeee;
  width: 100%;
`

const MarginLeftBorder = styled(Border)`
  margin-left: -1vw;
`

const MarginBorder = styled(Border)`
  margin: 2vh 0;
  width: 98%;
`

const MarginBottom = styled.div`
  margin-bottom: 1.5vh;
`

const Img = styled.img`
  width: 13vw;
  height: 26vh;
  border-radius: 8px;
  border: none;
`

const ButtonConfirmBid = styled.button`
  box-sizing: border-box;
  border: none;
  border-radius: 4px;
  width: 24vw;
  height: 6vh;
`
const ButtonBlack = styled(ButtonConfirmBid)`
  background-color: #000000;
  color: #ffffff;
`
const ButtonTransparent = styled(ButtonConfirmBid)`
  background-color: transparent;
`

const ButtonTransparentBorder = styled(ButtonTransparent)`
  border: 1px solid #000000;
`

const Padding = styled.div`
  padding: 4vh 3.2vw;
  width: 100%;
`

const NFTConfirm: React.FunctionComponent = () => {
  const { t } = useTranslation()

  const history = useHistory()

  const balance = useUserBalance()

  const auctionNFT = useAuctionNFT()

  const placebid = usePlaceBid()

  const buynft = useBuyNFT()

  const bidOrBuy = useBidOrBuy()

  const v: any = useBidOrBuyValue()

  const value = parseFloat(v)

  const confimration = useConfirmationLoading()

  const setConfirmation = useSetConfirmationLoading()

  if (!auctionNFT) {
    alert('No nft selected')
    history.goBack()
    return null
  }

  if (value === 0) {
    alert('No value')
    history.goBack()
    return null
  }

  const { ownername, issuername, ownerdetails, nft } = auctionNFT

  const service = (): number => value * 1

  const total = (value: any, service: any): number => {
    return parseFloat(value) + parseFloat(service)
  }

  const confirm = () => {
    setConfirmation(true)
    if (bidOrBuy) placebid()
    else buynft()
  }

  return (
    <Padding>
      <NFTsHeader />
      <Container>
        <WaitingConfirmation isOpen={confimration} bidOrBuy={bidOrBuy} owner={nft.owner} ownername={ownername} />
        <Left>
          <Rows>
            <Img src={uriToHttp(nft.image)[1]} />
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
        <Right>
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
          <ButtonTransparentBorder onClick={() => {}}>{t('addToWhitelist')}</ButtonTransparentBorder>
          <ButtonTransparent onClick={() => history.goBack()}>
            {t(bidOrBuy ? 'cancelBidding' : 'cancelPayment')}
          </ButtonTransparent>
        </Right>
      </Container>
    </Padding>
  )
}

export default NFTConfirm
