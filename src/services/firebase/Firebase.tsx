const firebase: any = {};
console.log(process.env.REACT_APP_FIREBASE_API_KEY)

// const config = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGEING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID,
//   measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
// }

// firebase.initializeApp(config)

export const add = async (entity: string, key: any, object: any): Promise<string | void> => {
  if (!entity) return 'No entity provided'
  if (!key) return 'No key provided'
  if (!object) return 'No object provided'
  const ref = firebase.database().ref(`/${entity}/${key}`)
  return await ref.update(object)
}

export const update = async (entity: string, key: string, object: any): Promise<string | void> => {
  if (!entity) return 'No entity provided'
  if (!key) return 'No key provided'
  if (!object) return 'No object provided'
  const ref = firebase.database().ref(`/${entity}/${key}`)
  return ref.update(object)
}





export const get = async (entity: string, key: string): Promise<any> => {
  return (
    await firebase
      .database()
      .ref(`/${entity}/${key}`)
      .once('value')
  ).val()
}



export default firebase
