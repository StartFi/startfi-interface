import { PopupContent } from '../../constants'
import { useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Auction } from 'services/models/Auction'
import { Inventory, InventoryType } from 'services/models/Inventory'
import { NFT } from 'services/models/NFT'
import { AppState } from 'state'
import { usePopup } from 'state/application/hooks'
import { generateId } from 'state/marketplace/hooks'
import { useUser, useUserAddress } from 'state/user/hooks'
import { addToInventory, clearInvPopup, getUserInventory } from './actions'

// set inventory item
export const setInvItem = (ethAddress: string, type: InventoryType, nft?: NFT, auction?: Auction): Inventory => {
  return {
    id: generateId,
    ethAddress,
    nft,
    auction: auction ? auction : '',
    type
  }
}

export const useSaveInvItem = (): ((item: Inventory) => void) => {
  const dispatch = useDispatch()
  return useCallback((item: Inventory) => dispatch(addToInventory(item)), [dispatch])
}

export const useGetUserInv = () => {
  const dispatch = useDispatch()
  const owner = useUserAddress()
  return useCallback(
    () => {
      if(owner){
        dispatch(getUserInventory(owner))
      }

    },
    [dispatch,owner]
  )
}

// get user inv
export const useUserInv = (): Inventory[] => {
  return useSelector((state: AppState) => state.inventory.inventory)
}

// get userDrafts
// export const useGetUserDrafts=():Inventory[]=>{
//   const userInv=useUserInv()
//    const user = useUser()

//    console.log('called=>')

//   return useMemo(()=>userInv.filter(item=>item.type===InventoryType.Draft),[userInv,user])
// }


export const useGetUserDrafts = () => {
  return useSelector((state: AppState) =>    // console.log(state.inventory.draft)
    state.inventory.draft
  )
}
export const useGetUserOffMarket = () => {
  return useSelector((state: AppState) => state.inventory.offMarket)
}
export const useGetUserOnMarket = () => {
  return useSelector((state: AppState) => state.inventory.onMarket)
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
