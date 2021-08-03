import { Dictionary } from '../../constants'

export interface NFT extends Dictionary {
  // id: string it should be string but get error becauseof current data
  id: any
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
