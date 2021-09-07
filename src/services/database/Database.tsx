import { Dictionary } from './../../constants'
import firebase from 'firebase'
import { Document } from 'services/models/Document'
import config from './config'

firebase.initializeApp(config)

const DB = firebase.firestore()
firebase.firestore().settings({ experimentalForceLongPolling: true })

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

const snapshotToArray = (
  snapshot: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData> | void
): Document[] => {
  const result: Document[] = []
  if (snapshot) snapshot.forEach(doc => result.push(doc.data() as Document))
  return result
}

export const getDocuments = async (
  collection: string,
  filters?: Dictionary,
  orders?: Dictionary
): Promise<Document[]> => {
  let query: any = DB.collection(collection)
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
  let query: any = DB.collection(collection)
  if (filters) Object.keys(filters).forEach(key => (query = query.where(key, '==', filters[key])))
  if (orders) Object.keys(orders).forEach(key => (query = query.orderBy(key, orders[key])))
  if (lastVisible) query = query.startAfter(lastVisible)
  return query.get().catch((err: any) => console.log(err))
}
