
import { NFT, NFTS } from 'state/nfts/reducer'
import firebase from './Firebase'





// add/update NFT
export const addNft = async (nft: NFT): Promise<void> => {
  const nftRef = firebase.database().ref('/nfts/' + nft.id)
  return await nftRef.update(nft)
}

// get NFTS
export const getNfts = async (): Promise<NFTS> => {
  const nfts = await (
    await firebase
      .database()
      .ref('nfts')
      .once('value')
  ).val()
  return Object.values(nfts)
}


