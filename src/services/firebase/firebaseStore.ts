import { NFT } from 'services/models/NFT'

const firebase: any = {};

// add/update NFT
export const addNft = async (nft: NFT): Promise<void> => {
  const nftRef = firebase.database().ref('/nfts/' + nft.id)
  return await nftRef.update(nft)
}

// get NFTS
export const getNfts = async (query?: any): Promise<NFT[]> => {
  const nfts = await (
    await firebase
      .database()
      .ref('nfts')
      .once('value')
  ).val()
  return Object.values(nfts)
}


