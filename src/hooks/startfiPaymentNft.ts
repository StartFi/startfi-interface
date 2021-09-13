import { useCallback } from 'react'
import { useSubmitTransaction } from 'services/Blockchain/submitTransaction'
import { useWalletModalToggle } from 'state/application/hooks'
import { evaluateTransaction } from 'services/Blockchain/useEvaluateTransaction'
import { useActiveWeb3React } from 'hooks'
import { useStartFiPayment, parseBigNumber } from './useContract'

export const useMint = (): ((
  address: string,
  ipfsHash: string,
  share?: string | number,
  base?: string | number
) => any) => {
  const { account, library } = useActiveWeb3React()
  const contract = useStartFiPayment(true)
  const mint = useSubmitTransaction()
  const toggleWalletModal = useWalletModalToggle()
  return useCallback(
    async (address: string, ipfsHash: string, share?: string | number, base?: string | number) => {
      if (!account || !address) {
        toggleWalletModal()
        return `account: ${account} is not connected`
      }
      try {
        if (share && base) {
          const mintedNFT = await mint(
            'MintNFTWithRoyalty',
            [address, ipfsHash, share, base],
            contract,
            account,
            library
          )
          return (mintedNFT as any).value.toNumber()
        } else {
          const mintedNFT = await mint('MintNFTWithoutRoyalty', [address, ipfsHash], contract, account, library)
          return (mintedNFT as any).value.toNumber()
        }
      } catch (e) {
        console.log('error', e)
        return e
      }
    },
    [account, contract, library, mint, toggleWalletModal]
  )
}

export const useNftPaymentInfo = (): (() => any) => {
  const contract = useStartFiPayment(false)
  return useCallback(() => {
    const getInfo = async () => {
      try {
        const info = await evaluateTransaction(contract, 'info', [])
        return parseBigNumber(info)
      } catch (e) {
        console.log(e)
      }
    }
    return getInfo()
  }, [contract])
}
// NFT Payment Owner Transactions
export const useChangeFeesNftPayment = (): ((newFees: string | number) => any) => {
  const { account, library } = useActiveWeb3React()
  const contract = useStartFiPayment(true)
  const changeFees = useSubmitTransaction()
  const toggleWalletModal = useWalletModalToggle()
  return useCallback(
    async (newFees: string | number) => {
      if (!account) {
        toggleWalletModal()
        return `account: ${account} is not connected`
      }
      try {
        return await changeFees('changeFees', [newFees], contract, account, library)
      } catch (e) {
        console.log('error', e)
        return e
      }
    },
    [account, contract, library, changeFees, toggleWalletModal]
  )
}

export const useChangeNftContractNftPayment = (): ((nftAddress: string) => any) => {
  const { account, library } = useActiveWeb3React()
  const contract = useStartFiPayment(true)
  const changeNftContract = useSubmitTransaction()
  const toggleWalletModal = useWalletModalToggle()
  return useCallback(
    async (nftAddress: string) => {
      if (!account) {
        toggleWalletModal()
        return `account: ${account} is not connected`
      }
      try {
        return await changeNftContract('changeNftContract', [nftAddress], contract, account, library)
      } catch (e) {
        console.log('error', e)
        return e
      }
    },
    [account, contract, library, changeNftContract, toggleWalletModal]
  )
}

export const useChangePaymentContractNftPayment = (): ((paymentAddress: string) => any) => {
  const { account, library } = useActiveWeb3React()
  const contract = useStartFiPayment(true)
  const changePaymentContract = useSubmitTransaction()
  const toggleWalletModal = useWalletModalToggle()
  return useCallback(
    async (nftAddress: string) => {
      if (!account) {
        toggleWalletModal()
        return `account: ${account} is not connected`
      }
      try {
        return await changePaymentContract('changePaymentContract', [nftAddress], contract, account, library)
      } catch (e) {
        console.log('error', e)
        return e
      }
    },
    [account, contract, library, changePaymentContract, toggleWalletModal]
  )
}
