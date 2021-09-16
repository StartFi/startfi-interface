export interface NFT {
  // id: string it should be string but get error becauseof current data
  tokenId: any
  dataHash: string
  name: string
  description: string
  category: string
  owner: string
  txtHash: string
  issuer: string
  issueDate: any
  filename: string
  tags?: string[]
  royalty: number
  chainId: number
}
