import Row from 'components/Row'
// import Inventory from 'pages/Inventory'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router-dom'
import { Inventory } from 'services/models/Inventory'
import { NFT } from 'services/models/NFT'
import { useGetUserDrafts, useGetUserInv, useGetUserOffMarket, useGetUserOnMarket } from 'state/inventory/hooks'
import { useDrafts, useGetInventory, useOffMarket, useOnMarket, useUserAddress } from 'state/user/hooks'
import CardHeader, { InventoryOptions, InvParams } from './CardHeader'
import { InventoryCard } from './InvHome.styles'
import MiniCard from './MiniCard'

const InventoryHome = () => {
  const { t } = useTranslation()
  const [inventoryOption, setInventoryOption] = useState(InventoryOptions.Draft)
  const [inventoryItems, setInventoryItems] = useState<Inventory[]>([])
  const history = useHistory()
  const drafts: Inventory[] | undefined = useGetUserDrafts()
  const onMarketNFT: Inventory[]| undefined =useGetUserOnMarket()
  const offMarketNFT: Inventory[]| undefined =  useGetUserOffMarket()

  const owner = useUserAddress()
  const getUserInv = useGetUserInv()

  const { id }: InvParams = useParams()
  // const getInventory = useGetInventory()
  useEffect(() => {

    // if(owner){
      getUserInv()
    // }
  }, [owner])

  useEffect(() => {
    console.log('drafts',drafts?.length)
    if (id === 'offMarketPlace') {
      setInventoryOption(InventoryOptions.offMarketPlace)
    }
    if (id === 'onMarketPlace') {
      setInventoryOption(InventoryOptions.inMarketPlace)
    }

    switch (inventoryOption) {
      case InventoryOptions.Draft:
        setInventoryItems([...drafts])
        if (drafts?.length > 0) {
          // getUserInv(owner)
          setInventoryItems([...drafts])

        } else {
          setInventoryItems([])
        }
        break
      case InventoryOptions.inMarketPlace:
        setInventoryItems([...onMarketNFT])
        break
      case InventoryOptions.offMarketPlace:
        setInventoryItems([...offMarketNFT])
        break
    }
    console.log('drafts2',drafts?.length)
  }, [inventoryOption,drafts,onMarketNFT,offMarketNFT])

  // inventoryItems.sort((a, b) => {
  //   return b.issueDate.seconds - a.issueDate.seconds
  // })


  const navigate = (id: number) => {
    if (inventoryOption === InventoryOptions.Draft) history.push(`/mint/steps`)
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
          {inventoryItems?.length > 0 ? (
            inventoryItems?.map((item: Inventory) => (
              <MiniCard key={item.id} cardContent={item.nft} navigate={() => navigate(item.nft.id)} />
            ))
          ) : (
            <p>{t('noItems')}</p>
          )}
        </Row>
      </InventoryCard>
    </div>
  )
}

export default InventoryHome
