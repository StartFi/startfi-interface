import { NFT, NFTS } from 'state/nfts/reducer'
import firebase from './firebaseConfig'

export type UserDoc = {
  ehAddress: string | null | undefined
  name?: string
  email?: string
  // NFT hash array belong to user
  NFTs?: Array<string>
  // NFT hash array belong to any
  whitelists?: Array<string>
}

// add user docs
export const addUserDoc = async (user: UserDoc): Promise<void> => {
  if (!user.ehAddress || (await getUseData(user.ehAddress))) return
  const userRef = firebase.database().ref('/users/' + user.ehAddress)
  return await userRef.update(user)
}


// update userDoc
export const updateUserDoc = async (user: UserDoc): Promise<void> => {
  const userData = await getUseData(user.ehAddress)
  if (!userData) return
  const userUpdate = { ...userData, ...user }
  const userRef = firebase.database().ref('/users/' + user.ehAddress)
  return await userRef.update(userUpdate)
}

// get userData
const getUseData = async (account: any): Promise<UserDoc> => {
  const userData: UserDoc = await (
    await firebase
      .database()
      .ref('/users/' + account)
      .once('value')
  ).val()
  console.log(userData)
  return userData
}
// add/update NFT
export const addNft = async (nft: NFT): Promise<void> => {
  const nftRef = firebase.database().ref('/nfts/' + nft.id)
  return await nftRef.update(nft)
}

// get NFTS
export const getNfts = async (): Promise<NFTS> => {
  const nfts = await (
    await firebase
      .database()
      .ref('nfts')
      .once('value')
  ).val()
  return Object.values(nfts)
}
