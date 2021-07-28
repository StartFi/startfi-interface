import { useSelector } from 'react-redux'
import { AppState } from 'state'
import { BcEvent } from './actions'

export const useBcEvents = (): BcEvent[] => {
  return useSelector((state: AppState) => state.bcEvent.bcEvents)
}
