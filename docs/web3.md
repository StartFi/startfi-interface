# Web3-React

## Inject Wallet

### Add your network ID

Location: [src/connector/index.js](./src/connector/index.js)

```sh
export const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42,1337] // add 1337
})
```

### Create Connection For Child Components

We use the simultaneous connection for the following reasons:

- Wanting "always-on" access to a remote node while letting users bring their accounts as necessary.
- Communicating with a sidechain and mainnet in tandem.
- Balancing an in-browser burner wallet with other connection methods.

Location: [src/index.tsx](./src/index.tsx)

```sh
const Web3ProviderNetwork = createWeb3ReactRoot(NetworkContextName);
....

   <Web3ReactProvider getLibrary={getLibrary}>
      <Web3ProviderNetwork getLibrary={getLibrary}>
       /*Components Need connection to the web3 instance*/
      </Web3ProviderNetwork>
  </Web3ReactProvider>
....
```

## Interact With Smart-Contracts

### Import Contract ABI/Networks

Location: [src/hooks/useContract](./src/hooks/useContract.ts)

```sh
import { networks as CONTRACT_NETWORK, abi as CONTRACT_ABI } from "../constants/abis/contractName.json";
```

### Create a hook for your contract

Location: [src/hooks/useContract](./src/hooks/useContract.ts)

```sh
export function use<YOUR_CONTRACT_NAME>Contract(withSignerIfPossible?: boolean): Contract| null{
  const { chainId } = useActiveWeb3React()
  return useContract(chainId ? CONTRACT_NETWORK['1337'].address : undefined, CONTRACT_ABI, withSignerIfPossible)
}
```

### Create a hook for your method

Create file at [src/hooks/](./src/hooks/)
fileName: use<YOUR_CONTRACT_NAME>.ts

```sh
import { NEVER_RELOAD, useSingleCallResult } from '../state/multicall/hooks'
import { useActiveWeb3React } from './index'
import { use<YOUR_CONTRACT_NAME>Contract } from './useContract'

export default function use<YOUR_CONTRACT_NAME>(): any {
  const { account } = useActiveWeb3React()
  const <YOUR_CONTRACT_NAME> = use<YOUR_CONTRACT_NAME>Contract()
  const call = useSingleCallResult(<YOUR_CONTRACT_NAME>, '<YOUR_METHOD_NAME>', [account ?? undefined], NEVER_RELOAD)
  return call;
}
```

check example on [uniswap/uniswap-v3-info](https://github.com/Uniswap/uniswap-v3-info/blob/569a477735123b13f561bd701f3826529836c60e/src/hooks/Tokens.ts)

## Wallets Implemented For Mainnet Only

1. Fortmatic
2. Portis
3. Walletconnect
4. Walletlink

Get all wallets [documentation](https://github.com/NoahZinsmeister/web3-react/tree/d0b038c748a42ec85641a307e6c588546d86afc2/docs/connectors)

### Ethersproject Experimental

ethersproject experimental apply `brainWallet`. It allows a wallet to be described and recovered using a username and a password. However, anyone who can guess a username and password can steal the funds (It's not a priority for now)

## Useful Packages

1. [SWR](https://swr.vercel.app/) manage data fetching using an HTTP cache invalidation strategy.
2. [ethersproject/units](https://www.npmjs.com/package/@ethersproject/units) transfere numbers to readable formates.

## Useful Resources

1. :warning: Extremly important [web3 react](https://github.com/NoahZinsmeister/web3-react/tree/d0b038c748a42ec85641a307e6c588546d86afc2/docs) documentation
2. [Fetch & Update data](https://consensys.net/blog/developers/how-to-fetch-and-update-data-from-ethereum-with-react-and-swr/) with web3js-react & swr consensys blog.
3. [OpenZeppelin Form](https://forum.openzeppelin.com/t/do-you-use-web3-to-frontend-libraries-like-web3-react/714) use web3 to react libraries
