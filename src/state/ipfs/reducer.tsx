import { createReducer } from '@reduxjs/toolkit'
import { uploadedToIpfs, ipfsStatus, ipfsEnumStatus } from './actions'

export interface IpfsState {
  ipfsHashs: string[]
  ipfsStatus: ipfsEnumStatus | null
}

const initialState: IpfsState = {
  ipfsHashs: [],
  ipfsStatus: ipfsEnumStatus['init']
}

export default createReducer(initialState, builder =>
  builder
    .addCase(uploadedToIpfs, (state, action) => {
      state.ipfsHashs.push(action.payload.IpfsHash)
    })
    .addCase(ipfsStatus, (state, action) => {
      state.ipfsStatus = action.payload.status
    })
)
