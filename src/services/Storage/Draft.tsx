import { add, Draft, get, update } from 'services/firebase/Firebase'
import { NFT } from 'state/nfts/reducer'

interface SaveDraft {
  user: string
  draft: NFT
}

const ENTITY = 'drafts'

export const addDraft = async ({ user, draft }: SaveDraft) => {
  var data;
  const userDrafts = await get(ENTITY, user) as Draft
  if (userDrafts) {
    userDrafts.drafts.push(draft)
    data = await update(ENTITY, user, userDrafts)
  } else {
    data = await add(ENTITY, user, {user,drafts:[draft]})
  }
  return {data}
}

export const getDrafts = async (user: string) => {
  const drafts = await get(ENTITY, user)
  return {drafts}
}
