
import { NFT, NFTS } from 'state/nfts/reducer'
import firebase from './firebaseConfig'

export type UserDoc = {
  ehAddress: string
  name?: string
  email?: string
  // NFT hash array belong to user
  NFTs?: Array<string>
   // NFT hash array belong to any
  whitelists?:Array<string>
}

// add/update use docs
export const updateUserDoc = async (user: UserDoc): Promise<void> => {
  const userRef = firebase.database().ref('/users/' + user.ehAddress)
  return await userRef.update(user)
}

// add/update NFT
export const addNft = async (nft: NFT): Promise<void> => {
  const nftRef = firebase.database().ref('/nfts/' +nft.id)
  return await nftRef.update(nft)
}

// get NFTS
export const getNfts =async():Promise<NFTS>=>{
  const nfts =   await (await firebase.database().ref('nfts').once('value')).val()
  return Object.values(nfts)
}
