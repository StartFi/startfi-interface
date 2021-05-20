import React from 'react'
import Card from '@material-ui/core/Card'
import Path from '../../assets/svg/Path.svg'
import { useStyles } from './nftcard.styles'
import { NftButton } from '../Button/index'
import { NFT } from 'state/nfts/reducer'

export interface NftCardProps {
  cardContent: NFT
  navigateToCard: (clickedCard: NFT) => void
  addToWhiteList: (clickedCard: NFT) => void
  placeBid: (clickedCard: NFT) => void
}

const NTFCard: React.FC<NftCardProps> = ({ cardContent, navigateToCard, addToWhiteList, placeBid }) => {
  const classes = useStyles()
  return (
    <div>
      <Card>

        <CardActionArea>

        {/* <Link  to="/product"> */}
          <CardMedia className={classes.media}  component="img" image={cardContent.ntfImg} title="IMG" />
          {/* </Link> */}

          <CardContent onClick={() => navigateToCard(cardContent)}>

            <div className={classes.price}>
              <h3>{cardContent.price}</h3>
            </div>
            <div>
              <h2>{cardContent.title}</h2>
              <p> {cardContent.description}</p>
            </div>
          </CardContent>
        </CardActionArea>

        <CardActions className={classes.action} disableSpacing={true}>
          <div className={classes.whiteList}>
            <img className={classes.icon} src={Path} />
            <NftButton onClick={() => addToWhiteList(cardContent)} color='#000000'>
              WHITELIST
            </NftButton>
          </div>
          <div className={classes.bid}>
            <NftButton onClick={() => placeBid(cardContent)} color='#ffffff'>
              {' '}
              place a bid
            </NftButton>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default NTFCard
