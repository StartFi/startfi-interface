import { checkSuccess } from 'utils'
import { getAuctions } from './database/Auction'
import { addDraft, getDraft } from './database/Draft'
import {  getNFTs } from './database/NFT'
import { addNFTToWishlist, addUser, getUser } from './database/User'
import { Draft } from './models/Draft'
import { NFT } from './models/NFT'
import { User } from './models/User'

export const login = async (ethAddress: string): Promise<User> => {
  const user = await getUser(ethAddress)
  if (user) return user
  const newUser: User = {
    ethAddress,
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
  const user = await login(userId)
  return { addedToWishlist, user }
}

export const saveDraft = async (draft: Draft) => {
  const draftAdded = await addDraft(draft)
  const status = checkSuccess({ draftAdded })
  return { status, draftAdded }
}

export const getDrafts = async (user: string) => {
  const drafts = (await getDraft(user)).drafts
  return { drafts }
}

export const getUserNFTs = async (owner: string) => {
  const userNFTs = await getNFTs({ owner })
  const onMarket: NFT[] = []
  const offMarket: NFT[] = []
  for (var i in userNFTs) {
    const auctions = await getAuctions({ nft: userNFTs[i].id })
    if (auctions.filter(auction => auction.status === 'open').length > 0) onMarket.push(userNFTs[i])
    else offMarket.push(userNFTs[i])
  }
  return { onMarket, offMarket }
}


