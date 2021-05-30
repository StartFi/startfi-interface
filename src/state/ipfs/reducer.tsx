import { createReducer } from '@reduxjs/toolkit'
import { uploadedToIpfs, ipfsStatus, ipfsEnumStatus, ipfsProgress } from './actions'

export interface IpfsState {
  ipfsHashs: string[]
  ipfsStatus: ipfsEnumStatus | null
  ipfsProgress: string
}

const initialState: IpfsState = {
  ipfsHashs: [],
  ipfsStatus: ipfsEnumStatus['init'],
  ipfsProgress: '0%'
}

export default createReducer(initialState, builder =>
  builder
    .addCase(uploadedToIpfs, (state, action) => {
      state.ipfsHashs.push(action.payload.IpfsHash)
    })
    .addCase(ipfsStatus, (state, action) => {
      state.ipfsStatus = action.payload.status
    })
    .addCase(ipfsProgress, (state, action) => {
      state.ipfsProgress = action.payload.progress
    })
)
