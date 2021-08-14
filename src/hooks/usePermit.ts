import { Contract, providers, utils, BigNumber, constants, ethers } from 'ethers'
import { ecsign } from 'ethereumjs-util'
import { useCallback } from 'react'
import { useActiveWeb3React } from 'hooks'
import { useStartFiToken } from './useContract'

const { getAddress, keccak256, defaultAbiCoder, toUtf8Bytes, solidityPack } = utils

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

export const useERC20PermitSignature = (): ((spender: string, amount: string | number) => any) => {
  const { account, library } = useActiveWeb3React()
  const contract = useStartFiToken(true)
  const { MaxUint256 } = constants
  return useCallback(async (spender: string, amount: string | number) => {
    try {
      const nonce = await contract?.nonces(account)
      const digest = await getApprovalDigest(
        contract as Contract,
        { owner: account as string, spender, value: BigNumber.from(amount) },
        nonce,
        MaxUint256
      )

      const signature = await library?.getSigner().signMessage(digest)
      const r = signature?.slice(0, 66)
      const s = '0x'.concat(signature?.slice(66, 130) as string)
      let v = '0x'.concat(signature?.slice(130, 132) as string)
      v = utils?.hexlify(v)
      if (![27, 28].includes(Number(v))) v += 27
      return {
        r,
        s,
        v,
        deadline: MaxUint256
      }
    } catch (e) {
      console.log('error', e)
      return e
    }
  }, [])
}
