import React, { useEffect, useState } from 'react'
import Wallet from 'components/Wallet'
import Logo from '../../assets/icons/logo.svg'
import { ButtonSearch } from 'components/Button'
import { LinkCreateNFT } from 'components/Link'
import { InputSearch } from 'components/Input/styles'
import { useGetNFTs } from 'state/marketplace/hooks'
import { useHistory } from 'react-router'
import { ALL_CATEGORIES, DEFAULT_SORT, HEADER_DROPDOWN, TabIcons } from '../../constants'
import { useTranslation } from 'react-i18next'
import { useWalletAddress } from 'state/user/hooks'
import { useLocationSearch } from 'hooks'
import { ConnectWallet, FirstRow, Img, Search, Tab, TabsCategory } from './styles'
import { DropDownCategory } from 'components/DropDown'
import { useDeposit } from 'hooks/startfiStakes'
import { useWeb3React } from '@web3-react/core'
import { useApproveToken } from 'hooks/startfiToken'
import { address as STARTFI_STAKES_ADDRESS } from '../../constants/abis/StartfiStakes.json'

const MarketplaceHeader: React.FC = () => {
  const address = useWalletAddress()

  const history = useHistory()

  const { t } = useTranslation()

  const [input, setInput] = useState('')

  const getNFTs = useGetNFTs()
  const stakeToken = useDeposit()
  const approveToken = useApproveToken()
  const { account } = useWeb3React()
  let { category, search } = useLocationSearch()

  if (!category) category = 'all'

  useEffect(() => getNFTs({ category, search, sort: DEFAULT_SORT }), [category, search, getNFTs])

  const getDropDownChanges = async (e: any) => {
    switch (e.target.value) {
      case 'WishList':
        history.push('/marketplace/wishList')
        break
      case 'Inventory':
        history.push('/inventory/home/draft')
        break
      case 'Dashboard':
        history.push('')
        break
      case 'Stake Tokens':
        await approveToken(STARTFI_STAKES_ADDRESS, 1000)
        await stakeToken(account as string, 1000)
        break
    }
  }
  return (
    <React.Fragment>
      <FirstRow>
        <img src={Logo} alt="Logo" onClick={() => history.push('/')} />
        <Search>
          <InputSearch placeholder={t('searchNFTS')} value={input} onChange={(e: any) => setInput(e.target.value)} />
          <ButtonSearch onClick={() => history.push(`/marketplace/nfts/?category=${category}&search=${input}`)}>
            {t('search')}
          </ButtonSearch>
        </Search>

        <LinkCreateNFT to="/mint/steps">{t('mintNFT')}</LinkCreateNFT>

        <DropDownCategory
          options={HEADER_DROPDOWN}
          name={'drop'}
          value={''}
          itemsWidth="180px"
          border="none"
          selectIcon={true}
          onChange={(e: any) => {
            getDropDownChanges(e)
          }}
        ></DropDownCategory>
        <Wallet />
      </FirstRow>

      {!address && <ConnectWallet>{t('marketplaceConnectWallet')}</ConnectWallet>}

      <TabsCategory>
        {ALL_CATEGORIES.map(c => (
          <Tab key={c} selected={category === c} onClick={() => history.push(`/marketplace/nfts?category=${c}`)}>
            <Img src={TabIcons[c]} alt={c} />
            {t(c)}
          </Tab>
        ))}
      </TabsCategory>
    </React.Fragment>
  )
}
export default MarketplaceHeader
