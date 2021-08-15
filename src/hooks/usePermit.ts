import { Contract, utils, BigNumber, ethers } from 'ethers'
import { useCallback } from 'react'
import { useActiveWeb3React } from 'hooks'
import { splitSignature } from 'ethers/lib/utils'

const {  keccak256, defaultAbiCoder, toUtf8Bytes, solidityPack } = utils
const PERMIT_VALIDITY_BUFFER = 20 * 60

const PERMIT_TYPEHASH = keccak256(
  toUtf8Bytes('Permit(address owner,address spender,uint256 value,uint256 nonce,uint256 deadline)')
)
const TRANSFER_TYPEHASH = keccak256(
  toUtf8Bytes('Transfer(address owner,address to,uint256 value,uint256 nonce,uint256 deadline)')
)

function getDomainSeparator(name: string, tokenAddress: string) {
  return keccak256(
    defaultAbiCoder.encode(
      ['bytes32', 'bytes32', 'bytes32', 'uint256', 'address'],
      [
        keccak256(toUtf8Bytes('EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)')),
        keccak256(toUtf8Bytes(name)),
        keccak256(toUtf8Bytes('1')),
        0,
        tokenAddress
      ]
    )
  )
}
export async function getApprovalDigest(
  token: Contract,
  approve: {
    owner: string
    spender: string
    value: BigNumber
  },
  nonce: BigNumber,
  deadline: BigNumber
): Promise<string> {
  const name = await token.name()
  const DOMAIN_SEPARATOR = getDomainSeparator(name, token.address)
  return keccak256(
    solidityPack(
      ['bytes1', 'bytes1', 'bytes32', 'bytes32'],
      [
        '0x19',
        '0x01',
        DOMAIN_SEPARATOR,
        keccak256(
          defaultAbiCoder.encode(
            ['bytes32', 'address', 'address', 'uint256', 'uint256', 'uint256'],
            [PERMIT_TYPEHASH, approve.owner, approve.spender, approve.value, nonce, deadline]
          )
        )
      ]
    )
  )
}

export const useERC20PermitSignature = (): ((spender: string, amount: string | number, contract: Contract) => any) => {
  const { account, library } = useActiveWeb3React()
  const transactionDeadline = Date.now() + 20 * 60
  return useCallback(
    async (spender: string, amount: string | number, contract: Contract) => {
      try {
        const nonce = await contract.nonces(account)
        const digest = await getApprovalDigest(
          contract,
          { owner: account as string, spender, value: BigNumber.from(amount) },
          nonce,
          BigNumber.from(transactionDeadline)
        )
        const messageHashBytes = utils.arrayify(digest)
        const signature = await library?.getSigner().signMessage(messageHashBytes)
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
