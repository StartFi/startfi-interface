import { BigNumber } from '@ethersproject/bignumber'

export default function parseBigNumber(logs: any): any {
  return logs.map(log => {
    if (BigNumber.isBigNumber(log)) {
      return log.toHexString()
    }
    return log
  })
}
