import { ContainerCard } from 'components/Card';
import React from 'react';
import { getUserWishListNfts } from 'services/User';
import Text from '../Text'

const WishList =()=> {



 getUserWishListNfts([0,1])





    return (

       <ContainerCard height="703px" width="100%" borderRadius="8px 8px 0 0" id="ui">
          <Text fontFamily='Roboto' fontSize='1rem' color='#000000' FontWeight="500"  margin='1.875rem 0 0 2.5rem'>
          WishList

          </Text>

       </ContainerCard>




    );
}

export default WishList ;