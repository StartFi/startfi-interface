import React, { useState } from 'react'

import {
  Grid,
  LeftGrid,
  RightGrid,
  ImgCard,
  LeftTextCard,
  CreatedTitle,
  CreatedText,
  RightTitle,
  RightSubTitle,
  PublisherCard,
  BuyCard,
  BuyButtons,
  BuyCost,
  BuyNow,
  DescriptionCard,
  DescriptionTitle,
  DescriptionText,
  OwnerText,
  NoStakes,
  GetNow,
  Name,
  Stakes
} from './Nftproduct.styles'
import ReadMore from '../ReadMore/readmore'
import { useTranslation } from 'react-i18next'
import BidOrBuy from 'components/BidOrBuy'
import ButtonWishlist from 'components/Button/ButtonWishlist'
import { usePopup } from 'state/application/hooks'
import { useHistory, useParams } from 'react-router-dom'
import { useAuctionNFT, useGetAuctionNFT } from 'state/marketplace/hooks'
import uriToHttp from 'utils/uriToHttp'
import { AuctionNFT } from 'services/models/AuctionNFT'
import { useUserBalance } from 'state/user/hooks'

interface NFTParams {
  nft: string
  auction: string
}

const Nftproduct = () => {
  const { t } = useTranslation()

  const [isReadMore, setIsReadMore] = useState('')

  const [isOpen, setIsOpen] = useState(false)

  const [bidOrBuy, setBidOrBuy] = useState(false)

  const { nft, auction }: NFTParams = useParams()

  useGetAuctionNFT(nft, auction)

  const auctionNFT: AuctionNFT | null = useAuctionNFT()

  const popup = usePopup()

  const history = useHistory()

  const balance = useUserBalance()

  if (!nft || !auction) {
    popup({ success: false, message: 'noNFT' })
    history.goBack()
    return null
  }

  const nftId = parseInt(nft)

  const imgUrl = uriToHttp(`${auctionNFT?.nft?.dataHash}`)[1]

  const noStakes =
    balance &&
    auctionNFT &&
    (parseFloat(balance) < auctionNFT.auction.listingPrice ||
      (auctionNFT.auction.minBid && parseFloat(balance) < auctionNFT.auction.minBid))

  const showScroll = (readMore: boolean) => {
    readMore ? setIsReadMore('scroll') : setIsReadMore('')
  }

  return (
    <Grid>
      <BidOrBuy bidOrBuy={bidOrBuy} isOpen={isOpen} close={() => setIsOpen(false)} />
      <LeftGrid>
        <ImgCard>
          <img src={imgUrl} alt='NFT' />
        </ImgCard>
        <LeftTextCard>
          <CreatedTitle>
            <p>
              {t('createdBy')}
              <span>{auctionNFT?.nft.name}</span>
            </p>
          </CreatedTitle>
          <CreatedText>
            {/* text created by user */}
            <p>
              Put your NFT assets up as collateral for a loan, or offer loans to other users on their non-fungible
              tokens Put your NFT assets up as collateral for a loan, or offer loans to other users on their
              non-fungible tokens
            </p>
          </CreatedText>
        </LeftTextCard>
      </LeftGrid>
      <RightGrid>
        <RightTitle>
          {/* text created by user */}

          <Name>
            <p>{auctionNFT?.nft.name}</p>
            {noStakes && (
              <Stakes>
                <NoStakes>{t('needsMoreStakes')}</NoStakes>
                <GetNow onClick={() => history.push('/')}>{t('getNow')}</GetNow>
              </Stakes>
            )}
          </Name>
        </RightTitle>
        <RightSubTitle>{t('prediction')}: Round 11 (Bronze) - Only 100 Available</RightSubTitle>
        <PublisherCard height='91px'>
          <div>
            <p>
              {t('publisher')} :<span>{auctionNFT?.issuername}</span>
            </p>
            <p>8% {t('resellingPercentage')}</p>
          </div>
        </PublisherCard>
        <PublisherCard height='60px'>
          <OwnerText>
            <p>{t('owner')} :</p>
            <span>{auctionNFT?.nft?.owner}</span>
          </OwnerText>
        </PublisherCard>
        <BuyCard>
          <BuyCost>
            <p>
              {t('cost')} : <span>{auctionNFT?.auction?.listingPrice}</span>
            </p>
          </BuyCost>
          <BuyButtons $opacity={false}>
            <ButtonWishlist nftId={nftId} type='NFTProduct' />
            {/* <button
              onClick={() => {
                setBidOrBuy(true)
                setIsOpen(true)
              }}
            >
              {t('offer')}
            </button> */}
          </BuyButtons>
          <BuyNow>
            <button
              onClick={() => {
                setBidOrBuy(false)
                setIsOpen(true)
              }}
            >
              {t('buy')}
            </button>
          </BuyNow>
        </BuyCard>
        <DescriptionCard overflowY={isReadMore}>
          <DescriptionTitle>
            <p>About {auctionNFT?.nft.name}</p>
          </DescriptionTitle>
          <DescriptionText>
            <ReadMore showScroll={showScroll}>
              <p>{auctionNFT?.nft?.description}</p>
            </ReadMore>
          </DescriptionText>
        </DescriptionCard>
      </RightGrid>
    </Grid>
  )
}

export default Nftproduct
