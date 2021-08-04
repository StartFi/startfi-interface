import { addDocument, editDocument, getDocument } from 'services/database/Database'
import { User } from 'services/models/User'

const COLLECTION = 'users'

export const addUser = async (user: User): Promise<string> => {
  return addDocument(COLLECTION, user.ethAddress, user)
}

export const getUser = async (ethAddress: string): Promise<User> => {
  return (await getDocument(COLLECTION, ethAddress)) as User
}

export const editUser = async (user: any): Promise<string> => {
  return editDocument(COLLECTION, user.ethAddress, user)
}

export const addNFTToWishlist = async (userId: string, nftId: number): Promise<string> => {
  const oldUser = (await getDocument(COLLECTION, userId)) as User
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
  const oldUser = (await getDocument(COLLECTION, userId)) as User
  if (oldUser) {
    const newUser = { ...oldUser }
    const index = newUser.wishlist.indexOf(nftId)
    newUser.wishlist.splice(index, 1)
    return editDocument(COLLECTION, newUser.ethAddress, newUser)
  }
  return 'No user'
}
