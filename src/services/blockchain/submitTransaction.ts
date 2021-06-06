import { useCallback } from 'react'

export const useSubmitTransaction = (): ((
  methodsName: string,
  args: Array<string> | undefined,
  contract: any,
  account: any,
  library: any
) => void) => {
  return useCallback(
    (methodsName: string, args: Array<string> | undefined, contract: any, account: any, library: any) => {
      const callData = contract?.interface.encodeFunctionData(methodsName, args)
      return library?.getSigner().sendTransaction({
        from: account ? account : undefined,
        to: contract?.address,
        data: callData
      })
    },
    []
  )
}
