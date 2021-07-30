import { Bid } from './models/Bid'
import { NFT } from './models/NFT'
import { addAuction, addBidToAuction, editAuction, getAuction, getAuctionsPaginated ,getAuctions } from './database/Auction'
import { getUser } from './database/User'
import { addNFT, editNFT, getNFT, getNFTs } from './database/NFT'
import { addBid } from './database/Bid'
import { AuctionNFT } from './models/AuctionNFT'
import { checkSuccess, sortHelper } from 'utils'
import { Auction } from './models/Auction'
import { DEFAULT_CHAIN_ID, DEFAULT_SORT, NFTS_PER_PAGE } from './../constants'


let generateId =
  Date.now().toString(36) +
  Math.random()
    .toString(36)
    .substr(2)

export const mintNFT = async (nft: NFT) => {
  const hash = ''

  nft.id =  generateId;
  nft.txtHash = hash
  const nftAdded = await addNFT(nft)
  const status = checkSuccess({ nftAdded })
  return { status, nftAdded, hash }
}

export const AddToMarketplace = async (auction: Auction) => {
  const hash = ''
  auction.id = generateId
  auction.listingTxt = hash
  const auctionAdded = await addAuction(auction)
  const status = checkSuccess({ auctionAdded })
  return { status, auctionAdded, hash }
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
  var chainId
  if (!query.chainId) chainId = DEFAULT_CHAIN_ID
  else chainId = query.chainId
  const nftsQuery: NFTQUERY = {chainId}
  if (search) nftsQuery.name = search
  if (category && category !== 'all') nftsQuery.category = category
  const auctionSort = sort ? sort : DEFAULT_SORT
  const nfts = await getNFTs(nftsQuery)
  const auctions = await getAuctionsPaginated({ status: 'open', chainId }, sortHelper(auctionSort), lastAuction)
  var onMarket: AuctionNFT[] = []
  auctions.forEach((rawAuction: any) => {
    const auction = rawAuction.data()
    const nft = nfts.filter((nft: NFT) => nft.id === auction.nft)[0]
    
    if (nft){
    if(nft.issueDate) delete nft.issueDate;
    if(auction.purchaseTime) delete auction.purchaseTime;

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
  var newLastAuction = null
  auctions.forEach((a: any) => {
    if (a.data().id === id) newLastAuction = a
  })
  const t1 = performance.now()
  const loadtime = Math.round(t1 - t0)
  return { onMarket, loadtime, newLastAuction, auctions, ...query }
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
  const hash = ''
  bid.id = generateId
  bid.txtHash = hash
  const bidAdded = await addBid(bid)
  const bidAddedToAuction = await addBidToAuction(auctionId, bid.id)
  const status = checkSuccess({ bidAdded, bidAddedToAuction })
  return { status, bidAdded, bidAddedToAuction, hash }
}
