import React from 'react'
import Path from '../../assets/svg/Path.svg'
import { Media, CardImg, Card, Price, Text, Actions, Bid, WhiteList, ImageIcon } from './nftcard.styles'
import { NftButton } from '../Button/index'
import { NFT } from 'state/nfts/reducer'
import { useTranslation } from 'react-i18next'
import uriToHttp from '../../utils/uriToHttp'

export interface NftCardProps {
  cardContent: NFT
  navigateToCard: (clickedCard: NFT) => void
  addToWhiteList: (clickedCard: NFT) => void
  placeBid: (clickedCard: NFT) => void
}

const NTFCard: React.FC<NftCardProps> = ({ cardContent, navigateToCard, addToWhiteList, placeBid }) => {
  const { t } = useTranslation()

  const imgUrl = uriToHttp(`${cardContent.image}`)[0]

  return (
    <div>
      <Card>
        <Media>
          <CardImg src={imgUrl} />
        </Media>

        <div onClick={() => navigateToCard(cardContent)}>
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
            <NftButton onClick={() => addToWhiteList(cardContent)} color='#000000'>
              {t('whiteList')}
            </NftButton>
          </WhiteList>
          <Bid>
            <NftButton onClick={() => placeBid(cardContent)} color='#ffffff'>
              {t('placeBid')}
            </NftButton>
          </Bid>
        </Actions>
      </Card>
    </div>
  )
}

export default NTFCard
