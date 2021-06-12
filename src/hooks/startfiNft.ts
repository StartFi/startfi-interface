import { useCallback } from 'react'
import { useSubmitTransaction } from 'services/blockchain/submitTransaction'
import { Contract } from '@ethersproject/contracts'

export const useMint = (): ((
  address: string,
  contract: Contract | null,
  account: string | null,
  library: any
) => void) => {
  const mint = useSubmitTransaction()
  return useCallback((address: string, contract: Contract | null, account: string | null, library: any) => {
    mint('mint', [address], contract, account, library)
  }, [])
}
