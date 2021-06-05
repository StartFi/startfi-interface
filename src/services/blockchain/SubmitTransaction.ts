import { useActiveWeb3React } from 'hooks'

export function SubmitTransaction(
  contrat: any,
  methodsName: string,
  args: Array<string> | undefined
): Promise<any> | string {
  const { account, library } = useActiveWeb3React()
  const tokenContract = contrat(true)
  const callData = tokenContract?.interface.encodeFunctionData(methodsName, args)
  return library
    ? library.getSigner().sendTransaction({
        from: account ? account : undefined,
        to: tokenContract?.address,
        data: callData
      })
    : 'no provider'
}
