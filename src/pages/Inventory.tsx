import InvHeader from 'components/Header/InvHeader'
import InMarket from 'components/InMarketAsset/InMarket'
import InventoryHome from 'components/invHome'
import { InvPageContainer } from 'components/invHome/InvHome.styles'
import OffMarket from 'components/OffMarket/OffMarket'
import React, { useEffect } from 'react'
import { Route } from 'react-router-dom'
import { useGetUserInv } from 'state/inventory/hooks'
import { useUserAddress } from 'state/user/hooks'

const Inventory = () => {
  // const owner = useUserAddress()
  // const getUserInv = useGetUserInv()
  // useEffect(() => {
  //     if(owner){
  //       getUserInv(owner)
  //     }

  // }, [owner])

  return (
    <InvPageContainer>
      <InvHeader></InvHeader>
      <Route path='/inventory/in-market/:id' component={InMarket} />
      <Route path='/inventory/off-market/:id' component={OffMarket} />
      <Route path='/inventory/home/:id' component={InventoryHome} />
    </InvPageContainer>
  )
}

export default Inventory
