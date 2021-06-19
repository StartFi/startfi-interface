import { useCallback } from 'react'
import { useSubmitTransaction } from 'services/Blockchain/submitTransaction'
import { Contract } from '@ethersproject/contracts'
import { useWalletModalToggle } from 'state/application/hooks'

export const useMint = (): ((
  address: string,
  ipfsHash: string,
  contract: Contract | null,
  account: string | null,
  library: any,
  withRoyality: boolean,
  share?: string,
  base?: string
) => void) => {
  const mint = useSubmitTransaction()
  const toggleWalletModal = useWalletModalToggle()
  return useCallback(
    (
      address: string,
      ipfsHash: string,
      contract: Contract | null,
      account: string | null,
      library: any,
      withRoyality: boolean,
      share?: string,
      base?: string
    ) => {
      if (!account) {
        toggleWalletModal()
        return
      }
      withRoyality
        ? mint('mint', [address, ipfsHash], contract, account, library)
        : mint('mint', [address, ipfsHash, share as string, base as string], contract, account, library)
    },
    [mint]
  )
}
