import { getNFTS } from './database/Database'
import { Bid } from './models/Bid'
import { NFT } from './models/NFT'
import { addBidToAuction, editAuction, getAuctionByNFT } from './database/Auction'
import { addNFTToUser, getUser, removeNFTFromUser } from './database/User'
import { addNFT, editNft } from './database/NFT'
import { addBid } from './database/Bid'
import { AuctionNFT } from './models/AuctionNFT'
import { checkSuccess } from 'utils'

export const mintNFT = async (nft: NFT) => {
  //get from blockchain or compute
  const txtHash = ''
  nft.id = 0
  nft.txtHash = txtHash
  const nftAdded = await addNFT(nft)
  const nftAddedToOwner = await addNFTToUser(nft.issuer, nft.id)
  const status = checkSuccess({ nftAddedToOwner, nftAdded })
  return { status, nftAddedToOwner, nftAdded, txtHash }
}

export type NFTQUERY = {
  search?: string
  category?: string
  sort?: string
}

export const getNFTsOnAuction = async (query?: NFTQUERY) => {
  const t0 = performance.now()
  const nfts = await getNFTS(query || {})
  const t1 = performance.now()
  const loadtime = Math.round(t1 - t0)
  return { nfts, loadtime, ...query }
}

export const getAuctionNFT = async (nft: NFT) => {
  const owner = await getUser(nft.owner)
  const issuer = await getUser(nft.issuer)
  const ownerdetails = owner.details || 'No details'
  const ownername = owner.name || 'No name'
  const issuername = issuer.name || 'No name'
  const auction = await getAuctionByNFT(nft.id)
  const auctionNFT: AuctionNFT = {
    nft,
    auction,
    ownername,
    issuername,
    ownerdetails
  }
  return { auctionNFT }
}

interface BuyNFT {
  nftId: number
  auctionId: number
  owner: string
  buyer: string
  soldPrice: number
}

export const buyNFT = async ({ nftId, auctionId, owner, buyer, soldPrice }: BuyNFT) => {
  //get from blockchain
  const purchaseTxt = ''
  const nftChange = {
    id: nftId,
    owner: buyer,
    onAuction: false,
    price: 0
  }
  const auctionChange = {
    id: auctionId,
    expireTimestamp: Date.now(),
    buyer: buyer,
    isForSale: false,
    isForBid: false,
    purchaseTime: new Date(),
    purchaseTxt,
    soldPrice
  }
  const nftRemovedFromSeller = await removeNFTFromUser(owner, nftId)
  const nftAddedToBuyer = await addNFTToUser(buyer, nftId)
  const nftEdited = await editNft(nftChange)
  const auctionEdited = await editAuction(auctionChange)
  const status = checkSuccess({ nftRemovedFromSeller, nftAddedToBuyer, nftEdited, auctionEdited })
  return { status, nftRemovedFromSeller, nftAddedToBuyer, nftEdited, auctionEdited, purchaseTxt }
}

interface PlaceBid {
  auctionId: number
  bid: Bid
}

export const placeBid = async ({ auctionId, bid }: PlaceBid) => {
  //to get from blockchain or compute
  const txtHash = ''
  bid.id = 1
  bid.expireTimestamp = 0
  bid.txtHash = txtHash
  const bidAdded = await addBid(bid)
  const bidAddedToAuction = await addBidToAuction(auctionId, bid.id)
  const status = checkSuccess({ bidAdded, bidAddedToAuction })
  return { status, bidAdded, bidAddedToAuction, txtHash }
}
