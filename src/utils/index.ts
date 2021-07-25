import JSBI from 'jsbi'
import { Contract } from '@ethersproject/contracts'
import { getAddress } from '@ethersproject/address'
import { AddressZero } from '@ethersproject/constants'
import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers'
import { BigNumber } from '@ethersproject/bignumber'
import { abi as IUniswapV2Router02ABI } from '@uniswap/v2-periphery/build/IUniswapV2Router02.json'
import { ROUTER_ADDRESS } from '../constants'
import { Percent } from '@uniswap/sdk-core'
import { ChainId } from '../constants/supportedChains'
import { AuctionNFT } from 'services/models/AuctionNFT'

export const sortMarketplaceHelper = (sort: string) => {
  switch (sort) {
    case 'Highest price':
      return { parentKey: 'auction', childKey: 'listingPrice', desc: true }
    case 'Lowest price':
      return { parentKey: 'auction', childKey: 'listingPrice', desc: false }
    default:
      return { parentKey: 'auction', childKey: 'listingPrice', desc: false }
  }
}

export const sortHelper = (sort: string) => {
  switch (sort.toLocaleLowerCase()) {
    case 'lowest price':
      return { listingPrice: 'asc' }
    case 'highest price':
      return { listingPrice: 'desc' }
    default:
      return { listingPrice: 'asc' }
  }
}

export const sortMarketplace = (array: AuctionNFT[], sort: string): AuctionNFT[] => {
  const { parentKey, childKey, desc } = sortMarketplaceHelper(sort)
  const sorted = array.sort((a: any, b: any) => {
    const x = a[parentKey][childKey]
    const y = b[parentKey][childKey]
    return x < y ? -1 : x > y ? 1 : 0
  })
  if (desc) return sorted.reverse()
  else return sorted
}

export const isSuccess = (input: string) => input === 'success'

export const checkSuccess = (object: any) =>
  Object.keys(object).filter(key => !isSuccess(object[key])).length === 0 ? 'success' : 'failure'

// returns the checksummed address if the address is valid, otherwise returns false
export function isAddress(value: any): string | false {
  try {
    return getAddress(value)
  } catch {
    return false
  }
}

const ETHERSCAN_PREFIXES: { [chainId in ChainId]: string } = {
  1: '',
  3: 'ropsten.',
  4: 'rinkeby.',
  5: 'goerli.',
  56: 'goerli.',
  97: 'goerli.',
  1337: 'startfi.',
  42: 'kovan.'
}

export function getEtherscanLink(
  chainId: ChainId,
  data: string,
  type: 'transaction' | 'token' | 'address' | 'block'
): string {
  const prefix = `https://${ETHERSCAN_PREFIXES[chainId] || ETHERSCAN_PREFIXES[1]}etherscan.io`

  switch (type) {
    case 'transaction': {
      return `${prefix}/tx/${data}`
    }
    case 'token': {
      return `${prefix}/token/${data}`
    }
    case 'block': {
      return `${prefix}/block/${data}`
    }
    case 'address':
    default: {
      return `${prefix}/address/${data}`
    }
  }
}

// shorten the checksummed version of the input address to have 0x + 4 characters at start and end
export function shortenAddress(address: string, chars = 4): string {
  const parsed = isAddress(address)
  if (!parsed) {
    throw Error(`Invalid 'address' parameter '${address}'.`)
  }
  return `${parsed.substring(0, chars + 2)}...${parsed.substring(42 - chars)}`
}

// add 10%
export function calculateGasMargin(value: BigNumber): BigNumber {
  return value.mul(BigNumber.from(10000).add(BigNumber.from(1000))).div(BigNumber.from(10000))
}

// converts a basis points value to a sdk percent
export function basisPointsToPercent(num: number): Percent {
  return new Percent(JSBI.BigInt(num), JSBI.BigInt(10000))
}

// account is not optional
export function getSigner(library: Web3Provider, account: string): JsonRpcSigner {
  return library.getSigner(account).connectUnchecked()
}

// account is optional
export function getProviderOrSigner(library: Web3Provider, account?: string): Web3Provider | JsonRpcSigner {
  return account ? getSigner(library, account) : library
}

// account is optional
export function getContract(address: string, ABI: any, library: Web3Provider, account?: string): Contract {
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`)
  }

  return new Contract(address, ABI, getProviderOrSigner(library, account) as any)
}

// account is optional
export function getRouterContract(_: number, library: Web3Provider, account?: string): Contract {
  return getContract(ROUTER_ADDRESS, IUniswapV2Router02ABI, library, account)
}

export function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // $& means the whole matched string
}
