import { Token } from '@uniswap/sdk-core'

export enum ChainId {
  // MAINNET = 1,
  ROPSTEN = 3,
  // RINKEBY = 4,
  // GÖRLI = 5,
  // KOVAN = 42,
  StartFi = 1337
  // BSC = 56,
  // BSCT = 97,
  // POLYGON = 80001,
  // AURORA = 1313161555,
}

export declare const WETH: {
  [chainId in ChainId]: Token
}
