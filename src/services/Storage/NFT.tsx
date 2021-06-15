import { add } from 'services/firebase/Firebase'
import { getNfts } from '../firebase/firebaseStore'
import { NFT } from 'state/nfts/reducer'

export const array = [
  {
    id: 0,
    name: 'Apple Watch Series 4 GPS',
    owner: 'on1',
    issueDate: Date.now(),
    onAuction: false,
    price: 16,
    category: 'Music',
    image: 'https://picsum.photos/200',
    description: 'Redesigned from scratch and completely revised'
  },
  {
    id: 1,
    name: 'Apple Watch Series 4 GPS',
    owner: 'on1',
    issueDate: Date.now(),
    price: 16,
    onAuction: false,
    category: 'Music',
    image: 'https://picsum.photos/200',
    description: 'Redesigned from scratch and completely revised'
  },
  {
    id: 2,
    name: 'Apple Watch Series 4 GPS',
    owner: 'on1',
    issueDate: Date.now(),
    onAuction: true,
    price: 16,
    category: 'Music',
    image: 'https://picsum.photos/200',
    description: 'Redesigned from scratch and completely revised'
  },
  {
    id: 3,
    name: 'Apple Watch Series 4 GPSa',
    owner: 'on1',
    issueDate: Date.now(),
    onAuction: false,
    price: 16,
    category: 'Music',
    image: 'https://picsum.photos/200',
    description: 'Redesigned from scratch and completely revised'
  },
  {
    id: 4,
    name: 'Apple Watch Series 4 GPS',
    owner: 'on1',
    issueDate: Date.now(),
    onAuction: false,
    price: 16,
    category: 'Music',
    image: 'https://picsum.photos/200',
    description: 'Redesigned from scratch and completely revised'
  },
  {
    id: 5,
    name: 'Apple Watch Series 4 GPS',
    owner: 'on1',
    issueDate: Date.now(),
    onAuction: true,
    price: 16,
    category: 'Music',
    image: 'https://picsum.photos/200',
    description: 'Redesigned from scratch and completely revised'
  },
  {
    id: 6,
    name: 'Apple Watch Series 4 GPS',
    owner: 'on1',
    issueDate: Date.now(),
    onAuction: true,
    price: 16,
    category: 'Music',
    image: 'https://picsum.photos/200',
    description: 'Redesigned from scratch and completely revised'
  }
]

export type NFTQUERY = {
  search?: string
  category?: string
  sort?: string
}

export const getAll = async (query?: NFTQUERY) => {
  const t0 = performance.now()
  // await new Promise(resolve => setTimeout(resolve, 1000))

  let q = query || {}

  let nfts = await getNfts(q)
  const t1 = performance.now()
  return { nfts, loadtime: Math.round(t1 - t0), ...query }
}

export const mint = async (nft: NFT) => {
  nft.id = 7
  const data = await add('nfts', nft.id, nft)
  return { data }
}
