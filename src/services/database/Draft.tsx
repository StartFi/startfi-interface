
import { addDocument, editDocument, getDocument } from 'services/database/Database'
import { Draft } from 'services/models/Draft'

const COLLECTION = 'drafts'

export const addDraft = async (draft: Draft): Promise<string> => {
  const userDrafts = (await getDocument(COLLECTION, draft.user)) as Draft
  console.log(userDrafts.drafts)
  if (userDrafts) {
    if(!userDrafts.drafts)userDrafts.drafts=[]

    const newUserDrafts = { ...userDrafts }
    newUserDrafts.drafts.push(draft.drafts[0])
    return editDocument(COLLECTION, newUserDrafts.user, newUserDrafts)
  }
  return addDocument(COLLECTION, draft.user, draft)
}


export const getDraft = async (user: string): Promise<Draft> => {
  return (await getDocument(COLLECTION, user)) as Draft
}

