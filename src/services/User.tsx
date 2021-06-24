import { checkSuccess } from 'utils'
import { addDraft } from './database/Draft'
import { addNFTToWishlist, addUser, getUser } from './database/User'
import { Draft } from './models/Draft'
import { User } from './models/User'

export const login = async (ethAddress: string): Promise<User> => {
  const user = await getUser(ethAddress)
  if (user) return user
  const newUser: User = {
    ethAddress,
    nfts: [],
    wishlist: []
  }
  await addUser(newUser)
  return getUser(ethAddress)
}

interface AddToWishList {
  userId: string
  nftId: number
}

export const addToWishlist = async ({ userId, nftId }: AddToWishList) => {
  const addedToWishlist = await addNFTToWishlist(userId, nftId)
  return { addedToWishlist }
}

export const saveDraft = async (draft: Draft) => {
  const draftAdded = await addDraft(draft)
  const status = checkSuccess({ draftAdded })
  return { status, draftAdded }
}
