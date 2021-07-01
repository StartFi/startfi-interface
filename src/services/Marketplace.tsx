import { Bid } from './models/Bid'
import { NFT } from './models/NFT'
import { addBidToAuction, editAuction, getAuction, getAuctions } from './database/Auction'
import { getUser } from './database/User'
import { addNFT, editNFT, getNFT, getNFTs } from './database/NFT'
import { addBid } from './database/Bid'
import { AuctionNFT } from './models/AuctionNFT'
import { checkSuccess, sortHelper } from 'utils'
import { Auction } from './models/Auction'
import { DEFAULTSORT } from './../constants'

export const mintNFT = async (nft: NFT) => {
  //get from blockchain or compute
  const hash = ''
  nft.id = 0
  nft.txtHash = hash
  const nftAdded = await addNFT(nft)
  const status = checkSuccess({ nftAdded })
  return { status, nftAdded, hash }
}

export interface NFTQUERY {
  search?: string
  category?: string
  sort?: string
  name?: string
}

export const getMarketplace = async (query?: NFTQUERY) => {
  const t0 = performance.now()
  if (!query) query = {}
  const { search, category, sort } = query
  const nftsQuery: NFTQUERY = {}
  if (search) nftsQuery.name = search
  if (category && category !== 'all') nftsQuery.category = category
  const auctionSort = sort ? sort : DEFAULTSORT
  const nfts = await getNFTs(nftsQuery)
  const auctions = await getAuctions({ status: 'open' }, sortHelper(auctionSort))
  const onMarket: AuctionNFT[] = []
  auctions.forEach((auction: Auction) => {
    const nft = nfts.filter((nft: NFT) => nft.id === auction.nft)[0]
    if (nft)
      onMarket.push({
        nft,
        auction,
        ownername: '',
        issuername: '',
        ownerdetails: ''
      })
  })
  const t1 = performance.now()
  const loadtime = Math.round(t1 - t0)
  return { onMarket, loadtime, ...query }
}

interface GetAuctionNFT {
  nftId: number
  auctionId: string
  AuctionNFT?: AuctionNFT
}

export const getAuctionNFT = async ({ nftId, auctionId, AuctionNFT }: GetAuctionNFT) => {
  var nft: NFT
  var auction: Auction
  if (AuctionNFT) {
    nft = AuctionNFT.nft
    auction = AuctionNFT.auction
  } else {
    nft = await getNFT(nftId)
    auction = await getAuction(auctionId)
  }
  const owner = await getUser(nft.owner)
  const issuer = await getUser(nft.issuer)
  const ownerdetails = owner.details || 'No details'
  const ownername = owner.name || 'No name'
  const issuername = issuer.name || 'No name'
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
  owner: string
  buyer: string
  soldPrice: number
}

export const buyNFT = async ({ nftId, auctionId, owner, buyer, soldPrice }: BuyNFT) => {
  //get from blockchain
  const hash = ''
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
    purchaseTxt: hash,
    soldPrice,
    status: 'closed'
  }
  const nftEdited = await editNFT(nftChange)
  const auctionEdited = await editAuction(auctionChange)
  const status = checkSuccess({ nftEdited, auctionEdited })
  return { status, nftEdited, auctionEdited, hash }
}

interface PlaceBid {
  auctionId: string
  bid: Bid
}

export const placeBid = async ({ auctionId, bid }: PlaceBid) => {
  //to get from blockchain or compute
  const hash = ''
  bid.id = '0'
  bid.expireTimestamp = 0
  bid.txtHash = hash
  const bidAdded = await addBid(bid)
  const bidAddedToAuction = await addBidToAuction(auctionId, bid.id)
  const status = checkSuccess({ bidAdded, bidAddedToAuction })
  return { status, bidAdded, bidAddedToAuction, hash }
}
