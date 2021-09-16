import { createReducer } from '@reduxjs/toolkit'

import { addToBids } from './actions'
import { initialState } from './initial'

export default createReducer(initialState, builder =>
  builder.addCase(addToBids, (state, action) => {
    state.bids.push(action.payload.bid)
  })
)
