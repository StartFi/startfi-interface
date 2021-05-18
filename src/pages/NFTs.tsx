import React, { useState } from 'react'
import { useGetNFTs, useLoadNFTs, useLoadTime, useNFTs } from 'state/nfts/hooks'
import SelectIcon from '../assets/icons/select.svg'
import { styled, MenuItem, Box, Grid } from '@material-ui/core/'
import { DropDownSort } from 'components/DropDown'
import NTFCard from '../components/NFTcard/nftcard'
import { NFT } from 'state/nfts/reducer'

const NFTS = styled(Grid)({
  padding: '0 5vw'
})

const Header = styled(Grid)({
  paddingBottom: '6vh'
})

const Results = styled(Box)({
  fontSize: '16px',
  color: '#2C2C2C'
})

const SORTBY = ['With Bids', 'b']

const navigateToCard = (card: NFT) => {
  console.log(card)
}

const NFTs: React.FC = () => {
  const [sort, setSort] = useState(SORTBY[0])

  useLoadNFTs()

  const nfts = useNFTs()

  const loadtime = useLoadTime()

  const getNFTs = useGetNFTs()

  return (
    <NFTS container direction="column">
      <Header container direction="row" justify="space-between">
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
      <Grid container spacing={10}>
        {nfts.map(nft => (
          <Grid key={nft.id} item xs={4}>
            <NTFCard
              cardContent={nft}
              navigateToCard={navigateToCard}
              addToWhiteList={navigateToCard}
              placeBid={navigateToCard}
            ></NTFCard>
          </Grid>
        ))}
      </Grid>
    </NFTS>
  )
}

export default NFTs
