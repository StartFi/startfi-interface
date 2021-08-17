import { Auction } from 'services/models/Auction'
import { NFT } from 'services/models/NFT'
import { address as STARTFI_NFT_ADDRESS } from '../../constants/abis/StartfiRoyaltyNFT.json'

export const initialNFT: NFT = {
  id: 0,
  category: '',
  dataHash: '',
  name: '',
  tags: [],
  description: '',
  owner: '',
  issuer: '',
  issueDate: new Date(),
  txtHash: '',
  royalty: 0,
  filename: '',
  chainId: 0
}

export const initialAuction: Auction = {
  id: 'string',
  contractAddress: STARTFI_NFT_ADDRESS,
  nft: '0',
  listingPrice: 0,
  seller: '',
  expireTimestamp: 0,
  isForSale: false,
  isForBid: false,
  bids: [],
  listTime: new Date(),
  listingTxt: '',
  status: 'open',
  minBid: 0,
  qualifyAmount: 0,
  chainId: 0,
  requiredStakes: 0
}
