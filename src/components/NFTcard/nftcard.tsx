import React from 'react'
import Path from '../../assets/svg/Path.svg'
import { Media, CardImg, Card, Price, Text, Actions, Bid, WhiteList, ImageIcon } from './nftcard.styles'
import { NftButton } from '../Button/index'
import { NFT } from 'state/nfts/reducer'
import { useUserWhishListItem } from 'state/user/hooks'

export interface NftCardProps {
  cardContent: NFT
  navigateToCard: (clickedCard: NFT) => void
  addToWishList: (clickedCard: NFT) => void
  placeBid: (clickedCard: NFT) => void
}
// disabled={useUserWhishListItem(cardContent.id)}
const NTFCard: React.FC<NftCardProps> = ({ cardContent, navigateToCard, addToWishList, placeBid }) => {

  return (
    <Card>
      <div onClick={() => navigateToCard(cardContent)}>
        <Media>
          <CardImg src={cardContent.image} />
        </Media>
        <div>
          <Price>
            <Text fontFamily='Roboto' FontWight='700' fontSize='1.125rem'>
              {cardContent.price} ETH
            </Text>
            <Text fontFamily='Roboto' FontWight='400' fontSize='1.0rem'>
              {cardContent.name}
            </Text>
            <Text fontFamily='Roboto' FontWight='400' fontSize='0.74rem'>
              {cardContent.description}
            </Text>
          </Price>
        </div>
      </div>
      <Actions>
        {/* */}
        <WhiteList>
          <ImageIcon src={Path} opacity={useUserWhishListItem(cardContent.id)}/>
          <NftButton
            disabled={useUserWhishListItem(cardContent.id)}
            onClick={() => addToWishList(cardContent)}
            // color='#000000'
          >
            WISHLIST
          </NftButton>
        </WhiteList>
        <Bid>
          <NftButton onClick={() => placeBid(cardContent)} color='#ffffff'>
            {' '}
            place a bid
          </NftButton>
        </Bid>
      </Actions>
    </Card>
  )
}

export default NTFCard
