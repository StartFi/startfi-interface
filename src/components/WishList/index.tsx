import { ContainerCard } from 'components/Card'
import React from 'react'
import { AuctionNFT } from 'services/models/AuctionNFT'
import { useUserWishList } from 'state/user/hooks'
import Text from '../Text'
import WishCard from './WishCard'


const WishList = () => {
  // const dispatch=useDispatch()
  // dispatch(getUserWishListNFTsAction([0,1]))
  const userWishList: AuctionNFT[] = useUserWishList()
  console.log(userWishList)

  return (
    <ContainerCard height='703px' width='100%' borderRadius='8px 8px 0 0' id='ui'>
      <Text fontFamily='Roboto' fontSize='1rem' color='#000000' FontWeight='500' margin='1.875rem 0 0 3.5rem'>
        WishList
      </Text>

      {userWishList ? userWishList.map((auction:AuctionNFT) =>
      <WishCard cardContent={auction}></WishCard>
     ) : <p>no wish</p>}
    </ContainerCard>
  )
}

export default WishList
