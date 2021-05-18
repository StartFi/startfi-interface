import React from 'react'
import Card from '@material-ui/core/Card'
import Path from '../../assets/svg/Path.svg'
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
        <div className={classes.media}>
          <img src={cardContent.ntfImg} />
        </div>

        <div onClick={() => navigateToCard(cardContent)}>
          <div className={classes.price}>
            <p>{cardContent.price}</p>
          </div>
          <div>
            <p className={classes.title}>{cardContent.title}</p>
            <p className={classes.description}> {cardContent.description}</p>
          </div>
        </div>

        <div className={classes.action}>
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
