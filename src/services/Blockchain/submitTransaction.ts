import { useCallback } from 'react'
import { Contract } from '@ethersproject/contracts'

export const useSubmitTransaction = (): ((
  methodsName: string,
  args: Array<string> | undefined,
  contract: Contract | null,
  account: string | null,
  library: any
) => void) => {
  return useCallback(
    (
      methodsName: string,
      args: Array<string> | undefined,
      contract: Contract | null,
      account: string | null,
      library: any
    ) => {
      try {
        const callData = contract?.interface.encodeFunctionData(methodsName, args)
        return library?.getSigner().sendTransaction({
          from: account ? account : undefined,
          to: contract?.address,
          data: callData
        })
      } catch (e) {
        console.log(e)
      }
    },
    []
  )
}
