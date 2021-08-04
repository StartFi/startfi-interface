import React, { useEffect, useState } from 'react'
import Wallet from 'components/Wallet'
import Logo from '../../assets/icons/logo.svg'
import { ButtonSearch } from 'components/Button'
import { LinkCreateNFT } from 'components/Link'
import { InputSearch } from 'components/Input/styles'
import Books from '../../assets/icons/bookstab.svg'
import Videos from '../../assets/icons/videostab.svg'
import Art from '../../assets/icons/arttab.svg'
import Games from '../../assets/icons/gamestab.svg'
import All from '../../assets/icons/alltab.svg'
import Music from '../../assets/icons/musictab.svg'
import Images from '../../assets/icons/imagestab.svg'
import { useGetNFTs } from 'state/marketplace/hooks'
import { useHistory } from 'react-router'
import { CATEGORIES, DEFAULT_SORT, Dictionary, HEADER_DROPDOWN } from '../../constants'
import { useTranslation } from 'react-i18next'
import { useWalletAddress } from 'state/user/hooks'
import { useLocationSearch } from 'hooks'
import { ConnectWallet, FirstRow, Img, Search, Tab, TabsCategory } from './styles'
import { DropDownCategory } from 'components/DropDown'

const Categories = ['all', ...CATEGORIES]

const TabIcons: Dictionary = {
  books: Books,
  videos: Videos,
  art: Art,
  games: Games,
  all: All,
  music: Music,
  images: Images
}

const MarketplaceHeader: React.FC = () => {
  const address = useWalletAddress()

  const history = useHistory()

  const { t } = useTranslation()

  const [input, setInput] = useState('')

  const getNFTs = useGetNFTs()

  let { category, search } = useLocationSearch()

  if (!category) category = 'all'

  useEffect(() => getNFTs({ category, search, sort: DEFAULT_SORT }), [category, search, getNFTs])

  const getDropDownChanges = (e: any) => {
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
    }
  }
  return (
    <React.Fragment>
      <FirstRow>
        <img src={Logo} alt='Logo' onClick={() => history.push('/')} />
        <Search>
          <InputSearch placeholder={t('searchNFTS')} value={input} onChange={(e: any) => setInput(e.target.value)} />
          <ButtonSearch onClick={() => history.push(`/marketplace/nfts/?category=${category}&search=${input}`)}>
            {t('search')}
          </ButtonSearch>
        </Search>

        <LinkCreateNFT to='/mint/steps'>{t('mintNFT')}</LinkCreateNFT>

        <DropDownCategory
          options={HEADER_DROPDOWN}
          name={'drop'}
          value={''}
          itemsWidth='180px'
          border='none'
          selectIcon={true}
          onChange={(e: any) => {
            getDropDownChanges(e)
          }}
        ></DropDownCategory>
        <Wallet />
      </FirstRow>

      {!address && <ConnectWallet>{t('marketplaceConnectWallet')}</ConnectWallet>}

      <TabsCategory>
        {Categories.map(c => (
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
