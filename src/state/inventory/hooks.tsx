import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { Auction } from 'services/models/Auction'
import { Inventory, InventoryType } from 'services/models/Inventory'
import { NFT } from 'services/models/NFT'
import { generateId } from 'state/marketplace/hooks'
import { addToInventory } from './actions'

export const setInvItem = (ethAddress: string, type: InventoryType, nft?: NFT,auction?:Auction): Inventory => {
  return {
    id: generateId,
    ethAddress,
    nft,
    // auction:auction?auction:'',
    auction,
    type
  }
}

export const useSaveInvItem = (): ((item: Inventory) => void) => {
  const dispatch = useDispatch()
  return useCallback((item: Inventory) => dispatch(addToInventory(item)), [dispatch])
}
