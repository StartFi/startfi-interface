import { BigNumber } from '@ethersproject/bignumber'
import { Web3Provider } from '@ethersproject/providers'
import { useCallback } from 'react'
import { Contract } from '@ethersproject/contracts'
import { calculateGasMargin } from 'utils'

export const useSubmitTransaction = (): ((
  methodsName: string,
  args: Array<string> | undefined,
  contract: Contract | null,
  account: string | null,
  library: Web3Provider | undefined
) => void) => {
  return useCallback(
    async (
      methodsName: string,
      args: Array<string> | undefined,
      contract: Contract | null,
      account: string | null,
      library: any
    ) => {
      try {
        const estimatedGas = await library?.estimateGas(contract?.interface.encodeFunctionData(methodsName, args))
        const gasPrice = await (await library?.getGasPrice())?.toNumber()

        const callData = contract?.interface.encodeFunctionData(methodsName, args)
        return library?.getSigner().sendTransaction({
          from: account ? account : undefined,
          to: contract?.address,
          data: callData
       /*    gasLimit: calculateGasMargin(estimatedGas), // or library?._lastBlockNumber
          gasPrice: gasPrice */
        })
      } catch (e) {
        console.log(e)
      }
    },
    []
  )
}
