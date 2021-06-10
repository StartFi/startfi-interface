import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { UserDoc } from 'services/firebase/firebaseStore'
import { NFTQUERY } from 'services/Storage/NFT'
import { AppState } from 'state'
import { addNFT, getNFTs } from './actions'
import { NFT, NFTS } from './reducer'

export const useNFTs = (): NFTS => {
  return useSelector((state: AppState) => state.nfts.nfts)
}

export const useLoadTime = (): number => {
  return useSelector((state: AppState) => state.nfts.loadtime)
}

export const useLastSearch = (): string => {
  return useSelector((state: AppState) => state.nfts.search)
}

export const useLastCategory = (): string => {
  return useSelector((state: AppState) => state.nfts.category)
}

export const useGetNFTs = (): ((query?: NFTQUERY) => void) => {
  const dispatch = useDispatch()
  // const search = useLastSearch()
  // const category = useLastCategory()

  return useCallback(
    (query?: NFTQUERY) => {
      let q = query || {}
      // if (!q.search && search) q.search = search
      // if (!q.category && category) q.category = category
      dispatch(getNFTs(q))
    },
    [dispatch]
  ) //search, category,
}

export const useLoadNFTs = (): void => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getNFTs())
  }, [dispatch])
}

export const useAddNFT = (): ((nft: NFT) => void) => {
  const dispatch = useDispatch()
  return useCallback((nft: NFT) => dispatch(addNFT(nft)), [dispatch])
}
