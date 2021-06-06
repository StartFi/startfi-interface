import { useCallback } from 'react'
import { useSubmitTransaction } from 'services/blockchain/submitTransaction'

export const useMint = (): ((address: string, contract: any, account: any, library: any) => void) => {
  const mint = useSubmitTransaction()
  return useCallback((address: string, contract: any, account: any, library: any) => {
    mint('mint', [address], contract, account, library)
  }, [])
}
