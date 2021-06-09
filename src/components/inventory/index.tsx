import React from 'react';
import CardHeader from './CardHeader';
import Header from './Header';
import { Container } from './inventory.styles';
import { InventoryCard} from './inventory.styles'

 const  Inventory =()=> {
    return (

        <Container>
        <Header></Header>
        <InventoryCard>
            <CardHeader></CardHeader>
        </InventoryCard>
        </Container>





    );
}

export default Inventory;

