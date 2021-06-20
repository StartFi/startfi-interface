import { checkSuccess } from 'utils'
import { addDraft, getUserDrafts } from './database/Draft'
import { Draft } from './models/Draft'

export const saveDraft = async (draft: Draft) => {
  const draftAdded = await addDraft(draft)
  const status = checkSuccess({ draftAdded })
  return { status, draftAdded }
}

export const getDrafts = async (ethAddress: string):Promise<{
  userDrafts: Draft | null;
}> => {
  const userDrafts = await getUserDrafts(ethAddress)
  return { userDrafts }
}
