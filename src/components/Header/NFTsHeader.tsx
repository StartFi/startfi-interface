import React, { useState } from 'react'
import Wallet from 'components/Wallet'
import Logo from '../../assets/icons/logo.svg'
import Heart from '../../assets/icons/heart.svg'
import { ButtonSearch } from 'components/Button'
import { LinkCreateNFT } from 'components/Link'
import { InputSearch } from 'components/Input'
import { Grid, Link } from '@material-ui/core'
// import { TabCategory, TabsCategory } from 'components/Tabs'
import Books from '../../assets/icons/bookstab.svg'
import Videos from '../../assets/icons/videostab.svg'
import Art from '../../assets/icons/arttab.svg'
import Games from '../../assets/icons/gamestab.svg'
import All from '../../assets/icons/alltab.svg'
import Music from '../../assets/icons/musictab.svg'
import Images from '../../assets/icons/imagestab.svg'
import { useGetNFTs } from 'state/nfts/hooks'
import { useHistory } from 'react-router'
import { CATEGORIES, Dictionary } from './../../constants'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

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

const FullWidth = styled.div`
  width: 100%;
`

const TabsCategory = styled.div`
display: flex;
flex-flow: row nowrap;
justify-content: space-between;
margin: 4vh 0;
padding: 3vh 0;
border-bottom: 1px solid #EFEFEF;
`

interface TabProps {
  readonly selected: boolean;
};

const Tab = styled.div<TabProps>`
display: flex;
flex-flow: row nowrap;
align-items: center;
padding-bottom: 1vh;
cursor: pointer;
border-bottom: ${props => props.selected ? "2px solid #000000;" : 'none;'};
`
const Img = styled.img`
margin-right: 1vw;
`

const NFTsHeader: React.FC = () => {
  const history = useHistory()

  const { t } = useTranslation()

  const [search, setSearch] = useState('')

  const [category, setCategory] = useState('all')

  const getNFTs = useGetNFTs()

  return (
    <FullWidth>
      <Grid container direction="row" justify="space-between" alignItems="center">
        <img src={Logo} alt="Logo" onClick={() => history.push('/')} />
        <Grid>
          <InputSearch label={t('searchNFTS')} value={search} onChange={(e: any) => setSearch(e.target.value)} />
          <ButtonSearch onClick={() => getNFTs({ search })}>{t('search')}</ButtonSearch>
        </Grid>
        <Link onClick={() => history.push('whitelist')} underline="none">
          <img src={Heart} alt="Whitelist" />
        </Link>
        <LinkCreateNFT to="mintnft">{t('mintNFT')}</LinkCreateNFT>
        <Wallet />
      </Grid>
      <TabsCategory>
        {Categories.map(c=><Tab selected={category === c} onClick={()=>{
          setCategory(c)
          getNFTs({ category: c })
        }}>
          <Img src={TabIcons[c]} alt={c} />
          {t(c)}
        </Tab>)}
      </TabsCategory>
    </FullWidth>
  )
}

export default NFTsHeader
