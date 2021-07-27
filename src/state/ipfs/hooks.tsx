import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { uploadIPFS, IpfsMedia } from 'services/Ipfs/Ipfs'
import { AppState } from 'state'
import { uploadedToIpfs, ipfsStatus, ipfsEnumStatus, ipfsProgress } from '../../state/ipfs/actions'

export const useIpfsHash = (): string => {
  return useSelector((state: AppState) => state.ipfs.ipfsHash)
}

export const useIpfsStatus = (): ipfsEnumStatus | null => {
  return useSelector((state: AppState) => state.ipfs.ipfsStatus)
}

export const useIpfsProgress = (): number => {
  return useSelector((state: AppState) => state.ipfs.ipfsProgress)
}

export const useClearIPFSProgress = (): (() => void) => {
  const dispatch = useDispatch()
  return useCallback(() => dispatch(ipfsProgress({ type:'', progress: 0 })), [dispatch])
}

export const useUploadToIpfs = (): ((ipfsMedia: IpfsMedia) => void) => {
  const dispatch = useDispatch()
  return useCallback(
    async (ipfsMedia: IpfsMedia) => {
      dispatch(ipfsStatus({ status: ipfsEnumStatus['LOADING'] }))
      const ipfsHash = await uploadIPFS(ipfsMedia)
      if (ipfsHash) {
        dispatch(uploadedToIpfs({ hash: ipfsHash }))
        dispatch(ipfsStatus({ status: ipfsEnumStatus['DONE'] }))
      } else {
        dispatch(ipfsStatus({ status: ipfsEnumStatus['REJECTED'] }))
      }
    },
    [dispatch]
  )
}
