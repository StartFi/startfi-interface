import { createReducer } from '@reduxjs/toolkit'
import { uploadedToIpfs, ipfsStatus, ipfsEnumStatus, ipfsProgress } from './actions'

export interface IpfsFile {
  fileName: string
  hash: string
}
export interface IpfsState {
  ipfsFiles: IpfsFile[]
  ipfsStatus: ipfsEnumStatus | null
  ipfsProgress: string
}

const initialState: IpfsState = {
  ipfsFiles: [],
  ipfsStatus: ipfsEnumStatus['INIT'],
  ipfsProgress: '0%'
}

export default createReducer(initialState, builder =>
  builder
    .addCase(uploadedToIpfs, (state, action) => {
      state.ipfsFiles.push({ fileName: action.payload.fileName, hash: action.payload.IpfsHash })
    })
    .addCase(ipfsStatus, (state, action) => {
      state.ipfsStatus = action.payload.status
    })
    .addCase(ipfsProgress, (state, action) => {
      state.ipfsProgress = action.payload.progress
    })
)
