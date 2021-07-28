import { ButtonOutlined } from 'components/Button'
import { ContainerCard } from 'components/Card'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { AuctionNFT } from 'services/models/AuctionNFT'
import { useUserWishList } from 'state/user/hooks'
import Text from '../Text'
import WishCard from './WishCard'
import { NoListContainer } from './WishList.styles'


const WishList = () => {
  const history = useHistory()
  const userWishList: AuctionNFT[] = useUserWishList()

  return (
    <ContainerCard height='703px' width='100%' borderRadius='8px 8px 0 0' id='ui'>
      <Text fontFamily='Roboto' fontSize='1rem' color='#000000' FontWeight='500' margin='1.875rem 0 0 3.5rem'>
        WishList
      </Text>

      {userWishList.length > 0 ? (
        userWishList.map((auction: AuctionNFT) => (

             <WishCard key={auction.auction.id} cardContent={auction}
             navigateToNft={(auction:AuctionNFT)=>
              history.push(`/marketplace/nft/${auction.nft.id}/${auction.auction.id}`)}></WishCard>

        ))
      ) : (
        <NoListContainer>
          <Text fontFamily='Roboto' fontSize='1.125rem' color='#010101' FontWeight='500' margin='0px 0px 30px 0px'>
            There Are No Assets Added to your wishlist
          </Text>
          <ButtonOutlined onClick={() => history.push('/marketplace/nfts')}>Explore</ButtonOutlined>
        </NoListContainer>
      )}
    </ContainerCard>
  )
}

export default WishList
