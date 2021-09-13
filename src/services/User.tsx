import { checkSuccess } from 'utils'
import { Draft } from './models/Draft'
import { addDraft, getDraft } from './database/Draft'
import { addNFTToWishlist, addUser, getUser, removeNFTFromWishlist } from './database/User'
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

interface Wishlisting {
  userId: string
  nftId: number
}

export const addToWishlist = async ({ userId, nftId }: Wishlisting) => {
  console.log('service add to WL',nftId)
  const addedToWishlist = await addNFTToWishlist(userId, nftId)
  const user = await login(userId)
  return { addedToWishlist, user }
}

export const removeFromWishlist = async ({ userId, nftId }: Wishlisting) => {
  const removedWishlistItem = await removeNFTFromWishlist(userId, nftId)
  const user = await login(userId)
  return { removedWishlistItem, user }
}

export const saveDraft = async (draft: Draft) => {
  const draftAdded = await addDraft(draft)
  const status = checkSuccess({ draftAdded })
  return { status, draftAdded }
}

export const getDrafts = async (user: string) => {
  const drafts = (await getDraft(user))?.drafts
  return { drafts }
}

interface GetUserNFTs {
  chainId: number
  owner: string
}

// get user inMarket offMarket
// export const getUserNFTs = async ({ chainId, owner }: GetUserNFTs) => {
//   const userNFTs = await getNFTs({ chainId, owner })
//   // console.log('step1',userNFTs )
//   const onMarket: NFT[] = []
//   const offMarket: NFT[] = []
//   let userAuctions: Auction[] = []
//   for (var i in userNFTs) {
//     const auctions = await getAuctions({ nft: userNFTs[i].id })
//     if (auctions.length > 0) userAuctions.push(auctions[0])
//     if (auctions.filter(auction => auction.status === 'open').length > 0) onMarket.push(userNFTs[i])
//     else offMarket.push(userNFTs[i])
//   }
//   // console.log('onMarket=>',  onMarket.length,'offMarket=>',offMarket.length)
//   return { onMarket, offMarket, userAuctions }
// }
