import { createAction } from '@reduxjs/toolkit'

export interface BcEvent {
  eventName: string
  eventValue: any
}

export const addNewEvent = createAction<BcEvent>('blockchain/event/add')
