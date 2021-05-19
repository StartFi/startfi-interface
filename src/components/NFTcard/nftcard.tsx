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
      <Card className={classes.card}>
        <div className={classes.media}>
          <img src={cardContent.image} />
        </div>

        <div onClick={() => navigateToCard(cardContent)}>
          <div className={classes.price}>
            <p>{cardContent.price} ETH</p>
          </div>
          <div>
            <p className={classes.title}>{cardContent.name}</p>
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
