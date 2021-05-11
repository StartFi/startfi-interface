import React from 'react'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Icon from '@material-ui/core/Icon'
import {useStyles} from './ntfcard.styles';
import {NftButton} from '../Button/index'





export interface NftCardContent {
  ntfImg: string
  title: string
  price: string
  description: string
}
interface NftCardProps {
  cardContent: NftCardContent
  navigateToCard: (clickedCard: NftCardContent) => void
  addToWhiteList: (clickedCard: NftCardContent) => void
  placeBide: (clickedCard: NftCardContent) => void
}

const NTFCard: React.FC<NftCardProps> = ({ cardContent }) => {
  const classes = useStyles()
  return (
    <div>
      <Card>
        <CardActionArea>
          <CardMedia className={classes.media} image={cardContent.ntfImg} title='Contemplative Reptile' />
          <CardContent>
            <div className={classes.price}>
              <h3>{cardContent.price}</h3>
            </div>
            <div>
              <h2>{cardContent.title}</h2>
              <p> {cardContent.description}</p>
            </div>
          </CardContent>
        </CardActionArea>
        <CardActions className={classes.action} >
            <div className={classes.whiteList} >
            <Icon className={classes.icon}>favorite_border</Icon>
            <NftButton>
            WhiteList
          </NftButton>
            </div>
            <div>
            <NftButton> place a bid</NftButton>
            </div>




        </CardActions>
      </Card>
    </div>
  )
}

export default NTFCard
