import { addDocument, editDocument, getDocument } from 'services/database/Database'
import { Draft } from 'services/models/Draft'

const ENTITY = 'drafts'

export const addDraft = async (draft: Draft): Promise<string> => {
  var data
  const userDrafts = (await getDocument(ENTITY, draft.user)) as Draft
  if (userDrafts) {
    var newUserDrafts = { ...userDrafts }
    newUserDrafts.drafts.push(draft.drafts[0])
    data = await editDocument(ENTITY, newUserDrafts.user, newUserDrafts)
  } else data = await addDocument(ENTITY, draft.user, draft)
  return data
}
