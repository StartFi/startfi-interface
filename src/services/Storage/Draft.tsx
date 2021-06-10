import { add, get } from 'services/firebase/Firebase'
import { NFT } from 'state/nfts/reducer'

interface SaveDraft {
  user: string
  draft: NFT
}

export const addDraft = async ({ user, draft }: SaveDraft) => {
  add('drafts', user, draft)
}

export const getDrafts = async (user: string) => {
  const drafts = await get('drafts', user)
  return {drafts}
}
