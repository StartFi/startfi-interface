import { checkSuccess } from 'utils'
import { Drafts } from './models/Draft'
import { addDraft, getDraft } from './CRUD/Draft'
import { addNFTToWishlist, addUser, getUser, removeNFTFromWishlist } from './CRUD/User'
import { Users } from './models/User'

export const login = async (ethAddress: string): Promise<Users> => {
  const user = await getUser(ethAddress)
  if (user) return user
  const newUser: Users = {
    ethAddress,
    wishlist: []
  }
  await addUser(newUser)
  return getUser(ethAddress)
}

interface Wishlist {
  userId: string
  nftId: number
}

export const addToWishlist = async ({ userId, nftId }: Wishlist) => {
  const addedToWishlist = await addNFTToWishlist(userId, nftId)
  const user = await login(userId)
  return { addedToWishlist, user }
}

export const removeFromWishlist = async ({ userId, nftId }: Wishlist) => {
  const removedWishlistItem = await removeNFTFromWishlist(userId, nftId)
  const user = await login(userId)
  return { removedWishlistItem, user }
}

export const saveDraft = async (draft: Drafts) => {
  const draftAdded = await addDraft(draft)
  const status = checkSuccess({ draftAdded })
  return { status, draftAdded }
}

export const getDrafts = async (user: string) => {
  const drafts = await getDraft(user)
  return { drafts }
}

interface GetUserNFTs {
  chainId: number
  owner: string
}
