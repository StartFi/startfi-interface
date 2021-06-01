import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { uploadIPFS, IpfsMedia } from 'services/Ipfs/Ipfs'
import { AppState } from 'state'
import { uploadedToIpfs, ipfsStatus, ipfsEnumStatus } from '../../state/ipfs/actions'

export const useIpfsHashes = (): string[] => {
  return useSelector((state: AppState) => state.ipfs.ipfsHashs)
}

export const useIpfsStatus = (): ipfsEnumStatus | null => {
  return useSelector((state: AppState) => state.ipfs.ipfsStatus)
}

export const useUploadToIpfs = (ipfsMedia: IpfsMedia): void => {
  const dispatch = useDispatch()
  dispatch(ipfsStatus({ status: ipfsEnumStatus['LOADING'] }))
  useEffect(() => {
    const uploadFile = async () => {
      const ipfsHash = await uploadIPFS(ipfsMedia)
      if (ipfsHash) {
        dispatch(uploadedToIpfs({ IpfsHash: ipfsHash }))
        dispatch(ipfsStatus({ status: ipfsEnumStatus['DONE'] }))
      } else {
        dispatch(ipfsStatus({ status: ipfsEnumStatus['REJECTED'] }))
      }
    }
    uploadFile()
  }, [dispatch])
}
