import firebase from 'firebase'
import { NFTQUERY } from 'services/Storage/NFT'
import { NFTS } from 'state/nfts/reducer'

const config = {
  apiKey: 'AIzaSyAEfaxq7kI6WaIBx5fFha7s_xNGpp1VJI8',
  authDomain: 'startfi.firebaseapp.com',
  databaseURL: 'https://startfi-default-rtdb.firebaseio.com',
  projectId: 'startfi',
  storageBucket: 'startfi.appspot.com',
  messagingSenderId: '1000520660943',
  appId: '1:1000520660943:web:75345b1537bbc7b9c1c4ba',
  measurementId: 'G-FMNWBD4D1K'
}

firebase.initializeApp(config)

export const add = async (entity: string, key: any, object: any): Promise<string | void> => {
  if (!entity) return 'No entity provided'
  if (!key) return 'No key provided'
  if (!object) return 'No object provided'
  const ref = firebase.database().ref('/nfts/' + key)
  return ref.update(object)
}

export const update = async (entity: string, key: string, object: any): Promise<string | void> => {
  if (!entity) return 'No entity provided'
  if (!key) return 'No key provided'
  if (!object) return 'No object provided'
  const ref = firebase.database().ref(`/${entity}/${key}`)
  return ref.update(object)
}

interface User {
  ethAddress: string
  name?: string
  email?: string
  NFTs?: Array<string>
  whitelists?: Array<string>
}

type Document = User

export const get = async (entity: string, key: string): Promise<Document> => {
  return (
    await firebase
      .database()
      .ref(`/${entity}/${key}`)
      .once('value')
  ).val()
}

// const LIMIT = 4

export const getNFTS = async ({ search, category, sort }: NFTQUERY): Promise<NFTS> => {
  var ref = firebase
    .database()
    .ref('nfts')
    .orderByChild(search ? 'name' : (category ? 'category' : 'price'))
  if (search) ref = ref.equalTo(search)
  if (category && category !== 'all') ref = ref.equalTo(category)
  // if (search || category) ref = ref.orderByChild('price')
  // switch (sort) {
  //   case 'Lowest price':
  //     ref = ref.limitToFirst(LIMIT)
  //     break
  //   case 'Highest price':
  //     ref = ref.limitToLast(LIMIT)
  //     break
  //   default: //ref = ref.limitToFirst(LIMIT)
  // }
  const nfts = await (await ref.once('value')).val()
  console.log(nfts)
  if (!nfts) return []
  var jsonArray = Object.values(nfts)
  var sorted = sortByKey(jsonArray, 'price', sort === 'Highest price')
  return sorted
}

const sortByKey = (array: any, key: string, desc?:boolean) => {
  var sorted = array.sort((a: any, b: any) => {
    var x = a[key]
    var y = b[key]
    return x < y ? -1 : x > y ? 1 : 0
  })
  if (desc) return sorted.reverse()
  else return sorted
}
