import { add, get } from 'services/firebase/Firebase'
import { NFT } from 'state/nfts/reducer'

interface SaveDraft {
  user: string
  draft: NFT
}

export const addDraft = async ({ user, draft }: SaveDraft): Promise<string | void> => {
  return add('drafts', user, draft)
}

export const getDrafts = (user: string) => {
  return get('drafts', user)
}
