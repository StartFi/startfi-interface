import React from 'react'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import Vector from '../../assets/svg/Vector.svg'

import { useStyles } from './Nftproduct.styles'

const Nftproduct = () => {
  const classes = useStyles()
  const image='https://picsum.photos/200'
  return (
    <div>
      <Grid className={classes.container} container direction='row'>
        {/* left */}
        {/* <Grid item> */}
        <div>
          <Grid container direction='column'>
            <Card className={classes.img}>
              <div>
              <img src={Vector}/>
                <p>1234 Views</p>              </div>

            <CardMedia className={classes.img} component="img" image={image} title="IMG" />

            </Card>

            {/* created by */}
            <Card className={classes.created}>
              <div>
                <p>Details created By<span>Muhammed Amin</span></p>
              </div>
             <div>
             <p>
              Put your NFT assets up as collateral for a loan, or offer loans to other users on their non-fungible tokens Put your NFT assets up as collateral for a loan, or offer loans to other users on their non-fungible tokens
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
            <div className={classes.subtitle}>
            Prediction: Round 11 (Bronze) - Only 100 Available
            </div>

            <Card className={classes.owner}></Card>
            <Card className={classes.buy}></Card>
            <Card className={classes.description}></Card>

          </Grid>
        </div>
      </Grid>
    </div>
  )
}

export default Nftproduct
