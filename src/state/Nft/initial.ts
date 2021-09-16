export enum NftStatus {
  NftDraft,
  MyNft,
  OnMarketplace
}
export interface NftInterface {
  id: string
  name: string
  category: string
  tags: string[]
  owner: string
  issueDate: Date
  fileHash: string // ipfs hash ex: hash/{filename}.{extension}
  nftStatus: NftStatus
}
export interface NftsById {
  id: string
  nft: NftInterface | {}
}
export const initialState: NftsById = {
  id: 'no nft yet',
  nft: {}
}
