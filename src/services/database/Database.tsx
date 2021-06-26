import firebase from 'firebase'
import { NFTQUERY } from 'services/Marketplace'
import { Auction } from 'services/models/Auction'
import { AuctionNFT } from 'services/models/AuctionNFT'
import { Bid } from 'services/models/Bid'
import { Draft } from 'services/models/Draft'
import { NFT } from 'services/models/NFT'
import { User } from 'services/models/User'
import { sortMarketplace } from 'utils'

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGEING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
}

firebase.initializeApp(config)

const DB = firebase.firestore()

export type Document = User | NFT | Auction | Bid | Draft

export const addDocument = async (collection: string, key: string | number, document: Document): Promise<string> => {
  if (!collection) return 'No entity provided'
  if (!key && key !== 0) return 'No key provided'
  if (!document) return 'No object provided'
  await DB.collection(collection)
    .doc(key.toString())
    .set(document)
  return 'success'
}

export const getDocument = async (collection: string, key: string | number): Promise<Document | undefined> => {
  return (await (
    await DB.collection(collection)
      .doc(key.toString())
      .get()
  ).data()) as Document
}

export const editDocument = async (collection: string, key: string | number, document: Document): Promise<string> => {
  if (!collection) return 'No entity provided'
  if (!key && key !== 0) return 'No key provided'
  if (!document) return 'No object provided'
  const oldDocument = await getDocument(collection, key)
  if (oldDocument) {
    const newDocument = { ...oldDocument, ...document }
    await addDocument(collection, key, newDocument)
    return 'success'
  }
  return 'No document'
}

export const getDocumentsByChild = async (collection: string, child: string, value: any): Promise<Document[]> => {
  const array = await DB.collection(collection)
    .where(child, '==', value)
    .get()
  return firestoreToArray(array)
}

export const getNFTs = async ({ search, category, sort }: NFTQUERY) => {
  var nftsQuery: any = DB.collection('nfts')
  if (search) nftsQuery = nftsQuery.where('name', '==', search)
  if (category && category !== 'all') nftsQuery = nftsQuery.where('category', '==', category)
  const nfts = firestoreToArray(await nftsQuery.get()) as NFT[]
  var auctionsQuery = await DB.collection('auctions')
    .where('status', '==', 'open')
  if (!sort) sort = 'Lowest price'
  // auctionsQuery = auctionsQuery.orderBy('listingPrice', sort === 'Lowest price' ? 'asc' : 'desc')
  const auctions = firestoreToArray(await auctionsQuery.get()) as Auction[]
  console.log(nfts)
  console.log(auctions)
  const onMarket: AuctionNFT[] = []
  nfts.forEach((nft: NFT) => {
    const auction = auctions.filter((auction: Auction) => nft.id === auction.nft)[0]
    if (auction)
      onMarket.push({
        nft,
        auction,
        ownername: '',
        issuername: '',
        ownerdetails: ''
      })
  })
  console.log(onMarket)
  const sorted = sortMarketplace(onMarket, sort)
  console.log(sorted)
  return sorted
}

const firestoreToArray = (
  firebaseObject: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>
): Document[] => {
  const result: Document[] = []
  firebaseObject.forEach(doc => result.push(doc.data() as Document))
  return result
}

getNFTs({ search: '', category: '', sort: '' })
