import { createAction } from '@reduxjs/toolkit'
export enum ipfsEnumStatus {
  INIT,
  LOADING,
  DONE,
  REJECTED
}

export const uploadedToIpfs = createAction<{ hash: string }>('ipfs/uploaded')
export const ipfsStatus = createAction<{ status: ipfsEnumStatus }>('ipfs/status')
export const ipfsProgress = createAction<{ type: string; progress: number }>('ipfs/progress') // @YT add type as workaround to be Improved
