import { PopupContent } from '../../constants'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Auction } from 'services/models/Auction'
import { Inventory, InventoryType } from 'services/models/Inventory'
import { NFT } from 'services/models/NFT'
import { AppState } from 'state'
import { usePopup } from 'state/application/hooks'
import { generateId } from 'state/marketplace/hooks'
import { useUserAddress } from 'state/user/hooks'
import { addToInventory, clearInvPopup, getUserInventory } from './actions'


// set inventory item
export const setInvItem = (ethAddress: string, type: InventoryType, nft?: NFT,auction?:Auction): Inventory => {
  return {
    id: generateId,
    ethAddress,
    nft,
    auction:auction?auction:'',
    type
  }
}

export const useSaveInvItem = (): ((item: Inventory) => void) => {
  const dispatch = useDispatch()
  return useCallback((item: Inventory) => dispatch(addToInventory(item)), [dispatch])
}

export const useGetUserInv=()=>{
  const dispatch = useDispatch()
  return useCallback((owner)=>{
    dispatch(getUserInventory(owner))
  },[dispatch])
  }


  // inv popup
  export const useInventoryPopup = (): PopupContent | null => {
    return useSelector((state: AppState) => state.inventory.popup)
  }

// clear inv popup
  export const useClearInvPopup = (): (() => void) => {
    const dispatch = useDispatch()
    return useCallback(() => {
      dispatch(clearInvPopup())
    }, [dispatch])
  }
