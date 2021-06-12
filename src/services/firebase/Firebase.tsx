import firebase from 'firebase'
import { NFTQUERY } from 'services/Storage/NFT'
import { NFT, NFTS } from 'state/nfts/reducer'

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

export const add = async (entity: string, key: any, object: any): Promise<string | void> => {
  if (!entity) return 'No entity provided'
  if (!key) return 'No key provided'
  if (!object) return 'No object provided'
  const ref = firebase.database().ref(`/${entity}/${key}`)
  return ref.update(object)
}

export const update = async (entity: string, key: string, object: any): Promise<string | void> => {
  if (!entity) return 'No entity provided'
  if (!key) return 'No key provided'
  if (!object) return 'No object provided'
  const ref = firebase.database().ref(`/${entity}/${key}`)
  return ref.update(object)
}

export interface User {
  ethAddress: string
  name?: string
  email?: string
  NFTs?: Array<string>
  whitelists?: Array<string>
}

export interface Draft {
  user: string
  drafts: NFT[]
}

export type Document = User | NFT | Draft

export const get = async (entity: string, key: string): Promise<Document> => {
  return (
    await firebase
      .database()
      .ref(`/${entity}/${key}`)
      .once('value')
  ).val()
}

const LIMIT = 4

export const getNFTS = async ({ search, category, sort }: NFTQUERY): Promise<NFTS> => {
  var ref: any = firebase.database().ref('nfts')
  if (search) ref = ref.orderByChild('name').equalTo(search)
  else if (category && category !== 'all') ref = ref.orderByChild('category').equalTo(category)
  else if (sort) {
    switch (sort) {
      case 'Lowest price':
        ref = ref.orderByChild('price').limitToFirst(LIMIT)
        break
      case 'Highest price':
        ref = ref.orderByChild('price').limitToLast(LIMIT)
        break
      default:
    }
  }
  const nfts = await (await ref.once('value')).val()
  if (!nfts) return []
  var jsonArray = Object.values(nfts)
  var sorted = sortByKey(jsonArray, 'price', sort === 'Highest price')
  return sorted
}

const sortByKey = (array: any, key: string, desc?: boolean) => {
  var sorted = array.sort((a: any, b: any) => {
    var x = a[key]
    var y = b[key]
    return x < y ? -1 : x > y ? 1 : 0
  })
  if (desc) return sorted.reverse()
  else return sorted
}
