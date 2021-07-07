import React, { useEffect, useState } from 'react'
import { AuctionNFT } from 'services/models/AuctionNFT'
import uriToHttp from 'utils/uriToHttp'
import { WishListCard, TextContainer, TagContainer, TagRow, RemoveContainer } from './WishList.styles'
import Text from '../Text'
import { useRemoveWishlistItem } from 'state/user/hooks'
import { RemoveWishList } from 'components/Button'
import Remove from '../../assets/images/Remove.png'

interface MiniCardContent {
  cardContent: AuctionNFT
}

const WishCard: React.FC<MiniCardContent> = ({ cardContent }) => {
  const [tagsState, setTagsState] = useState(false)

  const remove = useRemoveWishlistItem(cardContent.nft.id)

  useEffect(() => {
    if (cardContent.nft?.tags) {
      if (cardContent.nft.tags.length > 0) setTagsState(true)
    }
  }, [])

  return (
    <WishListCard>
      <img src={uriToHttp(`${cardContent.nft.image}`)[0]} />
      <TextContainer>
        <RemoveContainer>
          {' '}
          <Text fontFamily='Roboto' fontSize='1rem' color='#000000' margin='-1px 0'>
            {cardContent.nft.name}
          </Text>
          <div>
            <img src={Remove}/>
            <RemoveWishList onClick={remove}>Remove from WishList</RemoveWishList>
          </div>

        </RemoveContainer>
        <Text>236 STFI</Text>
        <TagRow>
          {tagsState ? (
            <TagContainer>
              {cardContent.nft.tags?.map(e => (
                <div key={e}>{e}</div>
              ))}
            </TagContainer>
          ) : (
            <span>No Tags Added</span>
          )}
        </TagRow>
      </TextContainer>
    </WishListCard>
  )
}

export default WishCard
