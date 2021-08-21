import { Contract, ethers } from 'ethers'
import { useCallback } from 'react'
import { useActiveWeb3React } from 'hooks'

export const useERC20PermitSignature = (): ((spender: string, amount: string | number, contract: Contract) => any) => {
  const { account, library, chainId } = useActiveWeb3React()
  const transactionDeadline = Date.now() + 20 * 60
  return useCallback(
    async (spender: string, amount: string | number, contract: Contract) => {
      try {
        const nonce = await contract.nonces(account)
        const EIP712Domain = [
          { name: 'name', type: 'string' },
          { name: 'version', type: 'string' },
          { name: 'chainId', type: 'uint256' },
          { name: 'verifyingContract', type: 'address' }
        ]
        const domain = {
          name: 'StartFiToken',
          version: '1',
          chainId: 0, //@EH workaround need to use the chainID
          verifyingContract: contract.address
        }
        const Permit = [
          { name: 'owner', type: 'address' },
          { name: 'spender', type: 'address' },
          { name: 'value', type: 'uint256' },
          { name: 'nonce', type: 'uint256' },
          { name: 'deadline', type: 'uint256' }
        ]
        const message = {
          owner: account,
          spender,
          value: amount.toString(),
          nonce: nonce.toHexString(),
          deadline: transactionDeadline
        }
        const data = JSON.stringify({
          types: {
            EIP712Domain,
            Permit
          },
          domain,
          primaryType: 'Permit',
          message
        })

        const signature = await library?.send('eth_signTypedData_v4', [account, data])
        const signData = ethers.utils.splitSignature(signature as string)
        const { r, s, v } = signData
        return {
          r,
          s,
          v,
          deadline: transactionDeadline
        }
      } catch (e) {
        console.log('error', e)
        return e
      }
    },
    [account, library, transactionDeadline]
  )
}
