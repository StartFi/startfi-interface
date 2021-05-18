import React from 'react'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
// import CardMedia from '@material-ui/core/CardMedia'
import Icon from '@material-ui/core/Icon'
import { useStyles } from './nftcard.styles'
import { NftButton } from '../Button/index'


export interface NftCardContent {
  ntfImg: string
  title: string
  price: string
  description: string
}

export interface NftCardProps {
  cardContent: NftCardContent
  navigateToCard: (clickedCard: NftCardContent) => void
  addToWhiteList: (clickedCard: NftCardContent) => void
  placeBid: (clickedCard: NftCardContent) => void
}

const NTFCard: React.FC<NftCardProps> = ({ cardContent, navigateToCard, addToWhiteList, placeBid }) => {
  const classes = useStyles()
  return (
    <div>
      <Card className={classes.card}>
        <CardActionArea>
          {/* <CardMedia className={classes.media}  component="img" image={cardContent.ntfImg} title="IMG" /> */}
          <div className={classes.media}  >
            <img src={cardContent.ntfImg}/>
          </div>


          <CardContent onClick={() => navigateToCard(cardContent)}>
            <div className={classes.price}>
              <p>{cardContent.price}</p>
            </div>
            <div>
              <h2>{cardContent.title}</h2>
              <p> {cardContent.description}</p>
            </div>
          </CardContent>
        </CardActionArea>
        <CardActions className={classes.action} disableSpacing={true}>
          <div className={classes.whiteList}>
            <Icon className={classes.icon}>favorite_border</Icon>
            <NftButton onClick={() => addToWhiteList(cardContent)}>WhiteList</NftButton>
          </div>
          <div className={classes.bid}>
            <NftButton onClick={() => placeBid(cardContent)} color='#ffffff'>
              {' '}
              place a bid
            </NftButton>
          </div>
        </CardActions>
      </Card>
    </div>
  )
}

export default NTFCard
