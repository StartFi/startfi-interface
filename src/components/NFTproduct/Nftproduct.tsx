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

const Nftproduct = () => {
  const [isReadMore, setIsReadMore] = useState('')

  const showScroll = (res: boolean) => {
    res ? setIsReadMore('scroll') : setIsReadMore('')
  }

  return (
    <Container>
      <NFTsHeader />
      <Grid>
        <LeftGrid>
          <ImgCard>
            <img src={Rectangle} />
            <p>1234 Views</p>
          </ImgCard>
          <LeftTextCard>
            <CreatedTitle>
              <p>
                Details created By<span>Muhammed Amin</span>
              </p>
            </CreatedTitle>
            <CreatedText>
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
            <p>Apple Watch Series 4 GPS</p>
          </RightTitle>
          <RightSubTitle>Prediction: Round 11 (Bronze) - Only 100 Available</RightSubTitle>
          <PublisherCard height='91px'>
            <div>
              <p>
                Publisher :<span>Muhammed Amin</span>
              </p>
              <p>8% Percentage on each reselling transaction</p>
            </div>
          </PublisherCard>
          <PublisherCard height='60px'>
            <div>
              <p>
                Owner :<span>Mohamed Mounier El - King</span>
              </p>
            </div>
          </PublisherCard>
          <BuyCard>
            <BuyCost>
              <p>
                Cost : <span>180 ETH</span>
              </p>
            </BuyCost>
            <BuyButtons>
              <img src={Path} />

              <button>Wishlist</button>
              <button>Make an offer</button>
            </BuyButtons>
            <BuyNow>
              <button>BUY NOW</button>
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
