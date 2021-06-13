import React, { useState } from 'react'
import Wallet from 'components/Wallet'
import Logo from '../../assets/icons/logo.svg'
import Heart from '../../assets/icons/heart.svg'
import { ButtonSearch } from 'components/Button'
import { LinkCreateNFT } from 'components/Link'
import { InputSearch } from 'components/Input'
import { Box, Grid, Link, styled } from '@material-ui/core'
import { TabCategory, TabsCategory } from 'components/Tabs'
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
/* Beign example never merge to the main  branch*/
import { useStartFiContract } from 'services/Blockchain/useStartfiContracts'
import { useMint } from 'hooks/startfiNft'
import { evaluateTransaction } from 'services/Blockchain/useEvaluateTransaction'
/* End example never merge to the main  branch*/

const Categories = ['All', ...CATEGORIES]

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
  const history = useHistory()
  /* Beign example never merge to the main  branch*/
  const mint = useMint()
  const { account, library, contract: nftContract } = useStartFiContract('nftRoyality')
  const { contract: tokenContract } = useStartFiContract('token', false)
  /* End example never merge to the main  branch*/

  const [search, setSearch] = useState('')
  const [category, setCategory] = useState(0)
  const getNFTs = useGetNFTs()
  return (
    <FullWidth>
      <Grid container direction="row" justify="space-between" alignItems="center">
        <img src={Logo} alt="Logo" onClick={() => history.push('/')} />
        <Grid>
          <InputSearch value={search} onChange={(e: any) => setSearch(e.target.value)} />
          <ButtonSearch onClick={() => getNFTs({ search })}>Search</ButtonSearch>
        </Grid>
        <Link onClick={() => history.push('whitelist')} underline="none">
          <img src={Heart} alt="Whitelist" />
        </Link>
        <LinkCreateNFT to="mintnft">Start Earning</LinkCreateNFT>
        <Wallet />
      </Grid>
      <TabsCategory
        value={category}
        onChange={(e, category) => {
          /* Beign example never merge to the main  branch*/
          mint(account as string, 'ipfsHash', nftContract, account as string, library, true, '1', '10')
          evaluateTransaction(tokenContract, 'balanceOf', ['0xe092b1fa25DF5786D151246E492Eed3d15EA4dAA']).then(r => {
            console.log('result is', r)
          })
          /* End example never merge to the main  branch*/

          getNFTs({ category: Categories[category] })
          setCategory(category)
        }}
      >
        {Categories.map(category => (
          <TabCategory
            key={category}
            label={
              <Grid container direction="row" justify="center" alignItems="center">
                <img src={TabIcons[category]} style={{ marginRight: '1vw' }} alt={category} />
                {category}
              </Grid>
            }
          />
        ))}
      </TabsCategory>
    </FullWidth>
  )
}

export default NFTsHeader
