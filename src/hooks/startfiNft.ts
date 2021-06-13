import { useCallback } from 'react'
import { useSubmitTransaction } from 'services/Blockchain/submitTransaction'
import { Contract } from '@ethersproject/contracts'

export const useMint = (): ((
  address: string,
  ipfsHash: string,
  contract: Contract | null,
  account: string | null,
  library: any,
  withLoyality: boolean,
  share?: string,
  base?: string
) => void) => {
  const mint = useSubmitTransaction()
  return useCallback(
    (
      address: string,
      ipfsHash: string,
      contract: Contract | null,
      account: string | null,
      library: any,
      withLoyality: boolean,
      share?: string,
      base?: string
    ) => {
      withLoyality
        ? mint('mint', [address, ipfsHash], contract, account, library)
        : mint('mint', [address, ipfsHash, share as string, base as string], contract, account, library)
    },
    []
  )
}
