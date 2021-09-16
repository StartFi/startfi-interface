import { BidInterface } from './initial'
import { createAction } from '@reduxjs/toolkit'

export const addToBids = createAction<{ bid: BidInterface }>('bid/add')
