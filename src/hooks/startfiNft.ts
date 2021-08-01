import { useCallback } from 'react'
import { useSubmitTransaction } from 'services/Blockchain/submitTransaction'
import { useWalletModalToggle } from 'state/application/hooks'
import { evaluateTransaction } from 'services/Blockchain/useEvaluateTransaction'
import { useActiveWeb3React } from 'hooks'
import {  useStartFiNft, parseBigNumber } from './useContract'
import { ROLES } from 'constants/index'
import abiDecoder from 'abi-decoder'
import { abi as _ABI } from '../constants/abis/StartfiRoyaltyNFT.json'
abiDecoder.addABI(_ABI)
export const useNftInfo = () => {
  const contract = useStartFiNft(false)
  return useCallback(async () => {
    try {
      const name = await evaluateTransaction(contract, 'name', [])
      const symbol = await evaluateTransaction(contract, 'symbol', [])
      return {
        name,
        symbol
      }
    } catch (e) {
      console.log(e)
      return e
    }
  }, [contract])
}

// export const useMint = (): ((
//   address: string,
//   ipfsHash: string,
//   share?: string | number,
//   base?: string | number
// ) => any) => {
//   const { account, library } = useActiveWeb3React()
//   const contract = useStartFiPayment(true)
//   const mint = useSubmitTransaction()
//   const toggleWalletModal = useWalletModalToggle()
//   return useCallback(
//     async (address: string, ipfsHash: string, share?: string | number, base?: string | number) => {
//       if (!account || !address) {
//         toggleWalletModal()
//         return `account: ${account} is not connected`
//       }
//       try {
//         if (share && base) {
//           const mintedNFT = await mint(
//             'MintNFTWithRoyalty',
//             [address, ipfsHash, share, base],
//             contract,
//             account,
//             library
//           )
//           return (mintedNFT as any).value.toNumber()
//         } else {
//           const mintedNFT = await mint('MintNFTWithoutRoyalty', [address, ipfsHash], contract, account, library)
//           return (mintedNFT as any).value.toNumber()
//         }
//       } catch (e) {
//         console.log('error', e)
//         return e
//       }
//     },
//     [account, contract, library, mint, toggleWalletModal]
//   )
// }

export const useGetTokenURI = (): ((tokenId: string | number) => any) => {
  const contract = useStartFiNft(false)
  return useCallback(
    (tokenId: string | number) => {
      const getUri = async () => {
        const uri = await evaluateTransaction(contract, 'tokenURI', [tokenId])
        return uri
      }
      return getUri()
    },
    [contract]
  )
}

export const useGetNftOwner = (): ((tokenId: string | number) => any) => {
  const contract = useStartFiNft(false)
  return useCallback(
    (tokenId: string | number) => {
      const getUri = async () => {
        try {
          const uri = await evaluateTransaction(contract, 'ownerOf', [tokenId])
          return uri
        } catch (e) {
          console.log(e)
          return e
        }
      }
      return getUri()
    },
    [contract]
  )
}

export const useNftBalance = (): ((address: string) => any) => {
  const contract = useStartFiNft(false)
  return useCallback(
    (address: string) => {
      const getBalance = async () => {
        try {
          const balance = await evaluateTransaction(contract, 'balanceOf', [address])
          return balance.toHexString()
        } catch (e) {
          console.log(e)
          return e
        }
      }
      return getBalance()
    },
    [contract]
  )
}
export const useGrantRoleNft = (): ((user: string) => any) => {
  const { account, library } = useActiveWeb3React()
  const contract = useStartFiNft(true)
  const grantRole = useSubmitTransaction()
  const toggleWalletModal = useWalletModalToggle()
  return useCallback(
    async (user: string) => {
      if (!account) {
        toggleWalletModal()
        return `account: ${account} is not connected`
      }
      try {
        return await grantRole('grantRole', [ROLES.admin, user], contract, account, library)
      } catch (e) {
        console.log('error', e)
        return e
      }
    },
    [account, contract, library, grantRole, toggleWalletModal]
  )
}

