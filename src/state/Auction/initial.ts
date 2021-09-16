export interface NftInterface {
  id: string
  name: string
  category: string
  tags: string[]
  owner: string
  issueDate: Date
  filename: string // ifps hash
}
export interface NftsById {
  id: string
  nft: NftInterface | {}
}
export const initialState: NftsById = {
  id: 'no nft yet',
  nft: {}
}
