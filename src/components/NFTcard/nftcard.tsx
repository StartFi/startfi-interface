import React from 'react'
import { Media, CardImg, Card, Price, Text, Actions, Bid } from './nftcard.styles'
import { useTranslation } from 'react-i18next'
import ButtonWishlist from 'components/Button/ButtonWishlist'
import { NftButton } from 'components/Button'
import { AuctionNFT } from 'services/models/AuctionNFT'

export interface NftCardProps {
  auctionNFT: AuctionNFT
  navigateToCard: (clickedCard: AuctionNFT) => void
  placeBid: (clickedCard: AuctionNFT) => void
}

const NTFCard: React.FC<NftCardProps> = ({ auctionNFT, navigateToCard, placeBid }) => {
  const { t } = useTranslation()

  const cardContent = auctionNFT.nft

  return (
    <Card>
      <div onClick={() => navigateToCard(auctionNFT)}>
        <Media>
          <CardImg src={cardContent.dataHash} />
        </Media>
        <div>
          <Price>
            <Text fontFamily='Roboto' FontWight='700' fontSize='1.125rem'>
              {auctionNFT.auction.listingPrice} ETH
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
          <NftButton onClick={() => placeBid(auctionNFT)} color='#ffffff'>
            {t('placeBid')}
          </NftButton>
        </Bid>
      </Actions>
    </Card>
  )
}

export default NTFCard
