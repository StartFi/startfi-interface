import { Contract } from '@ethersproject/contracts'
import { CallState, NEVER_RELOAD, useSingleCallResult } from 'state/multicall/hooks'

export function useEvaluateTransaction(
  contract: Contract | null,
  methodName: string,
  args: Array<string> | undefined
): CallState | boolean | undefined {
  try {
    const call = useSingleCallResult(contract, methodName, args, NEVER_RELOAD)
    return call?.result?.[0] ?? false
  } catch (e) {
    console.log(e)
    return e
  }
}
export async function evaluateTransaction(
  contract: Contract | null,
  methodName: string,
  args: Array<string>
): Promise<any> {
  try {
    const methods = await contract?.callStatic
    const result = await methods?.[methodName](...args)
    return result
  } catch (e) {
    console.log(e)
    return e
  }
}
