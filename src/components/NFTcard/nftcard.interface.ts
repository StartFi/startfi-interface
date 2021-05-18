import { NFT } from "state/nfts/reducer";

 export interface NftCardProps {
    cardContent: NFT
    navigateToCard: (clickedCard: NFT) => void
    addToWhiteList: (clickedCard: NFT) => void
    placeBid: (clickedCard: NFT) => void
  }