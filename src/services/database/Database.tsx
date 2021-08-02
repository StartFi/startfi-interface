import { Dictionary } from './../../constants'
import firebase from 'firebase'
import { Document } from 'services/models/Document'

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

const DB = firebase.firestore()

export const addDocument = async (collection: string, key: string | number, document: Document): Promise<string> => {
  if (!collection) return 'No entity provided'
  if (!key && key !== 0) return 'No key provided'
  if (!document) return 'No object provided'
  await DB.collection(collection)
    .doc(key.toString())
    .set(document)
  return 'success'
}

export const getDocument = async (collection: string, key: string | number): Promise<Document | undefined> => {
  return (await (
    await DB.collection(collection)
      .doc(key.toString())
      .get()
  ).data()) as Document
}

export const editDocument = async (collection: string, key: string | number, document: Document): Promise<string> => {
  if (!collection) return 'No entity provided'
  if (!key && key !== 0) return 'No key provided'
  if (!document) return 'No object provided'
  const oldDocument = await getDocument(collection, key)
  if (oldDocument) {
    const newDocument = { ...oldDocument, ...document }
    await addDocument(collection, key, newDocument)
    return 'success'
  }
  return 'No document'
}

export const getDocuments = async (
  collection: string,
  filters?: Dictionary,
  orders?: Dictionary
): Promise<Document[]> => {
  var query: any = DB.collection(collection)
  if (filters) Object.keys(filters).forEach(key => (query = query.where(key, '==', filters[key])))
  if (orders) Object.keys(orders).forEach(key => (query = query.orderBy(key, orders[key])))
  return snapshotToArray(await query.get().catch((err: any) => console.log(err)))
}

export const getDocumentsPaginated = async (
  collection: string,
  filters?: Dictionary,
  orders?: Dictionary,
  lastVisible?: any
): Promise<any> => {
  var query: any = DB.collection(collection)
  if (filters) Object.keys(filters).forEach(key => (query = query.where(key, '==', filters[key])))
  if (orders) Object.keys(orders).forEach(key => (query = query.orderBy(key, orders[key])))
  if (lastVisible) query = query.startAfter(lastVisible)
 // return snapshotToArray(await query.get().catch((err: any) => console.log(err)))
 // if (lastVisible) query = query.startAfter(lastVisible)
   return query.get().catch((err: any) => console.log(err))
}

export const snapshotToArray = (
  snapshot: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData> | void
): Document[] => {
  const result: Document[] = []
  if (snapshot) snapshot.forEach(doc => result.push(doc.data() as Document))
  return result
}
