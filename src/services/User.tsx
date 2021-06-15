import { checkSuccess } from 'utils'
import { addDraft } from './database/Draft'
import { Draft } from './models/Draft'

export const saveDraft = async (draft: Draft) => {
  const draftAdded = await addDraft(draft)
  const status = checkSuccess({ draftAdded })
  return { status, draftAdded }
}
