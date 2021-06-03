import firebase from 'firebase'

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

export const add = async (entity: string, key: string, object: any): Promise<string | void> => {
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
