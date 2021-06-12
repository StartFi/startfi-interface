import React, { useEffect, useState } from 'react'
import Rectangle from '../../assets/images/Rectangle.png'
import Path from '../../assets/svg/Path.svg'

import * as faker from 'faker'
import { AuctionItem } from 'services/Storage/Auction'
import { useDispatch } from 'react-redux'
import { addAuctionItem } from 'state/auction/actions'
import { useParams } from 'react-router-dom'
import { clearError, updateUserWishList } from 'state/user/actions'
import { useUserDoc, useUserError, useUserWhishListItem, useWishListLoading } from 'state/user/hooks'
import ErrorDialogue from '../Error/index'

// type comProps={}

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
  DescriptionText,
  LoadingDiv
} from './Nftproduct.styles'
import ReadMore from '../ReadMore/readmore'
import NFTsHeader from 'components/Header/NFTsHeader'
import Modal from 'components/Modal'
// import { LoadingView } from 'components/ModalViews'
import Loader from 'components/Loader'

// for testing only
const auctionItem: AuctionItem = {
  listingPrice: faker.random.number(),
  seller: faker.random.word(),
  buyer: faker.random.word(),
  isForSale: faker.random.boolean(),
  isForBid: faker.random.boolean(),
  bids: [4],
  listTime: faker.random.word(),
  purchaseTime: faker.random.word(),
  expireTimestamp: faker.random.word(),
  listingTxt: faker.random.word(),
  purchaseTxt: faker.random.word(),
  soldPrice: faker.random.number()
}

type RouterParam = {
  id: string
}
const Nftproduct = () => {
  const [isReadMore, setIsReadMore] = useState('')
  const [loading, setIsLoading] = useState(false)
  const [wishListItem, setWhishListItem] = useState(false)

  const error = useUserError()

  let open = error?.hasError ? true : false
  const param: RouterParam = useParams()

  const nftId = parseInt(param.id)
  const dispatch = useDispatch()
  const accountId = useUserDoc()?.ethAddress

  const userWishListItem = useUserWhishListItem(nftId)
  const wishListAdding =useWishListLoading()


  useEffect(() => {
    dispatch(clearError())
    setWhishListItem(userWishListItem)
    setIsLoading(wishListAdding)
  }, [wishListAdding])

  const showScroll = (res: boolean) => {
    res ? setIsReadMore('scroll') : setIsReadMore('')
  }

  // clear error state + close Error dialogue
  const onDismiss = () => {
    console.log('change')
    dispatch(clearError())
  }

  // for testing only
  const addToAuction = (item: AuctionItem) => {
    setIsLoading(true)
    dispatch(addAuctionItem(item))
  }

  // const loadingDismiss = () => {
  //   setIsLoading(false)
  // }
  // if (loading) {
  //   return (

  //       <div>loading...</div>
  //     </Loader>
  //   )
  // }

  return (


    <Container opacity={loading}>
      <Modal isOpen={open} onDismiss={onDismiss} maxHeight={150}>
        <ErrorDialogue message={error?.message} />
      </Modal>
      <NFTsHeader />
      <Grid>
      <LoadingDiv display={loading} >
      <Loader size="40px"></Loader>
      </LoadingDiv>
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
            <BuyButtons opacity={wishListItem}>
              <img src={Path} />
              <button disabled={wishListItem} onClick={() => dispatch(updateUserWishList({ accountId, nftId }))}>
                Wishlist
              </button>

              <button onClick={() => addToAuction(auctionItem)}>
                Make an offer
              </button>
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
