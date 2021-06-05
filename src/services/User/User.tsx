import { add, get } from "services/firebase/Firebase"

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

export const addUser=async (user: UserDoc)=>{
  if (!user.ehAddress || (await get('users',user.ehAddress))) return
  return add('users',user.ehAddress,user)



}
export const addToWhitelist = async ({ user, nft }: any) => {
  return { response: true, user, nft }
}
