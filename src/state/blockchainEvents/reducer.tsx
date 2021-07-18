import { createReducer } from '@reduxjs/toolkit'
import { addNewEvent, BcEvent } from './actions'

export interface BcEventState {
  bcEvents: BcEvent[]
}

const initialState: BcEventState = {
  bcEvents: []
}
export default createReducer(initialState, builder =>
  builder.addCase(addNewEvent, (state, action) => {
    state.bcEvents.push({ eventName: action.payload.eventName, eventValue: action.payload.eventValue })
  })
)
