import { useCallback } from 'react'
import { useSubmitTransaction } from 'services/Blockchain/submitTransaction'
import { useWalletModalToggle } from 'state/application/hooks'
import { evaluateTransaction } from 'services/Blockchain/useEvaluateTransaction'
import { useActiveWeb3React } from 'hooks'
import { useStartFiRoyality } from './useContract'

export const useNftInfo = () => {
  const contract = useStartFiRoyality(false)
  return useCallback(() => {
    const getInfo = async () => {
      const name = await evaluateTransaction(contract, 'name', [])
      const symbol = await evaluateTransaction(contract, 'symbol', [])
      return {
        name,
        symbol
      }
    }
    return getInfo()
  }, [contract])
}

export const useMint = (): ((
  address: string,
  ipfsHash: string,
  withRoyality: boolean,
  share?: string,
  base?: string
) => any) => {
  const { account, library } = useActiveWeb3React()
  const contract = useStartFiRoyality(true)
  const mint = useSubmitTransaction()
  const toggleWalletModal = useWalletModalToggle()
  return useCallback(
    (address: string, ipfsHash: string, withRoyality: boolean, share?: string, base?: string) => {
      if (!account) {
        toggleWalletModal()
        return
      }
      if (withRoyality) {
        return mint('mintWithRoyalty', [address, ipfsHash, share as string, base as string], contract, account, library)
      } else {
        return mint('mint', [address, ipfsHash], contract, account, library)
      }
    },
    [mint]
  )
}

export const useGetTokenURI = (): ((tokenId: string) => any) => {
  const contract = useStartFiRoyality(false)
  return useCallback(
    (tokenId: string) => {
      const getUri = async () => {
        const uri = await evaluateTransaction(contract, 'tokenURI', [tokenId])
        return uri
      }
      return getUri()
    },
    [contract]
  )
}

export const useGetNftOwner = (): ((tokenId: string) => any) => {
  const contract = useStartFiRoyality(false)
  return useCallback(
    (tokenId: string) => {
      const getUri = async () => {
        const uri = await evaluateTransaction(contract, 'ownerOf', [tokenId])
        return uri
      }
      return getUri()
    },
    [contract]
  )
}

export const useNftBalance = (): ((address: string) => any) => {
  const contract = useStartFiRoyality(false)
  return useCallback(
    (address: string) => {
      const getBalance = async () => {
        const balance = await evaluateTransaction(contract, 'balanceOf', [address])
        return balance
      }
      return getBalance()
    },
    [contract]
  )
}

export const useGetApproverAddress = (): ((tokenId: string) => any) => {
  const contract = useStartFiRoyality(false)
  return useCallback(
    (tokenId: string) => {
      const getAddress = async () => {
        const address = await evaluateTransaction(contract, 'getApproved', [tokenId])
        return address
      }
      return getAddress()
    },
    [contract]
  )
}
