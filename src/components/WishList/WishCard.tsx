import React from 'react'
import { AuctionNFT } from 'services/models/AuctionNFT'
import uriToHttp from 'utils/uriToHttp'
import { WishListCard, TextContainer, RemoveContainer, ImgDIV, Counter, CounterContainer } from './WishList.styles'
import Text from '../Text'
import { useRemoveWishlistItem } from 'state/user/hooks'
import { RemoveWishList } from 'components/Button'
import Remove from '../../assets/images/Remove.png'
import { useCountDownTimer } from 'hooks/countDownTimer'
import { useTranslation } from 'react-i18next'

interface MiniCardContent {
  cardContent: AuctionNFT
  navigateToNft: (clickedCard: AuctionNFT) => void
  key: string
}

const WishCard: React.FC<MiniCardContent> = ({ cardContent, navigateToNft }) => {
  const { t } = useTranslation()
  const remove = useRemoveWishlistItem(cardContent.nft.id)
  const timeLeft = useCountDownTimer(cardContent.auction.expireTimestamp)

  const timerComponents: any = []

  Object.keys(timeLeft).forEach(interval => {
    if (!timeLeft[interval]) {
      return
    }
    let comma = ','
    if (interval === 'S') comma = ''
    timerComponents.push(
      <Counter key={interval}>
        <p>{timeLeft[interval]}</p>
        <p>
          {interval}
          {comma}{' '}
        </p>
      </Counter>
    )
  })

  return (
    <WishListCard onClick={() => navigateToNft(cardContent)}>
      <ImgDIV>
        <img src={uriToHttp(`${cardContent.nft.dataHash}`)[1]} />
      </ImgDIV>

      <TextContainer>
        <RemoveContainer>
          <Text fontFamily='Roboto' fontSize='1rem' color='#000000' margin='-1px 0'>
            {cardContent.nft.name}
          </Text>
          <div>
            <img src={Remove} />
            <RemoveWishList
              onClick={event => {
                event.stopPropagation()
                remove()
              }}
            >
              {t('removeWishList')}
            </RemoveWishList>
          </div>
        </RemoveContainer>

        {cardContent.auction?.bids?.length > 0 ? (
          <Text FontWeight='500' color='#000000' fontSize='1rem'>
           {t('lastBidding')} : {cardContent.auction.bids[cardContent.auction?.bids?.length - 1]} STFI
          </Text>
        ) : (
          <Text FontWeight='700' color='#000000' fontSize='1rem'>
            {cardContent.auction.listingPrice} STFI
          </Text>
        )}

        {timerComponents?.length > 0 ? (
          <CounterContainer>
            <Text FontWeight='400' color='#000000' fontSize='1rem' margin='0 5px 0 10px'>
              {t('auctionEnds')}:
            </Text>

            {timerComponents}
          </CounterContainer>
        ) : null}
      </TextContainer>
    </WishListCard>
  )
}

export default WishCard
