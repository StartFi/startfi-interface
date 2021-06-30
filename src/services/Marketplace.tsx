import { Bid } from './models/Bid'
import { NFT } from './models/NFT'
import { addBidToAuction, editAuction, getAuction, getOpenAuctions } from './database/Auction'
import { getUser } from './database/User'
import { addNFT, editNFT, getNFT } from './database/NFT'
import { addBid } from './database/Bid'
import { AuctionNFT } from './models/AuctionNFT'
import { checkSuccess, sortMarketplace } from 'utils'
import { Auction } from './models/Auction'

export const mintNFT = async (nft: NFT) => {
  //get from blockchain or compute
  const hash = ''
  nft.id = 0
  nft.txtHash = hash
  const nftAdded = await addNFT(nft)
  const status = checkSuccess({ nftAdded })
  return { status, nftAdded, hash }
}

export type NFTQUERY = {
  search?: string
  category?: string
  sort?: string
}

export const getMarketplace = async (query?: NFTQUERY) => {
  const t0 = performance.now()
  const auctions = await getOpenAuctions()
  const nfts = await Promise.all(auctions.map(auction => getNFT(auction.nft)))
  var onMarket: AuctionNFT[] = []
  auctions.forEach(auction =>
    onMarket.push({
      nft: nfts.filter((nft: NFT) => nft.id === auction.nft)[0],
      auction,
      ownername: '',
      issuername: '',
      ownerdetails: ''
    })
  )
  if (query) {
    const { search, category, sort } = query
    if (category && category !== 'all') onMarket = onMarket.filter(auctionNFT => auctionNFT.nft.category === category)
    if (search) onMarket = onMarket.filter(auctionNFT => auctionNFT.nft.name.includes(search))
    if (sort) onMarket = sortMarketplace(onMarket, sort)
  }
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
