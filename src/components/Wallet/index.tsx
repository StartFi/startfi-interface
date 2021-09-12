import * as React from 'react'
import styled from 'styled-components'
import { Text } from 'rebass'
// import { ChainId } from '@uniswap/sdk'
import { ChainId } from '../../constants/supportedChains'

import { YellowCard } from 'components/Card'
import { useActiveWeb3React } from 'hooks'
import { useETHBalances } from 'state/wallet/hooks'
import Web3Status from 'components/Web3Status'

const HeaderElement = styled.div`
  display: flex;
  align-items: center;

  background-color: white;

  /* addresses safari's lack of support for "gap" */
  & > *:not(:first-child) {
    margin-left: 8px;
  }

  ${({ theme }) => theme.mediaWidth.upToMedium`
   flex-direction: row-reverse;
    align-items: center;
  `};
`

const AccountElement = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  /* background-color: ${({ theme, active }) => (!active ? theme.bg1 : theme.bg3)}; */
  background-color: #F9F9F9;
  border-radius: 12px;
  white-space: nowrap;
  width: 100%;
  cursor: pointer;

  :focus {
    border: 1px solid blue;
  }
`

const HideSmall = styled.span`
  ${({ theme }) => theme.mediaWidth.upToSmall`
    display: none;
  `};
`

const NetworkCard = styled(YellowCard)`
  border-radius: 12px;
  padding: 8px 12px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    margin: 0;
    margin-right: 0.5rem;
    width: initial;
    overflow: hidden;
    text-overflow: ellipsis;
    flex-shrink: 1;
  `};
`

const BalanceText = styled(Text)`
  background-color: white;
  border-radius: 100px 8px 8px 100px;
  padding: 0.5vh 0.5vw;
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    display: none;
  `};
`

const NETWORK_LABELS: { [chainId in ChainId]?: string } = {
  // [ChainId.RINKEBY]: 'Rinkeby',
  [ChainId.ROPSTEN]: 'Ropsten',
  [ChainId.StartFi]: 'LocalHost'
  // [ChainId.AURORA]: 'Aurora',
  // [ChainId.BSCT]: 'Binance Smart chain Test',
  // [ChainId.BSC]: 'Binance Smart chain',
  // [ChainId.POLYGON]: 'Polygon Test',
  // [ChainId.GÖRLI]: 'Görli',
  // [ChainId.KOVAN]: 'Kovan'
}

const Wallet: React.FC = () => {
  const { account, chainId } = useActiveWeb3React()

  const userEthBalance = useETHBalances(account ? [account] : [])?.[account ?? '']

  return (
    <HeaderElement>
      <HideSmall>
        {chainId && NETWORK_LABELS[chainId] && (
          <NetworkCard title={NETWORK_LABELS[chainId]}>{NETWORK_LABELS[chainId]}</NetworkCard>
        )}
      </HideSmall>
      <AccountElement active={!!account} style={{ pointerEvents: 'auto' }}>
        {account && userEthBalance ? (
          <BalanceText style={{ flexShrink: 0 }} pl="0.75rem" pr="0.5rem" fontWeight={500}>
            {userEthBalance?.toSignificant(4)} ETH
          </BalanceText>
        ) : null}
        <Web3Status />
      </AccountElement>
    </HeaderElement>
  )
}

export default Wallet
