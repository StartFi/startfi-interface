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
  const oldUser = await getDocument(ENTITY, user.id)
  if (oldUser) {
    const newUser = { ...oldUser, ...user }
    return editDocument(ENTITY, newUser.ethAddress, newUser)
  }
  return 'No user'
}

export const addNFTToUser = async (userId: string, nftId: number): Promise<string> => {
  const oldUser = (await getDocument(ENTITY, userId)) as User
  if (oldUser) {
    const newUser = { ...oldUser }
    if (newUser.nfts) newUser.nfts.push(nftId)
    else newUser.nfts = [nftId]
    return editDocument(ENTITY, newUser.ethAddress, newUser)
  }
  return 'No user'
}

export const removeNFTFromUser = async (userId: string, nftId: number): Promise<string> => {
  const oldUser = (await getDocument(ENTITY, userId)) as User
  if (oldUser) {
    const newUser = { ...oldUser }
    if (newUser.nfts) {
      const index = newUser.nfts.indexOf(nftId)
      if (index !== -1) newUser.nfts.splice(index, 1)
    }
    return editDocument(ENTITY, newUser.ethAddress, newUser)
  }
  return 'No user'
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
