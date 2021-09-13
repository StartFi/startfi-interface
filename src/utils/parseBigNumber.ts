import { BigNumber } from '@ethersproject/bignumber'
import { utils } from 'ethers'

export default function parseBigNumber(logs: any): any {
  return logs.map(log => {
    if (BigNumber.isBigNumber(log)) {
      return utils.formatEther(log)
    }
    return log
  })
}
