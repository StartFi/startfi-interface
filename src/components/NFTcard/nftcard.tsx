import React from 'react'
import { Media, CardImg, Card, Price, Text, Actions, Bid } from './nftcard.styles'
import { useTranslation } from 'react-i18next'
import { NFT } from 'services/models/NFT'
import ButtonWishlist from 'components/Button/ButtonWishlist'
import { NftButton } from 'components/Button'

export interface NftCardProps {
  cardContent: NFT
  navigateToCard: (clickedCard: NFT) => void
  placeBid: (clickedCard: NFT) => void
}

const NTFCard: React.FC<NftCardProps> = ({ cardContent, navigateToCard, placeBid }) => {
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
      </div>
      <Actions>
        {/* */}
          <ButtonWishlist nftId={cardContent.id} type="NFTCard"/>
        <Bid>
          <NftButton onClick={() => placeBid(cardContent)} color='#ffffff'>
            {t('placeBid')}
          </NftButton>
        </Bid>
      </Actions>
    </Card>
  )
}

export default NTFCard
