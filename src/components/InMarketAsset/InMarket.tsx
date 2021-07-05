import Card from 'components/Card'
import { InventoryCard } from 'components/invHome/InvHome.styles'
import Row from 'components/Row'
import Text from '../Text'
import React from 'react'
import { useParams } from 'react-router-dom'
import { NFT } from 'services/models/NFT'
import { useOnMarketItem } from 'state/user/hooks'

interface onMarketParams {
  id: string;
}

const InMarket = () => {

  const {id}:  onMarketParams = useParams()
  const nft:NFT=useOnMarketItem(parseInt(id))
  return (
    <InventoryCard borderRadius='8px' marginTop='54px'>
      <Row padding='20px' align='start'>
        <Text fontFamily='Roboto' FontWeight='500' fontSize='1rem' color='#000000'>
        {nft.name}
        </Text>
        <Card width='1051px' height='142px' border='1px solid #F4F4F4' borderRadius='6px' background='#FBFBFB'></Card>
      </Row>
    </InventoryCard>
  )
}

export default InMarket
