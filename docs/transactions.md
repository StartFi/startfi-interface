# Transactions Documentation

## Evaluate transaction (Read from the blockchain)

```
import { useStartFiContract } from 'services/blockchain/useStartfiContracts' hook to get account, provider and smart contract
import { evaluateTransaction } from 'services/blockchain/useEvaluateTransaction' // service to read from blockchain
```

- Use `useStartFiContract`

```
  const { contract: tokenContract } = useStartFiContract('token', false) // contract name could be token, nft, marketplace or nftRoyality
```

- Use `evaluateTransaction` which takes contract object from `useStartFiContract`, method name, and array of arguments

```
evaluateTransaction(tokenContract, 'balanceOf', ['0xe092b1fa25DF5786D151246E492Eed3d15EA4dAA']) // need to use await or .then 
```

## Submit transaction (Write on the blockchain)

- Call hook from services

```
import { useSubmitTransaction } from 'src/services/blockchain/useSubmitTransaction.ts'
```

- Mint an NFT go to `src/hooks/startfiNft`

```
import { useCallback } from 'react'
import { useSubmitTransaction } from 'services/blockchain/submitTransaction'

export const useMint = (): ((address: string, contract: any, account: any, library: any) => void) => {
  const mint = useSubmitTransaction()
  return useCallback((address: string, contract: any, account: any, library: any) => {
    mint('mint', [address], contract, account, library)
  }, [])
}
```

- use mint function

```
import { useStartFiContract } from 'services/blockchain/useStartfiContracts'
import { useMint } from 'hooks/startfiNft'
import { useMint } from 'hooks/startfiNft'


// Inside Component
const mint = useMint()
const { account, library, contract: nftContract } = useStartFiContract('nftRoyality')

// Inside JSX
 onChange={() => {
     mint(account as string, '<ipfsHash>', nftContract, account as string, library, true, '1', '10') // call function
        }}
```

You can found a running example on this [branch](https://github.com/StartFi/startfi-interface/tree/feature/bc-mintNFT). You will submit a transaction by changing the NFT category.
