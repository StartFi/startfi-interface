import React, { useEffect, useState } from 'react'
import Wallet from 'components/Wallet'
import Logo from '../../assets/icons/logo.svg'
import Heart from '../../assets/icons/heart.svg'
import { ButtonSearch } from 'components/Button'
import { LinkCreateNFT } from 'components/Link'
import { InputSearch } from 'components/Input'
import Books from '../../assets/icons/bookstab.svg'
import Videos from '../../assets/icons/videostab.svg'
import Art from '../../assets/icons/arttab.svg'
import Games from '../../assets/icons/gamestab.svg'
import All from '../../assets/icons/alltab.svg'
import Music from '../../assets/icons/musictab.svg'
import Images from '../../assets/icons/imagestab.svg'
import { useGetNFTs } from 'state/marketplace/hooks'
import { useHistory } from 'react-router'
import { CATEGORIES, DEFAULTSORT, Dictionary } from './../../constants'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Row } from 'theme/components'
import { useWalletAddress } from 'state/user/hooks'
import { useSearch } from 'hooks'

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

const Img = styled.img`
  margin-right: 1vw;
`

const Search = styled(Row)`
  align-items: stretch;
  height: 6vh;
`

const TabsCategory = styled(Row)`
  /* margin-top: 1vh; */
  margin-bottom: 4vh;
  padding: 3vh 0;
  padding-right: 10vw;
  border-bottom: 1px solid #efefef;
`

interface TabProps {
  readonly selected: boolean
}

const Tab = styled(Row)<TabProps>`
  cursor: pointer;
  padding-bottom: 1vh;
  border-bottom: ${props => (props.selected ? '2px solid #000000;' : 'none;')};
`

const FirstRow = styled(Row)`
  margin-bottom: 4vh;
`

const ConnectWallet = styled.div`
  width: 100%;
  text-align: center;
  background: rgba(255, 0, 0, 0.05);
  border: 1px solid rgba(228, 0, 0, 0.1);
  border-radius: 4px;
  text-transform: capitalize;
  color: #ba0404;
  padding: 1vh 0;
  margin-bottom: 2vh;
`

const NFTsHeader: React.FC = () => {
  const address = useWalletAddress()

  const history = useHistory()

  const { t } = useTranslation()

  const [input, setInput] = useState('')

  const getNFTs = useGetNFTs()

  var { category, search } = useSearch()

  if (!category) category = 'all'

  useEffect(() => getNFTs({ category, search, sort: DEFAULTSORT }), [category, search, getNFTs])

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

export default NFTsHeader
