import { useStartFiNft } from 'hooks/useContract'
import { submitTransaction } from 'services/blockchain/submitTransaction'

export const mint = (address: string, account: string, library: any): any => {
  console.log('library', library)
  return (
    submitTransaction(
      useStartFiNft,
      'mint',
      ['0x54B1b002cE313ACd16202e58da794f4F4Db1eE49'],
      account as string,
      library
    ),
    []
  )
}
