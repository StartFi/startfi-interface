import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import Vector from '../../assets/svg/Vector.svg'
import Path from '../../assets/svg/Path.svg'

import { useStyles } from './Nftproduct.styles'
import ReadMore from '../ReadMore/readmore'

const Nftproduct = () => {
  const classes = useStyles()
  const image = 'https://picsum.photos/200'
  const [isReadMore, setIsReadMore] = useState(false)

  const showScroll = (res: boolean) => {
    setIsReadMore(res)
  }
  return (
    <div>
      <Grid className={classes.container} container direction='row'>
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
                <button>Wishlist</button>

                <button>Make an offer</button>
              </div>
              <div>
                <button className={classes.buy__now}>BUY NOW</button>
              </div>
            </Card>
            <Card className={isReadMore ?   classes.description__Scroll:classes.description}>
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
    </div>
  )
}

export default Nftproduct
