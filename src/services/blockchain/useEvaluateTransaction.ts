import { Contract } from '@ethersproject/contracts'
import { CallState, NEVER_RELOAD, useSingleCallResult } from 'state/multicall/hooks'

export function useEvaluateTransaction(
  contract: Contract | null,
  methodName: string,
  args: Array<string> | undefined
): CallState | boolean {
  const call = useSingleCallResult(contract, methodName, args, NEVER_RELOAD)
  return call?.result?.[0] ?? false
}

export async function evaluateTransaction(
  contract: Contract | null,
  methodName: string,
  args: Array<string>
): Promise<any> {
  const methods = await contract?.callStatic
  const balance = await methods?.[methodName](...args)
  return balance
}
