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
// get single offMarket item
export const useOffMarketItem = (nftId: string): NFT => {
  const offMarket: Inventory[] = useGetUserOffMarket()

  return useMemo(() => offMarket?.filter(invItem => invItem.nft.id === nftId)[0]?.nft, [offMarket, nftId])
}

export const useGetUserOnMarket = () => {
  return useSelector((state: AppState) => state.inventory.onMarket)
}

// get onMarket single item
export const useOnMarketItem = (nftId: string): NFT => {
  const onMarket: Inventory[] = useGetUserOnMarket()
  return useMemo(() => onMarket?.filter(invItem => invItem.nft.id === nftId)[0]?.nft, [onMarket, nftId])
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
