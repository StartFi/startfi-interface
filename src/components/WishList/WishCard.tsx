import React, { useEffect, useState } from 'react';
import { AuctionNFT } from 'services/models/AuctionNFT';
import uriToHttp from 'utils/uriToHttp';
import { WishListCard, TextContainer, TagContainer, TagRow } from './WishList.styles';
import Text from '../Text'

interface MiniCardContent {
    cardContent: AuctionNFT

  }

const WishCard: React.FC<MiniCardContent> =({cardContent})=> {


    const [tagsState, setTagsState] = useState(false)


  useEffect(() => {
    if (cardContent.nft?.tags) {
      if (cardContent.nft.tags.length > 0) setTagsState(true)
    }
  }, [])

    return (
        <WishListCard>
        <img src={uriToHttp(`${cardContent.nft.image}`)[0]}/>
        <TextContainer>
        <Text fontFamily='Roboto' fontSize='1rem' color='#000000' margin='-1px 0'>
          {cardContent.nft.name}
        </Text>
        <Text>
       236 STFI
        </Text>
        <TagRow>

              {tagsState ? (
                <TagContainer >
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
    );
}

export default WishCard;