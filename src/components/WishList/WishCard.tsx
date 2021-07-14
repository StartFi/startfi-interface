import React from 'react'
import { AuctionNFT } from 'services/models/AuctionNFT'
import uriToHttp from 'utils/uriToHttp'
import { WishListCard, TextContainer, RemoveContainer,ImgDIV } from './WishList.styles'
import Text from '../Text'
import { useRemoveWishlistItem } from 'state/user/hooks'
import { RemoveWishList } from 'components/Button';
import Remove from '../../assets/images/Remove.png';

interface MiniCardContent {
  cardContent: AuctionNFT

}

const WishCard: React.FC<MiniCardContent> = ({ cardContent,}) => {
  // const [tagsState, setTagsState] = useState(false)

  const remove = useRemoveWishlistItem(cardContent.nft.id)

  // useEffect(() => {
  //   if (cardContent.nft?.tags) {
  //     if (cardContent.nft.tags.length > 0) setTagsState(true)
  //   }
  // }, [])

  return (
    <WishListCard>
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
            <RemoveWishList  onClick={remove}>
              Remove from WishList
            </RemoveWishList>
          </div>
        </RemoveContainer>
        <Text FontWeight='700' color="#000000" fontSize="1rem">{cardContent.auction.listingPrice} STFI</Text>
        {/* {cardContent.auction.status} */}

        {
        cardContent.auction?.bids?.length>0?
        ( <Text FontWeight='500' color="#000000" fontSize="1rem">
          Last Bidding : {cardContent.auction.bids[cardContent.auction?.bids?.length-1]} STFI
          </Text>)
        :(<p>No bids</p>)
        }


      </TextContainer>
    </WishListCard>
  )
}

export default WishCard
