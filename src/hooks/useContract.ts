/* eslint-disable @typescript-eslint/camelcase */
import { Contract } from '@ethersproject/contracts'
import { Token, WETH9 } from '@uniswap/sdk-core'
import { useMemo } from 'react'

import { ChainId } from '../constants/supportedChains'

import {
  ARGENT_WALLET_DETECTOR_ABI,
  ARGENT_WALLET_DETECTOR_MAINNET_ADDRESS
} from '../constants/abis/argent-wallet-detector'
import ENS_PUBLIC_RESOLVER_ABI from '../constants/abis/ens-public-resolver.json'
import EIP_2612 from '../constants/abis/eip_2612.json'
import ERC20_BYTES32_ABI from '../constants/abis/erc20_bytes32.json'
import ENS_ABI from '../constants/abis/ens-registrar.json'
import { MULTICALL_ABI, MULTICALL_NETWORKS } from '../constants/multicall'
import { getContract } from '../utils'
import { useActiveWeb3React } from './index'
import WETH_ABI from '../constants/abis/weth.json'

import ERC20_ABI from '../constants/abis/erc20.json'
import ERC721_ABI from '../constants/abis/erc721.json'

import { networks as STARTFI_TOKEN_NETWORK, abi as STARTFI_TOKEN_ABI } from '../constants/abis/StartFiToken.json'

import { networks as STARTFI_NFT_NETWORK, abi as STARTFI_NFT_ABI } from '../constants/abis/StartfiNFT.json'
import {
  networks as STARTFI_MARKET_PLACE_NETWORK,
  abi as STARTFI_MARKET_PLACE_ABI
} from '../constants/abis/StartfiMarketPlace.json'

// returns null on errors
declare type WETH_Only = {
  [chainId in ChainId]: Token
}
const WETH: WETH_Only = {
  [ChainId.MAINNET]: WETH9[ChainId.MAINNET],
  [ChainId.ROPSTEN]: WETH9[ChainId.ROPSTEN],
  [ChainId.RINKEBY]: WETH9[ChainId.RINKEBY],
  [ChainId.GÖRLI]: WETH9[ChainId.GÖRLI],
  [ChainId.BSCT]: new Token(ChainId.BSCT, '0x793b6B742e1206C5D3DFAF2Efd85D3919dba60eB', 18, 'ETH', 'Ethereum Token'),
  [ChainId.BSC]: new Token(
    ChainId.BSC,
    '0x2170Ed0880ac9A755fd29B2688956BD959F933F8',
    18,
    'ETH',
    'Binance-Peg Ethereum'
  ),
  [ChainId.StartFi]: new Token(
    ChainId.BSC,
    '0x2170Ed0880ac9A755fd29B2688956BD959F933F8',
    18,
    'ETH',
    'Binance-Peg Ethereum'
  ),
  [ChainId.KOVAN]: WETH9[ChainId.KOVAN]
}
function useContract(address: string | undefined, ABI: any, withSignerIfPossible = true): Contract | null {
  const { library, account } = useActiveWeb3React()

  return useMemo(() => {
    if (!address || !ABI || !library) return null
    try {
      return getContract(address, ABI, library, withSignerIfPossible && account ? account : undefined)
    } catch (error) {
      console.error('Failed to get contract', error)
      return null
    }
  }, [address, ABI, library, withSignerIfPossible, account])
}

async function useContractWithLibrary(
  address: string | undefined,
  ABI: any,
  withSignerIfPossible = true,
  library: any,
  account: any
): Promise<any> {
  if (!address || !ABI || !library) return null
  try {
    return await getContract(address, ABI, library, withSignerIfPossible && account ? account : undefined)
  } catch (error) {
    console.error('Failed to get contract', error)
    return null
  }
}

// left as a reference to follow when consuming startfi contract
export function useWETHContract(withSignerIfPossible?: boolean): Contract | null {
  const { chainId } = useActiveWeb3React()
  console.log(chainId, WETH, 'chainId')

  return useContract(chainId ? WETH[chainId].address : undefined, WETH_ABI, withSignerIfPossible)
}
export const useERC721 = (address: string | undefined, withSignerIfPossible?: boolean): Contract | null => {
  return useContract(address, ERC721_ABI, withSignerIfPossible)
}
export function useArgentWalletDetectorContract(): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useContract(
    chainId === ChainId.MAINNET ? ARGENT_WALLET_DETECTOR_MAINNET_ADDRESS : undefined,
    ARGENT_WALLET_DETECTOR_ABI,
    false
  )
}

export function useENSRegistrarContract(withSignerIfPossible?: boolean): Contract | null {
  const { chainId } = useActiveWeb3React()
  let address: string | undefined
  if (chainId) {
    switch (chainId) {
      case ChainId.MAINNET:
      case ChainId.GÖRLI:
      case ChainId.ROPSTEN:
      case ChainId.RINKEBY:
        address = '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e'
        break
    }
  }
  return useContract(address, ENS_ABI, withSignerIfPossible)
}

export function useENSResolverContract(address: string | undefined, withSignerIfPossible?: boolean): Contract | null {
  return useContract(address, ENS_PUBLIC_RESOLVER_ABI, withSignerIfPossible)
}

export function useBytes32TokenContract(tokenAddress?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract(tokenAddress, ERC20_BYTES32_ABI, withSignerIfPossible)
}

export function useEIP2612Contract(tokenAddress?: string): Contract | null {
  return useContract(tokenAddress, EIP_2612, false)
}
export function useTokenContract(tokenAddress?: string, withSignerIfPossible?: boolean) {
  return useContract(tokenAddress, ERC20_ABI, withSignerIfPossible)
}

export function useMulticallContract(): Contract | null {
  const { chainId } = useActiveWeb3React()

  return useContract(chainId && MULTICALL_NETWORKS[chainId], MULTICALL_ABI, false)
}

export const useStartFiToken = (withSignerIfPossible?: boolean): Contract | null => {
  return useContract(STARTFI_TOKEN_NETWORK[3].address, STARTFI_TOKEN_ABI, withSignerIfPossible)
}

export async const useStartFiNft = (account: any, library: any, withSignerIfPossible?: boolean): Promise<any>=> {
  /*   const { chainId } = useActiveWeb3React()
  const networkId = chainId ? chainId : '3'
  console.log('network id', networkId) */
  return await useContractWithLibrary(
    STARTFI_NFT_NETWORK['3'].address,
    STARTFI_NFT_ABI,
    withSignerIfPossible,
    account,
    library
  )
}

export const useStartFiMarketPlace = (withSignerIfPossible?: boolean): Contract | null => {
  return useContract(STARTFI_MARKET_PLACE_NETWORK[3].address, STARTFI_MARKET_PLACE_ABI, withSignerIfPossible)
}
