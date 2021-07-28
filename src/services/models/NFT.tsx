import { Dictionary } from '../../constants'

export interface NFT extends Dictionary {
  id: number
  // uuid: string,

  

  dataHash: string
  name: string
  description: string
  category: string
  owner: string
  txtHash: string
  issuer: string
  issueDate: any
  tags?: string[]
  royalty: number
  tokenId?: string
}
