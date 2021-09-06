import React from 'react'
import InvHeader from 'components/Header/InvHeader'
import InMarket from 'components/InMarketAsset/InMarket'
import InventoryHome from 'components/invHome'
import { InvPageContainer } from 'components/invHome/InvHome.styles'
import OffMarket from 'components/OffMarket/OffMarket'
import { Route } from 'react-router-dom'


const Inventory:React.FC= () => {


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
