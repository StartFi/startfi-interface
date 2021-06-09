import React, { useState } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 94px;
  background-color: #ffffff;
  border-bottom: 1px solid #e3e3e3;
  border-radius: 8px 8px 0px 0px;
`

const TabsCategory = styled.div`
  display: flex;
  flex-flow: row nowrap;
  width: 60%;
  justify-content: space-between;
  /* align-items: center; */
  /* margin: 4vh 0; */
  /* padding: 3vh 0; */
  /* border-bottom: 1px solid #efefef; */
  /* padding-right: 10vw; */
  margin-left:40px;
`

interface TabProps {
  readonly selected: boolean
}

const Tab = styled.div<TabProps>`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  padding-bottom: 1vh;
  cursor: pointer;
  border-bottom: ${props => (props.selected ? '2px solid #000000;' : 'none;')};
`

const inventoryTypes: Array<string> = ['Draft', 'In Marketplace', 'off marketplace']

const CardHeader = () => {
  const [inventoryType, setInventoryType] = useState(inventoryTypes[0])

  return (
    <Container>
      <TabsCategory>
        {inventoryTypes.map(type => (
          <Tab
            key={type}
            selected={inventoryType === type}
            onClick={() => {
              setInventoryType(type)
            }}
          >
            {type}
          </Tab>
        ))}
      </TabsCategory>
    </Container>
  )
}

export default CardHeader
