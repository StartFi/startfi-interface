import React, { useEffect, useState } from 'react'
import Rectangle from '../../assets/images/Rectangle.png'
import Path from '../../assets/svg/Path.svg'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { clearError, clearSuccess, getUserDocs, updateUserWishList } from 'state/user/actions'
import {
  useUserDoc,
  useUserError,
  useUserWhishListItem,
  useWishListAddingSuccess,
  useWishListLoading
} from 'state/user/hooks'
import ErrorDialogue from '../Error/index'
import Modal from 'components/Modal'

import Loader from 'components/Loader'
import SuccessDialogue from 'components/Success'

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
import { useTranslation } from 'react-i18next'
import BidOrBuy from 'components/BidOrBuy'

type RouterParam = {
  id: string
}
const Nftproduct = () => {
  const { t } = useTranslation()
  const [isReadMore, setIsReadMore] = useState('')
  const [loading, setIsLoading] = useState(false)
  const [wishListItem, setWhishListItem] = useState(false)
  const [open, setOpen] = useState(false)

  const error = useUserError()

  const param: RouterParam = useParams()

  const nftId = parseInt(param.id)
  const dispatch = useDispatch()
  const accountId = useUserDoc()?.ethAddress
  // get user wish list item
  const userWishListItem = useUserWhishListItem(nftId)

  // adding wishList Item
  const wishListAdding = useWishListLoading()
  // wishList Item adding success
  const wishListAddingSuccess = useWishListAddingSuccess()

  useEffect(() => {
    error?.hasError || wishListAddingSuccess?.success ? setOpen(true) : setOpen(false)
    setWhishListItem(userWishListItem)
    setIsLoading(wishListAdding)
    dispatch(getUserDocs(accountId))
  }, [wishListAdding, wishListAddingSuccess, error])

  const showScroll = (readMore: boolean) => {
    readMore ? setIsReadMore('scroll') : setIsReadMore('')
  }

  // clear error state + close Error dialogue
  const onDismiss = () => {
    if (error) {
      dispatch(clearError())
    }
    if (wishListAddingSuccess.success) {
      dispatch(clearSuccess())
    }
  }

  // clear any dialogue if user leave the page with out closing
  setTimeout(() => {
    onDismiss()
  }, 1500)
  // for testing only
  let dialogue
  if (error) {
    dialogue = <ErrorDialogue message={error?.message} />
  }

  if (wishListAddingSuccess.success) {
    dialogue = <SuccessDialogue dismiss={onDismiss} message={wishListAddingSuccess?.message} />
  }

  const [isOpen, setIsOpen] = useState(false)

  const [bidOrBuy, setBidOrBuy] = useState(false)

  return (
    <Container>
      <BidOrBuy bidOrBuy={bidOrBuy} isOpen={isOpen} close={() => setIsOpen(false)} />
      <Modal isOpen={open} onDismiss={onDismiss} maxHeight={150}>
        {dialogue}
      </Modal>
      <NFTsHeader />
      <Grid>
        <LoadingDiv $display={loading}>
          <Loader size='40px'></Loader>
        </LoadingDiv>
        <LeftGrid>
          <ImgCard>
            <img src={Rectangle} />
            <p>1234 {t('views')}</p>
          </ImgCard>
          <LeftTextCard>
            <CreatedTitle>
              <p>
                {t('createdBy')}
                <span>Muhammed Amin</span>
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
            <BuyButtons $opacity={wishListItem || wishListAdding}>
              <img src={Path} />
              <button
                disabled={wishListItem || wishListAdding}
                onClick={() => dispatch(updateUserWishList({ accountId, nftId }))}
              >
                Wishlist
              </button>

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
