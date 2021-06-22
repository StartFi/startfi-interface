import { addDocument, editDocument, getDocument } from 'services/database/Database'
import { User } from 'services/models/User'

const ENTITY = 'users'

export const addUser = async (user: User) => {
  return addDocument(ENTITY, user.ethAddress, user)
}

export const getUser = async (ethAddress: string): Promise<User> => {
  return (await getDocument(ENTITY, ethAddress)) as User
}

export const editUser = async (user: any): Promise<string> => {
  return editDocument(ENTITY, user.ethAddress, user)
}

export const addNFTToWishlist = async (userId: string, nftId: number) => {
  const oldUser = (await getDocument(ENTITY, userId)) as User
  if (oldUser) {
    const newUser = { ...oldUser }
    if (newUser.wishlist) {
      if (newUser.wishlist.includes(nftId)) return "NFT already exist is user's wishlist"
      else newUser.wishlist.push(nftId)
    } else newUser.wishlist = [nftId]
    return editDocument(ENTITY, newUser.ethAddress, newUser)
  }
  return 'No user'
}
