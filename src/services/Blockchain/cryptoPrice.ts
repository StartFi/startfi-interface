import { useCallback } from 'react'
import { ETH_USD_PRICE_URL, ETH_DAI_PRICE_URL, STFI_USD_PRICE_URL } from '../../constants'
import { ethers } from 'ethers'

export const useEthPrice = (): (() => Promise<number>) => {
  return useCallback(async () => {
    try {
      const result = await fetch(ETH_USD_PRICE_URL)
      const value = await result.json()

      return value.ethereum.usd
    } catch (e) {
      console.log(e)
    }
  }, [])
}

export const useUSDPrice = (): (() => Promise<number>) => {
  return useCallback(async () => {
    try {
      const result = await fetch(ETH_DAI_PRICE_URL)
      const value = await result.json()

      return value.dai.eth
    } catch (e) {
      console.log(e)
    }
  }, [])
}
// TODO: useMemo hook and fix the issue here
export const convertToWie = (amount: number | string) => () => {
  //the value of the unit Ether
  const etherString = amount //"4.2"

  //convert units ether in units wei (return value BigNumber)
  const wei = ethers.utils.parseEther(etherString as string)

  //convert wei a decimal string
  const weiString = wei.toString()
  return weiString
}

export const useStfiUsdPrice = (): (() => Promise<number>) => {
  return useCallback(async () => {
    try {
      const result = await fetch(STFI_USD_PRICE_URL)
      const value = await result.json()

      return value.startfi.usd
    } catch (e) {
      console.log(e)
    }
  }, [])
}
