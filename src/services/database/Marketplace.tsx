// TODO : All the functionalities should be done via dispatched actions. Consider use https://github.com/prescottprue/redux-firestore
import { Bids } from './models/Bid'
import { NFT } from './models/NFT'
import {
  addListingToMarketplace,
  addBidToAuction,
  editListingInMarketplace,
  getListingInMarketplace,
  getMarketplaceListingsPaginated
} from './CRUD/MarketplaceListings'
import { getUser } from './CRUD/User'
import { addNFT, editNFT, getNFT, getNFTs } from './CRUD/NFT'
import { addBid, getBids } from './CRUD/Bid'
import { checkSuccess, sortHelper } from 'utils'
import { MarketplaceListings } from './models/MarketplaceListings'
import { DEFAULT_SORT, NFTS_PER_PAGE } from '../../constants'
import { PlaceBid } from '../../state/types/Bid'
export const mintNFT = async (nft: NFT) => {
  const nftAdded = await addNFT(nft)
  const status = checkSuccess({ nftAdded })
  return { status, nftAdded }
}

export const addToMarketplace = async (auction: MarketplaceListings) => {
  const auctionAdded = await addListingToMarketplace(auction)
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
  const auctions = await getMarketplaceListingsPaginated({ status: 'open' }, sortHelper(auctionSort), lastAuction)
  let onMarket: any[] = []
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

export const getAuctionNFT = async ({ nftId, auctionId, AuctionNFT }: any) => {
  let nft: NFT
  let auction: MarketplaceListings

  if (AuctionNFT) {
    nft = AuctionNFT.nft
    auction = AuctionNFT.auction
  } else {
    nft = await getNFT(nftId)
    auction = await getListingInMarketplace(auctionId)
  }

  const owner = nft.owner ? await getUser(nft.owner) : null
  const issuer = nft.issuer ? await getUser(nft.issuer) : null
  const ownerdetails = owner?.bio || 'No details'
  const ownername = owner?.name || 'No name'
  const issuername = issuer?.name || 'No name'
  const auctionNFT: any = {
    nft,
    auction,
    ownername,
    issuername,
    ownerdetails
  }
  return { auctionNFT }
}

export const buyNFT = async (item: MarketplaceListings) => {
  const nftChange = {
    id: item.nftTokenId,
    owner: item.buyer
  }

  const nftEdited = await editNFT(nftChange)
  const auctionEdited = await editListingInMarketplace(item)
  const status = checkSuccess({ nftEdited, auctionEdited })
  return { status, nftEdited, auctionEdited }
}

export const placeBid = async (bid: Bids) => {
  const bidAdded = await addBid(bid)
  const status = checkSuccess({ bidAdded })
  return { status, bidAdded }
}

// git bid array for an NFT
export const getNftBids = async (nft: string) => {
  const bids = await getBids({ nft })

  return { bids }
}

export const delistAuction = async (id: string) => {
  const editedAuction = await editListingInMarketplace({ id, status: 'closed' })
  const status = checkSuccess({ editedAuction })
  return { status, editedAuction }
}
