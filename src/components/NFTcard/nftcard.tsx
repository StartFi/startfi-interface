import React from 'react'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Icon from '@material-ui/core/Icon'
import { useStyles } from './nftcard.styles'
import { NftButton } from '../Button/index'
import { NftCardProps } from './nftcard.interface'

const NTFCard: React.FC<NftCardProps> = ({ cardContent, navigateToCard, addToWhiteList, placeBid }) => {
  const classes = useStyles()
  return (
    <div>
      <Card>
        <CardActionArea>
          <CardMedia className={classes.media}  component="img" image={cardContent.image} title="IMG" />
          <CardContent onClick={() => navigateToCard(cardContent)}>
            <div className={classes.price}>
              <h3>{cardContent.price}</h3>
            </div>
            <div>
              <h2>{cardContent.name}</h2>
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
