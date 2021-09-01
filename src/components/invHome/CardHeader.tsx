import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router-dom'
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

export interface InvParams {
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

  const history = useHistory()

  useEffect(() => {
    if (inventoryType === InventoryOptions.Draft) history.push('/inventory/home/draft')
    if (id === 'offMarketPlace') setInventoryType(InventoryOptions.offMarketPlace)
    if (id === 'onMarketPlace') setInventoryType(InventoryOptions.inMarketPlace)
  }, [id])

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
              history.push('/inventory/home/' + type.replaceAll(' ', ''))
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
