import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { uploadIPFS, IpfsMedia } from 'services/Ipfs/Ipfs'
import { AppState } from 'state'
import { uploadedToIpfs, ipfsStatus, ipfsEnumStatus } from '../../state/ipfs/actions'
import { IpfsFile } from './reducer'

export const useIpfsHashes = (): IpfsFile[] => {
  return useSelector((state: AppState) => state.ipfs.ipfsFiles)
}

export const useIpfsStatus = (): ipfsEnumStatus | null => {
  return useSelector((state: AppState) => state.ipfs.ipfsStatus)
}

export const useIpfsProgress = (): string => {
  return useSelector((state: AppState) => state.ipfs.ipfsProgress)
}

export const useUploadToIpfs = (): ((ipfsMedia: IpfsMedia) => void) => {
  const dispatch = useDispatch()
  dispatch(ipfsStatus({ status: ipfsEnumStatus['LOADING'] }))

  return useCallback(
    async (ipfsMedia: IpfsMedia) => {
      const ipfsHash = await uploadIPFS(ipfsMedia)
      if (ipfsHash) {
        dispatch(uploadedToIpfs({ fileName: ipfsMedia.path as string, IpfsHash: ipfsHash }))
        dispatch(ipfsStatus({ status: ipfsEnumStatus['DONE'] }))
      } else {
        dispatch(ipfsStatus({ status: ipfsEnumStatus['REJECTED'] }))
      }
    },
    [dispatch]
  )
}
