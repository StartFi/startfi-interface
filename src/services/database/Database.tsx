import firebase from 'firebase'
import { Auction } from 'services/models/Auction'
import { Bid } from 'services/models/Bid'
import { Draft } from 'services/models/Draft'
import { NFT } from 'services/models/NFT'
import { User } from 'services/models/User'

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGEING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
}

firebase.initializeApp(config)

export type Document = User | NFT | Auction | Bid | Draft

export const addDocument = async (entity: string, key: string | number, document: Document): Promise<string> => {
  if (!entity) return 'No entity provided'
  if (!key && key !== 0) return 'No key provided'
  if (!document) return 'No object provided'
  await firebase
    .database()
    .ref(`/${entity}/${key}`)
    .update(document)
  return 'success'
}

export const getDocument = async (entity: string, key: string | number): Promise<Document | null> => {
  
  return (
    await firebase
      .database()
      .ref(`/${entity}/${key}`)
      .once('value')
  ).val()
}

export const editDocument = async (entity: string, key: string | number, document: Document): Promise<string> => {
  if (!entity) return 'No entity provided'
  if (!key && key !== 0) return 'No key provided'
  if (!document) return 'No object provided'
  const oldDocument = await getDocument(entity, key)
  if (oldDocument) {
    const newDocument = { ...oldDocument, ...document }
    await addDocument(entity, key, newDocument)
    return 'success'
  }
  return 'No document'
}

export const getDocumentsByChild = async (entity: string, child: string, value: any): Promise<Document[]> => {
  return Object.values((
    await firebase
      .database()
      .ref(`/${entity}`)
      .orderByChild(child)
      .equalTo(value)
      .once('value')
  ).val())

}
