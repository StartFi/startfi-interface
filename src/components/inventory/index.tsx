// import Column from 'components/Column'
import Row from 'components/Row'
import React from 'react'
import styled from 'styled-components'
import CardHeader from './CardHeader'
import Header from './Header'
import MiniCard from './MiniCard'

const InventoryCard = styled.div`
  height: 500px;
  width: 92%;
  margin: 0px auto 0px auto;
  background-color: #ffffff;
  border: 1px solid #e3e3e3;
  box-shadow: 0px 0px 20px rgba(239, 239, 239, 0.25);

  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 15px;
    border: 1px solid #e3e3e3;
    background-color: #efefef;
    border-radius: 100px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 100px;
    background-color: #b5b5b5;
  }
`

const Container = styled.div`
  width: 100%;
  background-color: #fafafa;
  padding: 4vh 3.2vw;
`

// const CardContentContainer = styled.div``

const Inventory = () => {
  return (
    <Container>
      <Header></Header>
      <CardHeader></CardHeader>
      <InventoryCard>
        <Row padding='20px'>
          <MiniCard />
          <MiniCard />
          <MiniCard />
          <MiniCard />
           {/* <MiniCard /> */}
        </Row>
      </InventoryCard>
    </Container>
  )
}

export default Inventory
