import { createReducer } from '@reduxjs/toolkit'
import { uploadedToIpfs, ipfsStatus, ipfsEnumStatus, ipfsProgress } from './actions'

export interface IpfsState {
  ipfsHash: string
  ipfsStatus: ipfsEnumStatus | null
  ipfsProgress: number
}

const initialState: IpfsState = {
  ipfsHash: '',
  ipfsStatus: ipfsEnumStatus['INIT'],
  ipfsProgress: 0
}

export default createReducer(initialState, builder =>
  builder
    .addCase(uploadedToIpfs, (state, action) => {
      state.ipfsHash = action.payload.hash
    })
    .addCase(ipfsStatus, (state, action) => {
      state.ipfsStatus = action.payload.status
    })
    .addCase(ipfsProgress, (state, action) => {
      state.ipfsProgress = action.payload.progress
    })
)
