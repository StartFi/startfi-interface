# Transactions Documentation

## Evaluate transaction (Read from the blockchain)

- Call hook from services

```
import { useEvaluateTransaction } from 'src/services/blockchain/useEvaluateTransaction.ts'
```

`useEvaluateTransaction` are called statically you can trigger event using it
creating a reusable one is still in progress.

- Use `useEvaluateTransaction` to get startfi erc20 token balance

```
import { useEvaluateTransaction } from 'src/services/blockchain/useEvaluateTransaction.ts'
import { useStartFiToken } from 'src/hooks/useContract'

export function BalanceOfStartfiToken(address?: string): any {
  const { account } = useActiveWeb3React()
  const chekedAddress = address ? address : account?.toString()
  const result = useEvaluateTransaction(useStartFiToken, 'balanceOf', [chekedAddress as string])
  return result
}
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
import { useMint } from 'hooks/startfiNft'
import { useStartFiNft } from 'hooks/useContract'
import { useActiveWeb3React } from 'hooks'

// Inside Component
const mint = useMint()
const { account, library } = useActiveWeb3React()
const contract = useStartFiNft(true)

// Inside JSX
 onChange={() => {
          mint(account as string, contract, account, library) // call function
        }}
```

You can found a running example on this [branch](https://github.com/StartFi/startfi-interface/tree/feature/bc-mintNFT). You will submit a transaction by changing the NFT category.
