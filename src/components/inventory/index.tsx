// import Column from 'components/Column'
import Row from 'components/Row';
import React from 'react'
import CardHeader from './CardHeader'
import Header from './Header'
import {  Container } from './inventory.styles'
import { InventoryCard } from './inventory.styles'
import MiniCard from './MiniCard'

const Inventory = () => {
  return (
    <Container>
      <Header></Header>
      <CardHeader></CardHeader>
      <InventoryCard>
        <Row padding="20px">
          <MiniCard/>
          <MiniCard/>
          <MiniCard/>
          <MiniCard/>
          <MiniCard/>
        </Row>


      </InventoryCard>
    </Container>
  )
}

export default Inventory
