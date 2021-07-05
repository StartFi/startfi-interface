import Row from 'components/Row'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { NFT } from 'services/models/NFT'
import { useDrafts, useOffMarket, useOnMarket } from 'state/user/hooks'
import styled from 'styled-components'
import CardHeader, { InventoryOptions } from './CardHeader'
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



const InventoryHome = () => {
  const [inventoryOption, setInventoryOption] = useState(InventoryOptions.Draft)
  const history = useHistory()
  const drafts: NFT[] | undefined = useDrafts()
  const onMarketNFT: NFT[] | undefined = useOnMarket()
  const offMarketNFT: NFT[] | undefined = useOffMarket()

  let inventoryItems

  if (inventoryOption === InventoryOptions.Draft) {
    inventoryItems = [...drafts]
  } else if (inventoryOption === InventoryOptions.inMarketPlace) {
    inventoryItems = [...onMarketNFT]
  } else {
    inventoryItems = [...offMarketNFT]
  }

  const navigate = (id: number) => {
    if (inventoryOption === InventoryOptions.Draft) history.push(`/mint/draft/${id}`)
    if (inventoryOption === InventoryOptions.inMarketPlace) history.push(`/inventory/in-market/${id}`)
  }

  return (
    <div>
      <CardHeader
        getType={t => {
          setInventoryOption(t)
        }}
      ></CardHeader>
      <InventoryCard>
        <Row padding='20px' align='start'>
          {inventoryItems ? (
            inventoryItems?.map((nft: NFT) => (
              <MiniCard key={nft.id} cardContent={nft} navigate={() => navigate(nft.id)} />
            ))
          ) : (
            <p>no item</p>
          )}
        </Row>
      </InventoryCard>
    </div>
  )
}

export default InventoryHome
