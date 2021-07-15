
import { addDocument, editDocument, getDocument } from 'services/database/Database'
import { Draft } from 'services/models/Draft'

const COLLECTION = 'drafts'

export const addDraft = async (draft: Draft): Promise<string> => {
  const userDrafts = (await getDocument(COLLECTION, draft.user)) as Draft

  if (userDrafts) {
    if(!userDrafts.drafts)userDrafts.drafts=[]
    let userDraftsID= userDrafts.drafts.map(e=>{
      return e.uuid
    })

    const filteredNewDraft=draft.drafts.filter(e=>!userDraftsID.includes(e.uuid))
    const newUserDrafts = { ...userDrafts }
    if(filteredNewDraft.length>0) newUserDrafts.drafts.push(filteredNewDraft[0])
    return editDocument(COLLECTION, newUserDrafts.user, newUserDrafts)
  }
  return addDocument(COLLECTION, draft.user, draft)
}


export const getDraft = async (user: string): Promise<Draft> => {
  return (await getDocument(COLLECTION, user)) as Draft
}

