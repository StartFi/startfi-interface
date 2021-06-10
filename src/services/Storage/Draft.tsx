import { add, get } from 'services/firebase/Firebase'
import { NFT } from 'state/nfts/reducer'

interface SaveDraft {
  user: string
  draft: NFT
}

export const addDraft = async ({ user, draft }: SaveDraft) => {
  const data = await add('drafts', user, draft)
  return {data}
}

export const getDrafts = async (user: string) => {
  const drafts = await get('drafts', user)
  return {drafts}
}
