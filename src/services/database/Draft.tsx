
import { addDocument, editDocument, getDocument } from 'services/database/Database'
import { Draft } from 'services/models/Draft'


const ENTITY = 'drafts'

export const addDraft = async (draft: Draft): Promise<string> => {
  const userDrafts = (await getDocument(ENTITY, draft.user)) as Draft
  if (userDrafts) {
    const newUserDrafts = { ...userDrafts }
    newUserDrafts.drafts.push(draft.drafts[0])
    return editDocument(ENTITY, newUserDrafts.user, newUserDrafts)
  }
  return addDocument(ENTITY, draft.user, draft)
}

// get user draft
export const getUserDrafts = async (ethAddress:string):Promise<Draft>=> {
  const userDraft = (await getDocument(ENTITY, ethAddress)) as Draft
  return userDraft
}
