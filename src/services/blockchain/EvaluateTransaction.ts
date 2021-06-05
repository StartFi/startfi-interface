import { NEVER_RELOAD, useSingleCallResult } from 'state/multicall/hooks'

export function EvaluateTransaction(contract: any, methodName: string, args: Array<string> | undefined): any {
  const evaluateContract = contract(false)
  const result = useSingleCallResult(evaluateContract, methodName, args, NEVER_RELOAD)
  return result
}
