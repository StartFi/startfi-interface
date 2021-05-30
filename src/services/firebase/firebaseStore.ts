import { NFTS } from 'state/nfts/reducer'
import firebase from './firebaseConfig'

export type UserDoc = {
  ehAddress: string
  name?: string
  email?: string
  NFTs?: NFTS
}

// add/update use docs
export const updateUserDoc = async (user: UserDoc): Promise<void> => {
  const userRef = firebase.database().ref('/users/' + user.ehAddress)
  return await userRef.update(user)
}
