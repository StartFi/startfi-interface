import React, { useState } from 'react'
import Rectangle from '../../assets/images/Rectangle.png'
import Path from '../../assets/svg/Path.svg'

import {
  Grid,
  LeftGrid,
  RightGrid,
  ImgCard,
  Container,
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
  DescriptionText
} from './Nftproduct.styles'
import ReadMore from '../ReadMore/readmore'
import NFTsHeader from 'components/Header/NFTsHeader'
import { useTranslation } from 'react-i18next'
import BidOrBuy from 'components/BidOrBuy'
import {  useParams } from 'react-router-dom'
import { useGetNftDetails, useNFTDetails } from 'state/marketplace/hooks'
// import { NFT } from 'services/models/NFT'



type RouterParam = {
  id: string
}

const Nftproduct = () => {
  const { t } = useTranslation()
  const [isReadMore, setIsReadMore] = useState('')

  const showScroll = (readMore: boolean) => {
    readMore ? setIsReadMore('scroll') : setIsReadMore('')
  }

  const [isOpen, setIsOpen] = useState(false)

  const [bidOrBuy, setBidOrBuy] = useState(false)
  const param: RouterParam = useParams()

  const nftId = parseInt(param.id)
useGetNftDetails(nftId)
const NFTDetails=useNFTDetails()



  return (
    <Container>
      <BidOrBuy bidOrBuy={bidOrBuy} isOpen={isOpen} close={() => setIsOpen(false)} />
      <NFTsHeader />
      <Grid>
        <LeftGrid>
          <ImgCard>
            <img src={Rectangle} />
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
          <PublisherCard height="91px">
            <div>
              <p>
                {t('publisher')} :<span>Muhammed Amin</span>
              </p>
              <p>8% {t('resellingPercentage')}</p>
            </div>
          </PublisherCard>
          <PublisherCard height="60px">
            <div>
              <p>
                {t('owner')} :<span>Mohamed Mounier El - King</span>
              </p>
            </div>
          </PublisherCard>
          <BuyCard>
            <BuyCost>
              <p>
                {t('cost')} : <span>180 ETH</span>
              </p>
            </BuyCost>
            <BuyButtons>
              <img src={Path} />

              <button>{t('wishlist')}</button>
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
                  he biggest fight of the year is set for May 8 at AT&T Stadium in Arlington, Texas, as WBA, WBC and
                  Ring Magazine champion and the number one pound-for-pound fighter in the world, Canelo Alvarez, meets
                  Billy Joe Saunders, the holder of the WBO belt, in a battle for super middleweight supremacy. This
                  stunning collection of. he biggest fight of the year is set for May 8 at AT&T Stadium in Arlington,
                  Texas, as WBA, WBC and Ring Magazine champion and the number one pound-for-pound fighter in the world,
                  Canelo Alvarez, meets Billy Joe Saunders, the holder of the WBO belt, in a battle for super
                  middleweight supremacy. This stunning collection of
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
