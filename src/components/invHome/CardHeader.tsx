import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { HeaderContainer, InvTab, InvTabsCategory } from './InvHome.styles'

export enum InventoryOptions {
  Draft = 'Draft',
  inMarketPlace = 'In marketplace',
  offMarketPlace = 'off market place'
}
export interface TabProps {
  readonly selected: boolean
}

interface CardHeaderProps {
  getType: (type: InventoryOptions) => void
}

interface InvParams {
  id: string
}

export const inventoryTypes: Array<InventoryOptions> = [
  InventoryOptions.Draft,
  InventoryOptions.inMarketPlace,
  InventoryOptions.offMarketPlace
]

const CardHeader: React.FC<CardHeaderProps> = ({ getType }) => {
  const [inventoryType, setInventoryType] = useState(InventoryOptions.Draft)
  const { t } = useTranslation()
  const { id }: InvParams = useParams()

  useEffect(() => {
    if (id === 'offMarket') {
      setInventoryType(InventoryOptions.offMarketPlace)
    }
  }, [])

  return (
    <HeaderContainer>
      <InvTabsCategory>
        {inventoryTypes.map(type => (
          <InvTab
            key={type}
            selected={inventoryType === type}
            onClick={() => {
              setInventoryType(type)
              getType(type)
            }}
          >
            {t(type)}
          </InvTab>
        ))}
      </InvTabsCategory>
    </HeaderContainer>
  )
}

export default CardHeader
