import { add, get, update } from "services/firebase/Firebase"

// import { NFT } from "state/nfts/reducer"
export type UserDoc = {
  ehAddress: string | null | undefined
  name?: string
  email?: string
  // NFT hash array belong to user
  NFTs?: Array<string>
  // NFT hash array belong to any
  whitelists?: Array<number>
}

// add user for first time
export const addUser=async (user: UserDoc)=>{
  if (!user.ehAddress || (await get('users',user.ehAddress))) return
  return  await add('users',user.ehAddress,user)

}

// update user
export const updateUser=async(user: UserDoc)=>{
  if(!user.ehAddress) return;
  const userData = await get('users',user.ehAddress)
  if (!userData) return;
  const userUpdate = { ...userData, ...user }
  return await update('users',user.ehAddress,userUpdate)
}


// get user data
export const getUserData= async(account: any): Promise<UserDoc>=>{
  const userData =await get('users',account)
  return userData;
}


// update user whiteList
export const updateWhiteList =async({ accountId, nft }: any)=>{
  if (!accountId) throw Error('you are not logged in')
  let user = await getUserData(accountId)
  if (!user) throw Error('no user')
  let nftsWhiteList: Array<number>
  if (user?.whitelists) {
    nftsWhiteList = [...user.whitelists]
    nftsWhiteList.includes(nft.id) ? (nftsWhiteList = nftsWhiteList) : (nftsWhiteList = nftsWhiteList.concat(nft.id))
  } else {
    nftsWhiteList = [nft.id]
  }

  const updatedUserData = { ...user, whitelists: [...nftsWhiteList] }
  return await updateUser(updatedUserData)

}


