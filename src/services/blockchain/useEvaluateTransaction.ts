import { NEVER_RELOAD, useSingleCallResult } from 'state/multicall/hooks'

export function useEvaluateTransaction(contract: any, methodName: string, args: Array<string> | undefined): any {
  const evaluateContract = contract(false)
  const call = useSingleCallResult(evaluateContract, methodName, args, NEVER_RELOAD)
  return call?.result?.[0] ?? false
}

/* export function evaluateTransaction(contract: any, methodName: string, args: Array<string> | undefined): any {
  const evaluateContract = contract(false)
  const result = evaluateContract?.deployed()
}
 */