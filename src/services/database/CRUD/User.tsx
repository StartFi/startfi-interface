import { addDocument, editDocument, getDocument } from './Database'
import { Users } from '../models/User'

const COLLECTION = 'users'

export const addUser = async (user: Users): Promise<string> => {
  return addDocument(COLLECTION, user.ethAddress, user)
}

export const getUser = async (ethAddress: string): Promise<Users> => {
  return (await getDocument(COLLECTION, ethAddress)) as Users
}

export const editUser = async (user: any): Promise<string> => {
  return editDocument(COLLECTION, user.ethAddress, user)
}

export const addNFTToWishlist = async (userId: string, nftId: number): Promise<string> => {
  const oldUser = (await getDocument(COLLECTION, userId)) as Users
  if (oldUser) {
    const newUser = { ...oldUser }
    if (newUser.wishlist) {
      if (newUser.wishlist.includes(nftId)) return "NFT already exist is user's wishlist"
      else newUser.wishlist.push(nftId)
    } else newUser.wishlist = [nftId]
    return editDocument(COLLECTION, newUser.ethAddress, newUser)
  }
  return 'No user'
}

export const removeNFTFromWishlist = async (userId: string, nftId: number): Promise<string> => {
  const oldUser = (await getDocument(COLLECTION, userId)) as Users
  if (oldUser) {
    const newUser = { ...oldUser }
    const index = newUser.wishlist.indexOf(nftId)
    newUser.wishlist.splice(index, 1)
    return editDocument(COLLECTION, newUser.ethAddress, newUser)
  }
  return 'No user'
}
