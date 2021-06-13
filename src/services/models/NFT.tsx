import { Dictionary } from '../../constants'

export interface NFT extends Dictionary {
  id: number
  image: string
  name: string
  description: string
  category: string
  owner: string
  onAuction: boolean
  txtHash: string
  issuer: string
  issueDate: Date
  tags?: []
  price?: number
  royalty: number
}
