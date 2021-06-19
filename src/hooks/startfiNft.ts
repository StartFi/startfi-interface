import { useCallback } from 'react'
import { useSubmitTransaction } from 'services/Blockchain/submitTransaction'
import { useWalletModalToggle } from 'state/application/hooks'
import { useStartFiContract } from 'services/Blockchain/useStartfiContracts'
import { evaluateTransaction } from 'services/Blockchain/useEvaluateTransaction'

export const useMint = (): ((
  address: string,
  ipfsHash: string,
  withRoyality: boolean,
  share?: string,
  base?: string
) => void) => {
  const mint = useSubmitTransaction()
  const { account, library, contract } = useStartFiContract('nftRoyality')
  const toggleWalletModal = useWalletModalToggle()
  return useCallback(
    (address: string, ipfsHash: string, withRoyality: boolean, share?: string, base?: string) => {
      if (!account) {
        toggleWalletModal()
        return
      }
      withRoyality
        ? mint('mintWithRoyalty', [address, ipfsHash, share as string, base as string], contract, account, library)
        : mint('mint', [address, ipfsHash], contract, account, library)
    },
    [mint]
  )
}

export const useNftInfo = () => {
  const { contract } = useStartFiContract('nftRoyality', false)
  return useCallback(() => {
    const getInfo = async () => {
      const name = await evaluateTransaction(contract, 'name', [])
      const symbol = await evaluateTransaction(contract, 'symbol', [])

      console.log('contract', contract)
      return {
        name,
        symbol
      }
    }
    return getInfo()
  }, [contract])
}
