import Row from 'components/Row'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router-dom'
import { NFT } from 'services/models/NFT'
import { useDrafts, useGetInventory, useOffMarket, useOnMarket } from 'state/user/hooks'
import CardHeader, { InventoryOptions, InvParams } from './CardHeader'
import { InventoryCard } from './InvHome.styles'
import MiniCard from './MiniCard'

const InventoryHome = () => {
  const { t } = useTranslation()
  const [inventoryOption, setInventoryOption] = useState(InventoryOptions.Draft)
  const [inventoryItems, setInventoryItems] = useState<NFT[]>([])
  const history = useHistory()
  const drafts: NFT[] | undefined = useDrafts()
  const onMarketNFT: NFT[] | undefined = useOnMarket()
  const offMarketNFT: NFT[] | undefined = useOffMarket()

  const { id }: InvParams = useParams()
  const getInventory = useGetInventory()
  useEffect(() => {
    getInventory()
  }, [])

  useEffect(() => {
    if (id === 'offMarketPlace') {
      setInventoryOption(InventoryOptions.offMarketPlace)
    }
    if (id === 'onMarketPlace') {
      setInventoryOption(InventoryOptions.inMarketPlace)
    }

    switch (inventoryOption) {
      case InventoryOptions.Draft:
        if (drafts?.length > 0) {
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
  }, [inventoryOption])

  inventoryItems?.sort((a, b) => {
    return b.issueDate.seconds - a.issueDate.seconds
  })

  const navigate = (id: number) => {
    if (inventoryOption === InventoryOptions.Draft) history.push(`/mint/steps/${id}`)
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
        <Row padding="20px" align="start">
          {inventoryItems?.length > 0 ? (
            inventoryItems?.map((nft: NFT) => (
              <MiniCard key={nft.id} cardContent={nft} navigate={() => navigate(nft.id)} />
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
