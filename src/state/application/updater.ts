import { useCallback, useEffect, useState } from 'react'
import { useActiveWeb3React } from '../../hooks/blockchain-hooks/useActiveWeb3React'
import useDebounce from '../../hooks/useDebounce'
import useIsWindowVisible from '../../hooks/useIsWindowVisible'
import { updateBlockNumber } from './actions'
import { useDispatch } from 'react-redux'
import { useClearUserPopup, useUserPopup } from 'state/user/hooks'
import { usePopup } from './hooks'
import { useClearMarketplacePopup, useMarketplacePopup } from 'state/marketplace/hooks'
import { useHistory } from 'react-router-dom'
import { useInventoryPopup, useClearInvPopup } from 'state/inventory/hooks'

export default function Updater(): null {
  const { library, chainId } = useActiveWeb3React()

  const dispatch = useDispatch()

  const history = useHistory()

  const userPopup = useUserPopup()

  const clearUserPopup = useClearUserPopup()

  const marketplacePopup = useMarketplacePopup()

  //  inv popup
  const inventoryPopup = useInventoryPopup()
  const clearInvPopup = useClearInvPopup()

  const clearMarketplacePoup = useClearMarketplacePopup()

  const popup = usePopup()

  const windowVisible = useIsWindowVisible()

  const [state, setState] = useState<{ chainId: number | undefined; blockNumber: number | null }>({
    chainId,
    blockNumber: null
  })

  const blockNumberCallback = useCallback(
    (blockNumber: number) => {
      setState(state => {
        if (chainId === state.chainId) {
          if (typeof state.blockNumber !== 'number') return { chainId, blockNumber }
          return { chainId, blockNumber: Math.max(blockNumber, state.blockNumber) }
        }
        return state
      })
    },
    [chainId, setState]
  )

  useEffect(() => {
    if (userPopup) {
      popup(userPopup)
      clearUserPopup()
      if (userPopup.type === 'SaveDraft' && userPopup.success) history.push('/')
    }
    return () => {
      clearUserPopup()
    }
  }, [userPopup, history, popup, clearUserPopup, dispatch])

  useEffect(() => {
    if (marketplacePopup) {
      popup(marketplacePopup)
      if (marketplacePopup.type === 'AddToMarketplace' && marketplacePopup.success)
        history.push('/mint/addedtomarketplace')
      clearMarketplacePoup()
    }
    return () => {
      clearMarketplacePoup()
    }
  }, [marketplacePopup, history, popup, clearMarketplacePoup, dispatch])

  // inventory Popup
  useEffect(() => {
    if (inventoryPopup) {
      popup(inventoryPopup)
      clearInvPopup()
      if (inventoryPopup.type === 'SaveDraft' && inventoryPopup.success) history.push('/')
    }
  }, [inventoryPopup, history, popup, clearInvPopup, dispatch])
  // attach/detach listeners
  useEffect(() => {
    if (!library || !chainId || !windowVisible) return undefined

    setState({ chainId, blockNumber: null })

    library
      .getBlockNumber()
      .then(blockNumberCallback)
      .catch(error => console.error(`Failed to get block number for chainId: ${chainId}`, error))

    library.on('block', blockNumberCallback)
    return () => {
      library.removeListener('block', blockNumberCallback)
    }
  }, [dispatch, chainId, library, blockNumberCallback, windowVisible])

  const debouncedState = useDebounce(state, 100)

  useEffect(() => {
    if (!debouncedState.chainId || !debouncedState.blockNumber || !windowVisible) return
    dispatch(updateBlockNumber({ chainId: debouncedState.chainId, blockNumber: debouncedState.blockNumber }))
  }, [windowVisible, dispatch, debouncedState.blockNumber, debouncedState.chainId])

  return null
}
