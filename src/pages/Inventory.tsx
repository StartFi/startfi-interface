import InvHeader from 'components/Header/InvHeader';
import InMarket from 'components/InMarketAsset/InMarket';
import InventoryHome from 'components/invHome';
import OffMarket from 'components/OffMarket/OffMarket';
import React from 'react';
import { Route } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  background-color: #fafafa;
  padding: 4vh 3.2vw;
`

const Inventory=()=> {
    return (
        <Container>
            <InvHeader></InvHeader>
            <Route  path="/inventory/home" component={InventoryHome}  />
            <Route path="/inventory/in-market/:id" component={InMarket} />
            <Route path="/inventory/off-market/:id" component={OffMarket} />
        </Container>
    );
}

export default Inventory;