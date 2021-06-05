import { UserDoc } from 'services/User/User'
import { NFT, NFTS } from 'state/nfts/reducer'
import firebase from './Firebase'

// export type UserDoc = {
//   ehAddress: string | null | undefined
//   name?: string
//   email?: string
//   // NFT hash array belong to user
//   NFTs?: Array<string>
//   // NFT hash array belong to any
//   whitelists?: Array<number>
// }

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
export const getUseData = async (account: any): Promise<UserDoc> => {
  const userData: UserDoc = await (
    await firebase
      .database()
      .ref('/users/' + account)
      .once('value')
  ).val()

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

// updateWhiteList
export const updateWhiteList = async ({ accountId, nft }: any) => {
  if (!accountId) throw Error('you are not logged in')
  let user = await getUseData(accountId)
  if (!user) throw Error('no user')
  let nftsWhiteList: Array<number>
  if (user?.whitelists) {
    nftsWhiteList = [...user.whitelists]
    nftsWhiteList.includes(nft.id) ? (nftsWhiteList = nftsWhiteList) : (nftsWhiteList = nftsWhiteList.concat(nft.id))
  } else {
    nftsWhiteList = [nft.id]
  }

  const updatedUserData = { ...user, whitelists: [...nftsWhiteList] }
  return await updateUserDoc(updatedUserData)
}

