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
import { initialAuction } from 'state/marketplace/initial'

// set inventory item
export const setInvItem = (
  ethAddress: string,
  type: InventoryType,
  nft: NFT,
  issueDate: any,
  auction?: Auction
): Inventory=> {
  return {
     id: generateId,
    ethAddress,
    nft,
    issueDate,
    auction: auction ? auction : initialAuction,
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

  return useCallback(() => {
    if (owner) {
      dispatch(getUserInventory(owner))
    }
  }, [dispatch, owner])
}

// get user inv
export const useUserInv = (): Inventory[] => {
  return useSelector((state: AppState) => state.inventory.inventory)
}

// check if item in inv
export const useGetInvItem = () => {
  const userInv = useUserInv()

  return useCallback((nftId: string) => {

    // if (userInv?.length > 0) {
      return userInv?.filter(invItem => invItem.nft.id === nftId)
    // }

  }, [])
}

export const useCheckInvItem = () => {
  const userInv = useUserInv()


  return useCallback((nftId: string) => {
    if( userInv?.length>0){
      return userInv.filter(invItem => invItem.nft.id === nftId)?.length > 0 ? true : false
    }else{
      return false
    }

  }, [])
}
export const useGetUserDrafts = () => {
  return useSelector((state: AppState) => state.inventory.draft)
}

// get single draft
export const useDraft = (draftId: number): NFT => {
  const userDrafts: Inventory[] = useGetUserDrafts()
  return useMemo(() => userDrafts?.filter(invItem => invItem.nft.id === draftId)[0].nft, [draftId, userDrafts])
}
export const useGetUserOffMarket = () => {
  return useSelector((state: AppState) => state.inventory.offMarket)
}
// get single offMarket nft
export const useOffMarketInvItem = (nftId: string): Inventory => {
  const offMarket: Inventory[] = useGetUserOffMarket()
  return useMemo(() => offMarket?.filter(invItem => invItem.nft.id === nftId)[0], [offMarket, nftId])
}

// get single offMarket nft
export const useOffMarketItem = (nftId: string): NFT => {
  const offMarket: Inventory[] = useGetUserOffMarket()
  return useMemo(() => offMarket?.filter(invItem => invItem.nft.id === nftId)[0]?.nft, [offMarket, nftId])
}

export const useGetUserOnMarket = () => {
  return useSelector((state: AppState) => state.inventory.onMarket)
}

// get onMarket single item
export const useOnMarketItem = (nftId: string): Inventory => {
  const onMarket: Inventory[] = useGetUserOnMarket()
  console.log(nftId)
  return useMemo(() => onMarket?.filter(invItem => invItem.nft.id === nftId)[0], [onMarket, nftId])
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
