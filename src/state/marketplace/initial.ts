import { MarketplaceListings } from 'state/types/MarketplaceListings'
import { NFT } from 'state/types/NFT'
import { address as STARTFI_NFT_ADDRESS } from '../../constants/abis/StartfiRoyaltyNFT.json'

export const initialNFT: NFT = {
  tokenId: 0,
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

export const initialAuction: MarketplaceListings = {
  id: 'string',
  nFTContractAddress: STARTFI_NFT_ADDRESS,
  nftTokenId: '0',
  listingPrice: 0,
  seller: '',
  expireTimestamp: 0,
  isSellForEnabled: false,
  isBedEnabled: false,
  bids: [],
  listTime: new Date(),
  listingTxt: '',
  status: 'open',
  minBid: 0,
  insuranceAmount: 0,
  chainId: 0,
  requiredStakes: 0
}
