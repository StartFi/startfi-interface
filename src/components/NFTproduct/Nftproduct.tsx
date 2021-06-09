import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import Vector from '../../assets/svg/Vector.svg'
import Path from '../../assets/svg/Path.svg'
import { useStyles } from './Nftproduct.styles'
import ReadMore from '../ReadMore/readmore'
import NFTsHeader from 'components/Header/NFTsHeader'
import styled from 'styled-components'
import * as faker from 'faker'
import { AuctionItem } from 'services/Storage/Auction'
import { useDispatch } from 'react-redux'
import { addAuctionItem } from 'state/auction/actions'
import { useParams } from 'react-router-dom'
import { updateUserWishList } from 'state/user/actions'
import { useUserDoc } from 'state/user/hooks'

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

const NFTS = styled(Grid)({
  padding: '4vh 3.2vw',
  width: '100%'
})

// type comProps={}

const Nftproduct = (props: {}) => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const image = 'https://picsum.photos/200'
  const [isReadMore, setIsReadMore] = useState(false)

  const param: RouterParam = useParams()
  const accountId = useUserDoc()?.ehAddress
  const nftId = parseInt(param.id)



  // add Nft Id to user wish list
  const addToWishList = () => {
    let payLoad = {
      accountId,
      nftId
    }
 
    dispatch(updateUserWishList(payLoad))
  }

  const showScroll = (res: boolean) => {
    setIsReadMore(res)
  }

  // for testing only
  const addToAuction = (item: AuctionItem) => {
    dispatch(addAuctionItem(item))
  }
  return (
    <NFTS container direction='column'>
      <NFTsHeader />
      <Grid className={classes.container} container direction='row' justify='center'>
        {/* left */}
        {/* <Grid item> */}
        <div>
          <Grid container direction='column'>
            <Card className={classes.img}>
              <div>
                <img src={Vector} />
                <p>1234 Views</p>{' '}
              </div>

              <CardMedia className={classes.img} component='img' image={image} title='IMG' />
            </Card>

            {/* created by */}
            <Card className={classes.created}>
              <div className={classes.created_title}>
                <p>
                  Details created By<span>Muhammed Amin</span>
                </p>
              </div>

              <div className={classes.created_text}>
                <p>
                  Put your NFT assets up as collateral for a loan, or offer loans to other users on their non-fungible
                  tokens Put your NFT assets up as collateral for a loan, or offer loans to other users on their
                  non-fungible tokens
                </p>
              </div>
            </Card>
          </Grid>
        </div>

        {/* </Grid> */}

        {/* right */}
        <div>
          <Grid container direction='column'>
            <div className={classes.title}>
              <p>Apple Watch Series 4 GPS</p>
            </div>
            <div className={classes.subtitle}>Prediction: Round 11 (Bronze) - Only 100 Available</div>

            <Card className={classes.owner}>
              <div>
                <p>
                  owned by :<span>Muhammed Amin</span>
                </p>
              </div>
            </Card>

            <Card className={classes.buy}>
              <div className={classes.buy__cost}>
                <p>
                  Cost : <span>180 ETH</span>
                </p>
              </div>
              <div className={classes.buy__buttons}>
                <img className={classes.icon} src={Path} />
                <button onClick={addToWishList}>Wishlist</button>

                <button onClick={() => addToAuction(auctionItem)}>Make an offer</button>
              </div>
              <div>
                <button className={classes.buy__now}>BUY NOW</button>
              </div>
            </Card>
            <Card className={isReadMore ? classes.description__Scroll : classes.description}>
              <div className={classes.description__title}>
                <p>About Apple Watch Series 4 GPS</p>
              </div>
              <div className={classes.description__text}>
                <ReadMore showScroll={showScroll}>
                  <p>
                    he biggest fight of the year is set for May 8 at AT&T Stadium in Arlington, Texas, as WBA, WBC and
                    Ring Magazine champion and the number one pound-for-pound fighter in the world, Canelo Alvarez,
                    meets Billy Joe Saunders, the holder of the WBO belt, in a battle for super middleweight supremacy.
                    This stunning collection of. he biggest fight of the year is set for May 8 at AT&T Stadium in
                    Arlington, Texas, as WBA, WBC and Ring Magazine champion and the number one pound-for-pound fighter
                    in the world, Canelo Alvarez, meets Billy Joe Saunders, the holder of the WBO belt, in a battle for
                    super middleweight supremacy. This stunning collection of
                  </p>
                </ReadMore>
              </div>
            </Card>
          </Grid>
        </div>
      </Grid>
    </NFTS>
  )
}

export default Nftproduct
