import React from 'react';
import Header from './Header';
import { Container } from './inventory.styles';
import { InventoryCard} from './inventory.styles'

 const  Inventory =()=> {
    return (

        <Container>
        <Header></Header>
        <InventoryCard></InventoryCard>
        </Container>





    );
}

export default Inventory;

