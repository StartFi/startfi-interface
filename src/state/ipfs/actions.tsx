import { createAction } from '@reduxjs/toolkit'
export enum ipfsEnumStatus {
  'init',
  'loading',
  'done',
  'rejected'
}
export const uploadedToIpfs = createAction<{ IpfsHash: string }>('ipfs/uploaded')
export const ipfsStatus = createAction<{ status: ipfsEnumStatus }>('ipfs/status')
