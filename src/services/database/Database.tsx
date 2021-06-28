import { NFTQUERYLIMIT } from '../../constants'
import firebase from 'firebase'
import { Auction } from 'services/models/Auction'
import { Bid } from 'services/models/Bid'
import { Draft } from 'services/models/Draft'
import { NFT } from 'services/models/NFT'
import { User } from 'services/models/User'
import { sortByKey } from 'utils'
import { NFTQUERY } from 'services/Marketplace'

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
  await firebase
    .database()
    .ref(`/${entity}/${key}`)
    .update(document)
  return 'success'
}

export const getDocumentsByChild = async (entity: string, child: string, value: any): Promise<Document[]> => {
  return (
    await firebase
      .database()
      .ref(`/${entity}`)
      .orderByChild(child)
      .equalTo(value)
      .once('value')
  ).val()

}

export const getNFTS = async ({ search, category, sort }: NFTQUERY): Promise<NFT[]> => {
  var ref: any = firebase.database().ref('nfts')
  if (search) ref = ref.orderByChild('name').equalTo(search)
  else if (category && category !== 'all') ref = ref.orderByChild('category').equalTo(category)
  else if (sort) {
    switch (sort) {
      case 'Lowest price':
        ref = ref.orderByChild('price').limitToFirst(NFTQUERYLIMIT)
        break
      case 'Highest price':
        ref = ref.orderByChild('price').limitToLast(NFTQUERYLIMIT)
        break
      default:
    }
  }
  const nfts = await (await ref.once('value')).val()
  if (!nfts) return []
  return sortByKey(Object.values(nfts), 'price', sort === 'Highest price')
}
