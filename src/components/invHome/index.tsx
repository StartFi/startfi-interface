import Row from 'components/Row'
import React, { useState } from 'react'
import { useHistory, } from 'react-router-dom'
import { NFT } from 'services/models/NFT'
import { useDrafts, useOffMarket, useOnMarket } from 'state/user/hooks'
import CardHeader, { InventoryOptions } from './CardHeader'
import { InventoryCard } from './InvHome.styles'
import MiniCard from './MiniCard'




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
    if (inventoryOption === InventoryOptions.offMarketPlace) history.push(`/inventory/off-market/${id}`)
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