export const useApproveNft = (): ((spender: string, tokenId: string | number) => any) => {
  const { account, library } = useActiveWeb3React()
  const contract = useStartFiNft(true)
  const approve = useSubmitTransaction()
  const toggleWalletModal = useWalletModalToggle()
  return useCallback(
    async (spender: string, tokenId: string | number) => {
      if (!account) {
        toggleWalletModal()
        return `account: ${account} is not connected`
      }
      try {
        const transaction = await approve('approve', [spender, tokenId], contract, account, library)
        const transactionReceipt = await library?.waitForTransaction((transaction as any).hash)
        const decodedLogs = await abiDecoder.decodeLogs(transactionReceipt?.logs)
        return decodedLogs[0].events
      } catch (e) {
        console.log('error', e)
        return e
      }
    },
    [account, contract, library, approve, toggleWalletModal]
  )
}
export const useGetApproverAddress = (): ((tokenId: string | number) => any) => {
  const contract = useStartFiNft(false)
  return useCallback(
    (tokenId: string | number) => {
      const getAddress = async () => {
        try {
          const address = await evaluateTransaction(contract, 'getApproved', [tokenId])
          return address
        } catch (e) {
          console.log(e)
          return e
        }
      }
      return getAddress()
    },
    [contract]
  )
}

export const useRoyaltyInfo = (): ((tokenId: string | number, value: string | number) => any) => {
  const contract = useStartFiNft(false)
  return useCallback(
    (tokenId: string | number, value: string | number) => {
      const getInfo = async () => {
        try {
          const info = await evaluateTransaction(contract, 'royaltyInfo', [tokenId, value])
          return parseBigNumber(info)
        } catch (e) {
          console.log(e)
          return e
        }
      }
      return getInfo()
    },
    [contract]
  )
}

// export const useNftPaymentInfo = (): (() => any) => {
//   const contract = useStartFiPayment(false)
//   return useCallback(() => {
//     const getInfo = async () => {
//       try {
//         const info = await evaluateTransaction(contract, 'info', [])
//         return parseBigNumber(info)
//       } catch (e) {
//         console.log(e)
//       }
//     }
//     return getInfo()
//   }, [contract])
// }
// NFT Payment Owner Transactions
// export const useChangeFeesNftPayment = (): ((newFees: string | number) => any) => {
//   const { account, library } = useActiveWeb3React()
//   const contract = useStartFiPayment(true)
//   const changeFees = useSubmitTransaction()
//   const toggleWalletModal = useWalletModalToggle()
//   return useCallback(
//     async (newFees: string | number) => {
//       if (!account) {
//         toggleWalletModal()
//         return `account: ${account} is not connected`
//       }
//       try {
//         return await changeFees('changeFees', [newFees], contract, account, library)
//       } catch (e) {
//         console.log('error', e)
//         return e
//       }
//     },
//     [account, contract, library, changeFees, toggleWalletModal]
//   )
// }

// export const useChangeNftContractNftPayment = (): ((nftAddress: string) => any) => {
//   const { account, library } = useActiveWeb3React()
//   const contract = useStartFiPayment(true)
//   const changeNftContract = useSubmitTransaction()
//   const toggleWalletModal = useWalletModalToggle()
//   return useCallback(
//     async (nftAddress: string) => {
//       if (!account) {
//         toggleWalletModal()
//         return `account: ${account} is not connected`
//       }
//       try {
//         return await changeNftContract('changeNftContract', [nftAddress], contract, account, library)
//       } catch (e) {
//         console.log('error', e)
//         return e
//       }
//     },
//     [account, contract, library, changeNftContract, toggleWalletModal]
//   )
// }

// export const useChangePaymentContractNftPayment = (): ((paymentAddress: string) => any) => {
//   const { account, library } = useActiveWeb3React()
//   const contract = useStartFiPayment(true)
//   const changePaymentContract = useSubmitTransaction()
//   const toggleWalletModal = useWalletModalToggle()
//   return useCallback(
//     async (nftAddress: string) => {
//       if (!account) {
//         toggleWalletModal()
//         return `account: ${account} is not connected`
//       }
//       try {
//         return await changePaymentContract('changePaymentContract', [nftAddress], contract, account, library)
//       } catch (e) {
//         console.log('error', e)
//         return e
//       }
//     },
//     [account, contract, library, changePaymentContract, toggleWalletModal]
//   )
// }
