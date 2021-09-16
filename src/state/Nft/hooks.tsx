import { filter } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from 'state'
import { NftsById } from './initial'

export const useGetAllNfts = (): NftsById => {
  return useSelector((state: AppState) => state.nft)
}
