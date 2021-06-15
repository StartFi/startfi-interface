import React from 'react'
import Path from '../../assets/svg/Path.svg'
import { Media, CardImg, Card, Price, Text, Actions, Bid, WhiteList, ImageIcon } from './nftcard.styles'
import { NftButton } from '../Button/index'
import { useTranslation } from 'react-i18next'
import { NFT } from 'services/models/NFT'

export interface NftCardProps {
  cardContent: NFT
  navigateToCard: (clickedCard: NFT) => void
  addToWishList: (clickedCard: NFT) => void
  placeBid: (clickedCard: NFT) => void
}

const NTFCard: React.FC<NftCardProps> = ({ cardContent, navigateToCard, addToWishList, placeBid }) => {
  const { t } = useTranslation()

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
        <Actions>
          <WhiteList>
            <ImageIcon src={Path} />
            <NftButton onClick={() => addToWishList(cardContent)} color='#000000'>
              {t('whishList')}
            </NftButton>
          </WhiteList>
          <Bid>
            <NftButton onClick={() => placeBid(cardContent)} color='#ffffff'>
              {t('placeBid')}

            </NftButton>
          </Bid>
        </Actions>
        </div>
      </Card>
  )
}

export default NTFCard
