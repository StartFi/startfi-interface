import React, { useState } from 'react'
import { useGetNFTs, useLoadNFTs, useLoadTime, useNFTs ,
  // useAddNFT
} from 'state/nfts/hooks'
import { styled, Box, Grid } from '@material-ui/core/'
import { DropDownSort } from 'components/DropDown'
import NTFCard from '../components/NFTcard/nftcard'
import { COLORS } from 'theme'
import { useHistory } from 'react-router'
import {useWhitelistNFT} from 'state/user/hooks'
import { NFT } from 'state/nfts/reducer'
import NFTsHeader from 'components/Header/NFTsHeader'





const NFTS = styled(Grid)({
  padding: '4vh 3.2vw',
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
    <NFTS container direction='column'>
      <NFTsHeader />
      <Header container direction='row' justify='space-between' alignContent='space-between' alignItems='center'>
        <Results>
          {nfts.length} results found in {loadtime}ms
        </Results>
        <DropDownSort
          boxshadow
          name='sort'
          options={SORTBY}
          value={sort}
          onChange={(e: any) => {
            console.log(e.target.value)
            setSort(e.target.value)
            getNFTs({ sort: e.target.value })
          }}
        />
      </Header>
      <Grid container direction='row' justify='space-between' spacing={10}>
        {nfts.map(nft => (
          <Grid key={nft.id} item>
            <NTFCard
              cardContent={nft}
              navigateToCard={(Nft: NFT) => history.push('NFT', Nft)}
              addToWhiteList={(Nft: NFT) => whitelistNFT(Nft)}
              placeBid={(Nft: NFT) => history.push('NFT', Nft)}
            ></NTFCard>
          </Grid>
        ))}
      </Grid>
    </NFTS>
  )
}

export default NFTs
