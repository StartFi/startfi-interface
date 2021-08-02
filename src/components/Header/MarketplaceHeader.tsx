import React, { useEffect, useState } from 'react'
import Wallet from 'components/Wallet'
import Logo from '../../assets/icons/logo.svg'
import Heart from '../../assets/icons/heart.svg'
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
import { CATEGORIES, DEFAULT_SORT, Dictionary } from '../../constants'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useWalletAddress } from 'state/user/hooks'
import { useLocationSearch } from 'hooks'
import { ConnectWallet, FirstRow, Img, Search, Tab, TabsCategory } from './styles'

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
        <Link to="" onClick={() => history.push('whitelist')}>
          <img src={Heart} alt="Whitelist" />
        </Link>
        <LinkCreateNFT to="/mint/steps">{t('mintNFT')}</LinkCreateNFT>
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
