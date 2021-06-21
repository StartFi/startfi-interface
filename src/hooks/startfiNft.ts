import { useCallback } from 'react'
import { EventType } from '@ethersproject/abstract-provider'
import { useSubmitTransaction } from 'services/Blockchain/submitTransaction'
import { useWalletModalToggle } from 'state/application/hooks'
import { evaluateTransaction } from 'services/Blockchain/useEvaluateTransaction'
import { useActiveWeb3React } from 'hooks'
import { useStartFiRoyality } from './useContract'

export const useNftInfo = () => {
  const contract = useStartFiRoyality(false)
  return useCallback(async () => {
    const name = await evaluateTransaction(contract, 'name', [])
    const symbol = await evaluateTransaction(contract, 'symbol', [])
    return {
      name,
      symbol
    }
  }, [contract])
}

export const useMint = (): ((address: string, ipfsHash: string, share?: string, base?: string) => any) => {
  const { account, library } = useActiveWeb3React()
  const contract = useStartFiRoyality(true)
  const mint = useSubmitTransaction()
  const toggleWalletModal = useWalletModalToggle()
  return useCallback(
    async (address: string, ipfsHash: string, share?: string, base?: string) => {
      if (!account || !address) {
        toggleWalletModal()
        return `account: ${account} is not connected`
      }
      try {
        if (share && base) {
          return await mint(
            'mintWithRoyalty',
            [address, ipfsHash, share as string, base as string],
            contract,
            account,
            library
          )
        } else {
          return await mint('mint', [address, ipfsHash], contract, account, library)
        }
      } catch (e) {
        console.log('error', e)
        return e
      }
    },
    [account, contract, library, mint, toggleWalletModal]
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

export const useAproveNft = (): ((address: string, tokenId: string) => any) => {
  const { account, library } = useActiveWeb3React()
  const contract = useStartFiRoyality(true)
  const approve = useSubmitTransaction()
  const toggleWalletModal = useWalletModalToggle()
  return useCallback(
    async (address: string, tokenId: string) => {
      if (!account) {
        toggleWalletModal()
        return `account: ${account} is not connected`
      }
      try {
        return await approve('approve', [address, tokenId], contract, account, library)
      } catch (e) {
        console.log('error', e)
        return e
      }
    },
    [account, contract, library, approve, toggleWalletModal]
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

export const useRoyaltyInfo = (): ((tokenId: string, value: string) => any) => {
  const contract = useStartFiRoyality(false)
  return useCallback(
    (tokenId: string, value: string) => {
      const getAddress = async () => {
        const address = await evaluateTransaction(contract, 'royaltyInfo', [tokenId, value])
        return address
      }
      return getAddress()
    },
    [contract]
  )
}

export const useTransferNFtLogs = () => {
  const { account, library } = useActiveWeb3React()
  const tokenContract = useStartFiRoyality(false)
  const fromMe = tokenContract?.filters?.Transfer(account)
  library?.on(fromMe as EventType, (from, to, amount, event) => {
    console.log('NFT lisining Transfer|sent', { from, to, amount, event })
  })
}
