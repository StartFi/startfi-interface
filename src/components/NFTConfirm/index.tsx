import { useActiveWeb3React } from 'hooks';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router';
import { useHistory } from 'react-router-dom';
// import { NFT } from 'state/nfts/reducer';
import { useETHBalances } from 'state/wallet/hooks';
import styled from 'styled-components';

interface NFTConfirmProps {
    bid: boolean
    value: number
    service: number
    nft: any
}

const Container = styled.div`
width: 100%;
display: flex;
flex-flow: row nowrap;
`

const Left = styled.div`
border-right: 1px solid #EEEEEE;
padding-right: 4vw;
`

const Right = styled.div`
margin-left: 4vw;
padding: 3vh 2vw;
background-color: #FAFAFA;
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
`

const Border = styled.div`
border-bottom: 1px solid #EEEEEE;
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

const Img = styled.div`
width: 13vw;
height: 26vh;
background-color: red;
border-radius: 8px;
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
color: #FFFFFF;
`
const ButtonTransparent = styled(ButtonConfirmBid)`
background-color: transparent;
`

const ButtonTransparentBorder = styled(ButtonTransparent)`
border: 1px solid #000000;
`

const Nft = {
    name: "Apple Watch Series 4 GPS",
    publisher: "Muhammed Amin",
    ownername: "Mohamed Mounier El - King",
    description: "he biggest fight of the year is set for May 8 at AT&T Stadium in Arlington, Texas, as WBA, WBC and Ring Magazine champion and the number one pound-for-pound fighter in the world, Canelo Alvarez, meets Billy Joe Saunders, the holder of the WBO belt, in a battle for super middleweight supremacy.This stunning collection",
    reselling: 8,
    owner: "0x86f241af1...857c",
    details: "Put your NFT assets up as collateral for a loan, or offer loans to other users on their non-fungible tokens Put your NFT assets up as collateral for a loan, or offer loans to other users on their non-fungible tokens",
}

const NFTConfirm: React.FunctionComponent<NFTConfirmProps> = () => {

    const { t } = useTranslation()

    const location = useLocation()

    const history = useHistory()

    console.log(location)

    var state = {bid:false,value:0.0223,nft:Nft}

    const { bid, value, nft } = state as NFTConfirmProps

    const { account } = useActiveWeb3React()

    const balance = useETHBalances(account ? [account] : [])?.[account ?? '']

    const service = (): number => value * 1

    const total = (): number => value + service()

  return <Container>
      <Left>
          <Rows>
              <Img/>
              <Column>
                  <Bold>{nft.name}</Bold>
                  <Text>Prediction: Round 11 (Bronze) - Only 100 Available</Text>
              <MarginLeftBorder/>
                  <Baseline>
                  <MarginRight>{t('publisher')}</MarginRight>
                  <SemiBold>{nft.publisher}</SemiBold>
                  </Baseline>
                  <SemiBold>{nft.reselling}% {t('reselling')}</SemiBold>
              <MarginLeftBorder/>
                  <Baseline>
                      <MarginRight>{t('owner')}</MarginRight>
                      <SemiBold>{nft.ownername}</SemiBold>
                      </Baseline>
              </Column>
          </Rows>
          <MarginBorder/>
              <MarginBottom><Bold>{t('about')} {nft.name}</Bold></MarginBottom>
              <TextBlack>{nft.description}</TextBlack>
          <MarginBorder/>
              <MarginBottom><Baseline>
                  <Bold16>{t('detailsCreated')}</Bold16>
                  <Bold>{nft.ownername}</Bold>
            </Baseline>
            </MarginBottom>
            <TextBlack>{nft.details}</TextBlack>
      </Left>
      <Right>
          <Bold>{t(bid ? 'confirmBidding' : 'confirmPayment')}</Bold>
          <TextBlack>{t('bidDesc')}{nft.ownername}{nft.owner}</TextBlack>
          <SpaceBetween><Bold>{t(bid ? 'biddingOffer' : 'paymentAmount')}</Bold><Bold>{value} STFI</Bold></SpaceBetween>
          <Border/>
          <SpaceBetween><SemiBold>{t(bid ? 'biddingBalance' : 'paymentBalance')}</SemiBold><Bold>{value} STFI</Bold></SpaceBetween>
          <SpaceBetween><SemiBold>{t('yourBalance')}</SemiBold><Bold>{balance?.toSignificant(5)} STFI</Bold></SpaceBetween>
          <SpaceBetween><SemiBold>{t('serviceFees')}</SemiBold><Bold>{service()} STFI</Bold></SpaceBetween>
          <Border/>
          <SpaceBetween><Bold>{t(bid ? 'totalBidAmount' : 'totalPaymentAmount')}</Bold><Bold>{total()} STFI</Bold></SpaceBetween>
          <ButtonBlack>{t(bid ? 'confirmBidding' : 'confirmPayment')}</ButtonBlack>
          <ButtonTransparentBorder>{t('addToWhitelist')}</ButtonTransparentBorder>
          <ButtonTransparent onClick={()=>history.push('nft', {nft})}>{t(bid ? 'cancelBidding' : 'cancelPayment')}</ButtonTransparent>
      </Right>
  </Container>;
};

export default NFTConfirm;
