import React, { useState } from 'react'
import { useGetNFTs, useLoadNFTs, useLoadTime, useNFTs } from 'state/nfts/hooks'
import SelectIcon from '../assets/icons/select.svg'
import { styled, MenuItem, Box, Grid } from '@material-ui/core/'
import { DropDownSort } from 'components/DropDown'
import NTFCard from '../components/NFTcard/nftcard'
import { COLORS } from 'theme'
import { useHistory } from 'react-router'
import { useWhitelistNFT } from 'state/user/hooks'
import { NFT } from 'state/nfts/reducer'

const NFTS = styled(Grid)({
  padding: '0 5vw',
  width: '100%'
})

const Header = styled(Grid)({
  paddingBottom: '6vh'
})

const Results = styled(Box)({
  fontSize: '1rem',
  color: COLORS.black2
})

const SORTBY = ['With Bids', 'b']

const NFTs: React.FC = () => {
  const history = useHistory()

  const [sort, setSort] = useState(SORTBY[0])

  useLoadNFTs()

  const nfts = useNFTs()

  const loadtime = useLoadTime()

  const getNFTs = useGetNFTs()

  const whitelistNFT = useWhitelistNFT()

  return (
    <NFTS container direction="column">
      <Header container direction="row" justify="space-between" alignContent="space-between" alignItems="center">
        <Results>
          {nfts.length} results found in {loadtime}ms
        </Results>
        <DropDownSort
          disableUnderline
          onChange={(e: any) => {
            console.log(e.target.value)
            setSort(e.target.value)
            getNFTs({ sort: e.target.value })
          }}
          value={sort}
          defaultValue={SORTBY[0]}
          IconComponent={() => <img src={SelectIcon} alt="Sort by" />}
        >
          {SORTBY.map(o => (
            <MenuItem key={o} value={o}>
              {o}
            </MenuItem>
          ))}
        </DropDownSort>
      </Header>
      <Grid container direction="row" justify="space-between" spacing={10}>
        {nfts.map(nft => (
            <Grid key={nft.id} item>
              <NTFCard
                cardContent={nft}
                navigateToCard={(NFT: NFT)=>history.push('NFT', NFT)}
                addToWhiteList={(NFT: NFT)=>whitelistNFT(NFT)}
                placeBid={(NFT: NFT)=>history.push('NFT', NFT)}
              ></NTFCard>
            </Grid>
          ))}
      </Grid>
    </NFTS>
  )
}

export default NFTs
