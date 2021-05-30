import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { UserDoc } from 'services/firebase/firebaseStore'
import { NFTQUERY } from 'services/Storage/NFT'
import { AppState } from 'state'
import {  getNFTs } from './actions'
import { NFTS } from './reducer'

export const useNFTs = (): NFTS => {
  return useSelector((state: AppState) => state.nfts.nfts)
}

export const useLoadTime = (): number => {
  return useSelector((state: AppState) => state.nfts.loadtime)
}

export const useGetNFTs = (): ((query?: NFTQUERY) => void) => {
  const dispatch = useDispatch()
  return useCallback((query?: NFTQUERY) => dispatch(getNFTs(query)), [dispatch])
}

export const useLoadNFTs = (): void => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getNFTs({}))
  }, [dispatch])
}


