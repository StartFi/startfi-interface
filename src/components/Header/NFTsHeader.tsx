import React, { useState } from 'react'
import Wallet from 'components/Wallet'
import Logo from '../../assets/icons/logo.svg'
import Heart from '../../assets/icons/heart.svg'
import { ButtonSearch } from 'components/Button'
import { LinkCreateNFT } from 'components/Link'
import { InputSearch } from 'components/Input'
import { Box, Grid, Link, makeStyles, styled } from '@material-ui/core'
import { CategoryTab, CategoryTabs } from 'components/Tabs'
import Books from '../../assets/icons/bookstab.svg'
import Videos from '../../assets/icons/videostab.svg'
import Art from '../../assets/icons/arttab.svg'
import Games from '../../assets/icons/gamestab.svg'
import All from '../../assets/icons/alltab.svg'
import Music from '../../assets/icons/musictab.svg'
import Images from '../../assets/icons/imagestab.svg'
import { useGetNFTs } from 'state/nfts/hooks'

const CATEGORIES = ['All', 'Music', 'Books', 'Videos', 'Art', 'Images', 'Games']

const useStyles = makeStyles({
  textfield: {
    backgroundColor: '#FFFFFF',
    height: '6vh'
  },
  placeholder: {
    fontSize: '14px',
    color: '#AFAFAF'
  }
})

type Dictionary = { [index: string]: string }

const TabIcons: Dictionary = {
  Books: Books,
  Videos: Videos,
  Art: Art,
  Games: Games,
  All: All,
  Music: Music,
  Images: Images
}

const FullWidth = styled(Box)({
  width: '100%'
})

const NFTsHeader: React.FC = () => {
  const [search, setSearch] = useState('')

  const [category, setCategory] = useState(0)

  const getNFTs = useGetNFTs()

  const classes = useStyles()

  return (
    <FullWidth>
      <Grid container direction="row" justify="space-between" alignItems="center">
        <img src={Logo} alt="Logo"/>
        <Grid>
          <InputSearch
            value={search}
            onChange={e => setSearch(e.target.value)}
            label="what are you looking for?"
            variant="filled"
            InputProps={{
              className: classes.textfield,
              disableUnderline: true
            }}
            InputLabelProps={{ className: classes.placeholder }}
          />
          <ButtonSearch onClick={() => getNFTs({ search })}>Search</ButtonSearch>
        </Grid>
        <Link href="#" onClick={() => {}} underline="none">
          <img src={Heart} alt="Whitelist" />
        </Link>
        <LinkCreateNFT href="#" onClick={() => {}} underline="none">
          Create NFT
        </LinkCreateNFT>
        <Wallet />
      </Grid>
      <CategoryTabs
        value={category}
        onChange={(e, category) => {
          setCategory(category)
          getNFTs({ category: CATEGORIES[category] })
        }}
      >
        {CATEGORIES.map(category => (
          <CategoryTab
            key={category}
            label={
              <Grid container direction="row" justify="center" alignItems="center">
                <img src={TabIcons[category]} style={{ marginRight: '1vw' }} alt={category}/>
                {category}
              </Grid>
            }
          />
        ))}
      </CategoryTabs>
    </FullWidth>
  )
}

export default NFTsHeader
