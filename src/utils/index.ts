import JSBI from 'jsbi'
import { Contract } from '@ethersproject/contracts'
import { getAddress } from '@ethersproject/address'
import { AddressZero } from '@ethersproject/constants'
import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers'
import { BigNumber } from '@ethersproject/bignumber'
import { abi as IUniswapV2Router02ABI } from '@uniswap/v2-periphery/build/IUniswapV2Router02.json'
import { Dictionary, ROUTER_ADDRESS } from '../constants'
import { Percent } from '@uniswap/sdk-core'
import { ChainId } from '../constants/supportedChains'

export const sortHelper = (sort: string): Dictionary => {
  switch (sort.toLocaleLowerCase()) {
    case 'lowest price':
      return { listingPrice: 'asc' }
    case 'highest price':
      return { listingPrice: 'desc' }
    default:
      return { listingPrice: 'asc' }
  }
}

export const openFor = (timestamp: number): string => {
  const date = new Date(timestamp)
  const now = new Date()
  const daydiff = Math.round((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
  let years = date.getFullYear() - now.getFullYear()
  let months = date.getMonth() - now.getMonth()
  let days = date.getDate() - now.getDate()
  let string = ''
  if (days < 0) {
    if (daydiff < 0) return '0 days'
    else {
      days = daydiff
      months = months - 1
    }
  }
  if (months < 0) {
    months = Math.round(daydiff / 30)
    years = years - 1
  }
  if (days) string += days + ' days '
  if (months) string += months + ' months '
  if (years) string += years + ' years '
  return string
}

export const isSuccess = (input: string): boolean => input === 'success'

export const checkSuccess = (object: any): string =>
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
  // 1: '',
  3: 'ropsten.',
  // 4: 'rinkeby.',
  // 5: 'goerli.',
  // 42: 'kovan.',
  // 56: 'BSC.',
  // 97: 'BSCT.',
  1337: 'StartFi.'
  // 80001: 'poygon',
  // 1313161555: 'AURORA.'
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
