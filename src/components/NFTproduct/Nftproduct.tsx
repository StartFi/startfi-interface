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
  OwnerText
} from './Nftproduct.styles'
import ReadMore from '../ReadMore/readmore'
import { useTranslation } from 'react-i18next'
import BidOrBuy from 'components/BidOrBuy'
import { useParams } from 'react-router-dom'
import { useGetNftDetails, useNFTDetails } from 'state/marketplace/hooks'
import uriToHttp from 'utils/uriToHttp'
import { NFT } from 'services/models/NFT'
// import { NFT } from 'services/models/NFT'
import ButtonWishlist from 'components/Button/ButtonWishlist'


import { usePopup } from 'state/application/hooks'
import { useHistory, useParams } from 'react-router-dom'
import { useAuctionNFT, useGetAuctionNFT } from 'state/marketplace/hooks'

import uriToHttp from 'utils/uriToHttp'
import { AuctionNFT } from 'services/models/AuctionNFT'

interface NFTParams {
  nft: string
  auction: string
}

const Nftproduct = () => {
  const { t } = useTranslation()
  const [isReadMore, setIsReadMore] = useState('')

  const [isOpen, setIsOpen] = useState(false)

  const [bidOrBuy, setBidOrBuy] = useState(false)
  const param: RouterParam = useParams()


  

  useGetNftDetails(nftId)
  const NFTDetails: NFT | null = useNFTDetails()
  const imgUrl = uriToHttp(`${NFTDetails?.image}`)[0]


  const { nft, auction }: NFTParams = useParams()

  useGetAuctionNFT(parseInt(nft), auction)
  const auctionNFT: AuctionNFT | null = useAuctionNFT()

  const popup = usePopup()





  if (!nft || !auction) {
    popup({ success: false, message: 'No nft selected' })
    history.goBack()
    return null
  }

  const nftId = parseInt(nft)



  const imgUrl = uriToHttp(`${auctionNFT?.nft.image}`)[0]


  const showScroll = (readMore: boolean) => {
    readMore ? setIsReadMore('scroll') : setIsReadMore('')
  }

  return (
    <Grid>
      <BidOrBuy bidOrBuy={bidOrBuy} isOpen={isOpen} close={() => setIsOpen(false)} />


      <NFTsHeader />
      <Grid>
        <LeftGrid>
          <ImgCard>
            <img src={imgUrl} />

            <p>1234 {t('views')}</p>
          </ImgCard>
          <LeftTextCard>
            <CreatedTitle>
              <p>
                {t('createdBy')}
                <span>{NFTDetails?.name}</span>
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
            <p>Apple Watch Series 4 GPS</p>
          </RightTitle>
          <RightSubTitle>{t('prediction')}: Round 11 (Bronze) - Only 100 Available</RightSubTitle>
          <PublisherCard height='91px'>
            <div>
              <p>
                {t('publisher')} :<span>Muhammed Amin</span>
              </p>
              <p>8% {t('resellingPercentage')}</p>
            </div>
          </PublisherCard>
          <PublisherCard height='60px'>
            <div>
              <p>
                {t('owner')} <span>{NFTDetails?.owner}</span>
              </p>
            </div>
          </PublisherCard>
          <BuyCard>
            <BuyCost>
              <p>
                {t('cost')} : <span>{NFTDetails?.price} ETH</span>
              </p>
            </BuyCost>
            <BuyButtons $opacity={false}>
              <ButtonWishlist nftId={nftId} type='NFTProduct' />
              <button
                onClick={() => {
                  setBidOrBuy(true)
                  setIsOpen(true)
                }}
              >
                {t('offer')}
              </button>
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
              <p>About Apple Watch Series 4 GPS</p>
            </DescriptionTitle>
            <DescriptionText>
              <ReadMore showScroll={showScroll}>
                <p>
                  {/* he biggest fight of the year is set for May 8 at AT&T Stadium in Arlington, Texas, as WBA, WBC and
                  Ring Magazine champion and the number one pound-for-pound fighter in the world, Canelo Alvarez, meets
                  Billy Joe Saunders, the holder of the WBO belt, in a battle for super middleweight supremacy. This
                  stunning collection of. he biggest fight of the year is set for May 8 at AT&T Stadium in Arlington,
                  Texas, as WBA, WBC and Ring Magazine champion and the number one pound-for-pound fighter in the world,
                  Canelo Alvarez, meets Billy Joe Saunders, the holder of the WBO belt, in a battle for super
                  middleweight supremacy. This stunning collection of */}
                  {NFTDetails?.description}
                </p>
              </ReadMore>
            </DescriptionText>
          </DescriptionCard>
        </RightGrid>
      </Grid>
    </Container>

)
  
}

export default Nftproduct
