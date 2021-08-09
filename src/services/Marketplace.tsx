import { Bid } from './models/Bid'
import { NFT } from './models/NFT'
import { addAuction, addBidToAuction, editAuction, getAuction, getAuctionsPaginated } from './database/Auction'
import { getUser } from './database/User'
import { addNFT, editNFT, getNFT, getNFTs } from './database/NFT'
import { addBid } from './database/Bid'
import { AuctionNFT } from './models/AuctionNFT'
import { checkSuccess, sortHelper } from 'utils'
import { Auction } from './models/Auction'
import { DEFAULT_SORT, NFTS_PER_PAGE } from './../constants'

export const mintNFT = async (nft: NFT) => {
  const nftAdded = await addNFT(nft)
  const status = checkSuccess({ nftAdded })
  return { status, nftAdded }
}

export const addToMarketplace = async (auction: Auction) => {
  const auctionAdded = await addAuction(auction)
  const status = checkSuccess({ auctionAdded })
  return { status, auctionAdded }
}

export interface NFTQUERY {
  chainId?: number
  search?: string
  category?: string
  sort?: string
  name?: string
  newPage?: number
  lastAuction?: any
}
export const getMarketplace = async (query?: NFTQUERY) => {
  const t0 = performance.now()
  if (!query) query = {}
  const { search, category, sort, lastAuction } = query
  const nftsQuery: NFTQUERY = {}
  if (search) nftsQuery.name = search
  if (category && category !== 'all') nftsQuery.category = category
  const auctionSort = sort ? sort : DEFAULT_SORT
  const nfts = await getNFTs(nftsQuery)
  const auctions = await getAuctionsPaginated({ status: 'open' }, sortHelper(auctionSort), lastAuction)
  let onMarket: AuctionNFT[] = []
  auctions.forEach((rawAuction: any) => {
    const auction = rawAuction.data()
    const nft = nfts.filter((nft: NFT) => nft.id === auction.nft)[0]
    if (nft) {
      if (nft.issueDate) delete nft.issueDate
      if (auction.purchaseTime) delete auction.purchaseTime
      onMarket.push({
        nft,
        auction,
        ownername: '',
        issuername: '',
        ownerdetails: ''
      })
    }
  })
  onMarket = onMarket.slice(0, NFTS_PER_PAGE)
  const id = onMarket[onMarket.length - 1]?.auction.id
  let newLastAuction = null
  auctions.forEach((a: any) => {
    if (a.data().id === id) newLastAuction = a
  })
  const t1 = performance.now()
  const loadtime = Math.round(t1 - t0)
  return { onMarket, loadtime, newLastAuction, auctions, ...query }
}

interface GetAuctionNFT {
  nftId: string
  auctionId: string
  AuctionNFT?: AuctionNFT
}

export const getAuctionNFT = async ({ nftId, auctionId, AuctionNFT }: GetAuctionNFT) => {
  let nft: NFT
  let auction: Auction

  if (AuctionNFT) {
    nft = AuctionNFT.nft
    auction = AuctionNFT.auction
  } else {
    nft = await getNFT(nftId)
    auction = await getAuction(auctionId)
  }

  const owner = nft.owner ? await getUser(nft.owner) : null
  const issuer = nft.issuer ? await getUser(nft.issuer) : null
  const ownerdetails = owner?.details || 'No details'
  const ownername = owner?.name || 'No name'
  const issuername = issuer?.name || 'No name'
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
  auctionId: string
  buyer: string
  soldPrice: number
}

export const buyNFT = async ({ nftId, auctionId, buyer, soldPrice }: BuyNFT) => {
  const nftChange = {
    id: nftId,
    owner: buyer
  }
  const auctionChange = {
    id: auctionId,
    expireTimestamp: Date.now(),
    buyer: buyer,
    isForSale: false,
    isForBid: false,
    purchaseTime: new Date(),
    soldPrice,
    status: 'closed'
  }
  const nftEdited = await editNFT(nftChange)
  const auctionEdited = await editAuction(auctionChange)
  const status = checkSuccess({ nftEdited, auctionEdited })
  return { status, nftEdited, auctionEdited }
}

interface PlaceBid {
  auctionId: string
  bid: Bid
}

export const placeBid = async ({ auctionId, bid }: PlaceBid) => {
  const bidAdded = await addBid(bid)
  const bidAddedToAuction = await addBidToAuction(auctionId, bid.id)
  const status = checkSuccess({ bidAdded, bidAddedToAuction })
  return { status, bidAdded, bidAddedToAuction }
}

export const delistAuction = async (id: string) => {
  const editedAuction = await editAuction({ id, status: 'closed' })
  const status = checkSuccess({ editedAuction })
  return { status, editedAuction }
}
