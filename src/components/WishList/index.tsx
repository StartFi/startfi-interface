import { ButtonOutlined } from 'UI/Buttons/ButtonOutlined'
import { ContainerCard } from '../../UI/Card'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import { AuctionNFT } from 'services/models/AuctionNFT'
import { useUserWishList } from 'state/user/hooks'
import Text from '../../UI/Text'
import WishCard from './WishCard'
import { NoListContainer } from './WishList.styles'

const WishList = () => {
  const { t } = useTranslation()

  const history = useHistory()
  const userWishList: AuctionNFT[] = useUserWishList()

  return (
    <ContainerCard height="703px" width="100%" borderRadius="8px 8px 0 0" id="ui">
      <Text fontFamily="Roboto" fontSize="1rem" color="#000000" FontWeight="500" margin="1.875rem 0 0 3.5rem">
        {t('wishList')}
      </Text>

      {userWishList.length > 0 ? (
        userWishList.map((auction: AuctionNFT) => (
          <WishCard
            key={auction.auction.id}
            cardContent={auction}
            navigateToNft={(auction: AuctionNFT) =>
              history.push(`/marketplace/nft/${auction.nft.id}/${auction.auction.id}`)
            }
          ></WishCard>
        ))
      ) : (
        <NoListContainer>
          <Text fontFamily="Roboto" fontSize="1.125rem" color="#010101" FontWeight="500" margin="0px 0px 30px 0px">
            {t('noAsset')}
          </Text>
          <ButtonOutlined onClick={() => history.push('/marketplace/nfts')}>Explore</ButtonOutlined>
        </NoListContainer>
      )}
    </ContainerCard>
  )
}

export default WishList
