import { createAction } from '@reduxjs/toolkit'
export enum ipfsEnumStatus {
  INIT,
  LOADING,
  DONE,
  REJECTED
}
export const uploadedToIpfs = createAction<{ IpfsHash: string }>('ipfs/uploaded')
export const ipfsStatus = createAction<{ status: ipfsEnumStatus }>('ipfs/status')
export const ipfsProgress = createAction<{ progress: string }>('ipfs/progress')
