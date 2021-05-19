// import { NFT } from "state/nfts/reducer"

export const addToWhitelist = async ({ user, nft }: any) => {
  return { response: true, user, nft }
}
