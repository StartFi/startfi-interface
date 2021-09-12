import { BigNumber } from '@ethersproject/bignumber'
import { Web3Provider } from '@ethersproject/providers'
import { useCallback } from 'react'
import { Contract } from '@ethersproject/contracts'

export const useSubmitTransaction = (): ((
  methodsName: string,
  args: Array<any> | undefined,
  contract: Contract | null,
  account: string | null,
  library: Web3Provider | undefined
) => void) => {
  return useCallback(
    async (
      methodsName: string,
      args: Array<string | number | BigNumber> | undefined,
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
