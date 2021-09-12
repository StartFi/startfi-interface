import { Web3Provider } from '@ethersproject/providers'
import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { WalletLinkConnector } from '@web3-react/walletlink-connector'
import { PortisConnector } from '@web3-react/portis-connector'
import getLibrary from '../utils/getLibrary'

import { FortmaticConnector } from './Fortmatic'
import { NetworkConnector } from './NetworkConnector'
import UNISWAP_LOGO_URL from '../assets/svg/logo.svg'

const INFURA_KEY = process.env.REACT_APP_INFURA_KEY || '4bf032f2d38a4ed6bb975b80d6340847'
const FORMATIC_KEY = process.env.REACT_APP_FORTMATIC_KEY
const PORTIS_ID = process.env.REACT_APP_PORTIS_ID
const WALLETCONNECT_BRIDGE_URL = process.env.REACT_APP_WALLETCONNECT_BRIDGE_URL

if (typeof INFURA_KEY === 'undefined') {
  throw new Error(`REACT_APP_INFURA_KEY must be a defined environment variable`)
}

const NETWORK_URLS: {
  [chainId: number]: string
} = {
  // [1]: `https://mainnet.infura.io/v3/${INFURA_KEY}`,
  // [4]: `https://rinkeby.infura.io/v3/${INFURA_KEY}`,
  [3]: `https://ropsten.infura.io/v3/${INFURA_KEY}`,
  // [5]: `https://goerli.infura.io/v3/${INFURA_KEY}`,
  // [42]: `https://kovan.infura.io/v3/${INFURA_KEY}`,
  // [56]: `https://bsc-dataseed.binance.org/`,
  // [97]: `https://data-seed-prebsc-1-s1.binance.org:8545/`,
  [1337]: `http://127.0.0.1:8545/`
}

const SUPPORTED_CHAIN_IDS = [/*1, 4, */ 3 /*, 42, 5, 56, 97*/, 1337]

export const network = new NetworkConnector({
  urls: NETWORK_URLS,
  defaultChainId: 3 //1
})

let networkLibrary: Web3Provider | undefined
export function getNetworkLibrary(): Web3Provider {
  return (networkLibrary = networkLibrary ?? getLibrary(network.provider))
}

export const injected = new InjectedConnector({
  supportedChainIds: SUPPORTED_CHAIN_IDS
})

export const walletconnect = new WalletConnectConnector({
  supportedChainIds: SUPPORTED_CHAIN_IDS,
  infuraId: INFURA_KEY, // obviously a hack
  bridge: WALLETCONNECT_BRIDGE_URL,
  qrcode: true,
  pollingInterval: 15000
})

// mainnet only
export const fortmatic = new FortmaticConnector({
  apiKey: FORMATIC_KEY ?? '',
  chainId: 1
})

// mainnet only
export const portis = new PortisConnector({
  dAppId: PORTIS_ID ?? '',
  networks: [1]
})

// mainnet only
export const walletlink = new WalletLinkConnector({
  url: NETWORK_URLS[1],
  appName: 'StartFi',
  appLogoUrl: UNISWAP_LOGO_URL
})
