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
//
import {
  useMint,
  useNftInfo,
  useGetTokenURI,
  useGetNftOwner,
  useNftBalance,
  useGetApproverAddress
} from 'hooks/startfiNft'
import { useTokenBalance, useTokneInfo, useTransfer } from 'hooks/startfiToken'
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
  /*Start NFT tests */
  const mint = useMint()
  const nftInfo = useNftInfo()
  const getTokenUri = useGetTokenURI()
  const getNftOwner = useGetNftOwner()
  const getNftBalance = useNftBalance()
  const getApproverAddress = useGetApproverAddress()
  /*End NFT tests */
  /*Start Token tests */
  const transfer = useTransfer()
  const getTokenInfo = useTokneInfo()
  const getTokenBalance = useTokenBalance()
  /*end Token tests */

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
          //==================NFT==================
          const mintTransaction = mint('0xe092b1fa25DF5786D151246E492Eed3d15EA4dAA', 'ipfsHash', true, '1', '10')
          console.log('x is', mintTransaction)
          const info = nftInfo()
          console.log('info', info)
          getTokenUri('001').then((result: any) => {
            console.log('nft uri', result)
          })
          getNftOwner('001').then((result: any) => {
            console.log('nft owner', result)
          })
          getNftBalance('0xe092b1fa25DF5786D151246E492Eed3d15EA4dAA').then((result: any) => {
            console.log('nft balance', result)
          })
          getApproverAddress('001').then((result: any) => {
            console.log('nft addrress', result)
          })
          //==================Token==================
          const transferTransaction = transfer('0xe092b1fa25DF5786D151246E492Eed3d15EA4dAA', '1')
          console.log('transferTransaction', transferTransaction)
          getTokenInfo().then(result => {
            console.log('token info', result)
          })
          getTokenBalance('0xe092b1fa25DF5786D151246E492Eed3d15EA4dAA').then((result: any) => {
            console.log('token balance', result)
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
