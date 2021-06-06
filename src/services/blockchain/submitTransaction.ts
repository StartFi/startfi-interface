export const submitTransaction = (
  usedcontrat: any,
  methodsName: string,
  args: Array<string> | undefined,
  account: string,
  library: any
): any => {
  const contract = usedcontrat(account, library, true)
  const callData = contract?.interface.encodeFunctionData(methodsName, args)
  return library.getSigner().sendTransaction({
    from: account ? account : undefined,
    to: contract?.address,
    data: callData
  })
}
