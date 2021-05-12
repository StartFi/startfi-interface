export interface NftCardContent {
    ntfImg: string
    title: string
    price: string
    description: string
  }

 export interface NftCardProps {
    cardContent: NftCardContent
    navigateToCard: (clickedCard: NftCardContent) => void
    addToWhiteList: (clickedCard: NftCardContent) => void
    placeBid: (clickedCard: NftCardContent) => void
  }