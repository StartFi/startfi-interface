import { addDocument, editDocument, getDocument } from './Database'
import { Drafts } from '../models/Draft'

const COLLECTION = 'drafts'

export const addDraft = async (draft: Drafts): Promise<string> => {
  const userDrafts = (await getDocument(COLLECTION, draft.user)) as Drafts
  const isNftDraft = draft.draftsNFT?.length

  if (userDrafts) {
    if (draft.draftsNFT) {
      if (!userDrafts.draftsNFT) userDrafts.draftsNFT = []
      const userDraftsID = userDrafts.draftsNFT.map(e => {
        return e.uuid
      })

      const filteredNewDraft = draft.draftsNFT?.filter(e => !userDraftsID.includes(e.uuid))
      const newUserDrafts = { ...userDrafts }
      if (filteredNewDraft) {
        newUserDrafts.draftsNFT?.push(filteredNewDraft[0])
      }
    } else if (draft.draftsListing) {
      if (!userDrafts.draftsListing) userDrafts.draftsListing = []
      const userDraftsID = userDrafts.draftsListing.map(e => {
        return e.id
      })

      const filteredNewDraft = draft.draftsListing?.filter(e => !userDraftsID.includes(e.id))
      const newUserDrafts = { ...userDrafts }
      if (filteredNewDraft) {
        newUserDrafts.draftsListing?.push(filteredNewDraft[0])
      }
      return editDocument(COLLECTION, newUserDrafts.user, newUserDrafts)
    }
  }
  return addDocument(COLLECTION, draft.user, draft)
}

export const getDraft = async (user: string): Promise<Drafts> => {
  return (await getDocument(COLLECTION, user)) as Drafts
}
