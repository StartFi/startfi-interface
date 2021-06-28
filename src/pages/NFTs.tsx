import React, { useEffect, useState } from 'react'
import { DropDownSort } from 'components/DropDown'
import NTFCard from '../components/NFTcard/nftcard'
import { useHistory } from 'react-router'

import { useGetInventory} from 'state/user/hooks'


import NFTsHeader from 'components/Header/NFTsHeader'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { NFT } from 'services/models/NFT'
import { useAuctionNFT, useGetAuctionNFT, useGetNFTs, useLoadNFTs, useLoadTime, useNFTs } from 'state/marketplace/hooks'
import { Row } from 'theme/components'
import { LinkBase } from '../components/Link/index'



const NFTS = styled.div`
  padding: 4vh 3.2vw;
  width: 100%;
  z-index: 1;
`

const Header = styled(Row)`
  padding-bottom: 6vh;
`

const Results = styled.div`
  color: #2c2c2c;
`

const NFTList = styled(Row)`
  flex-wrap: wrap;
 
`

const Nft = styled.div`
  margin-bottom: 8vh;
`

const Padding = styled.div`
  padding: 0 2vw;
`

const SORTBY = ['With Bids', 'Lowest price', 'Highest price']

const NFTs: React.FC = () => {
  useLoadNFTs()

  const history = useHistory()

  const [sort, setSort] = useState(SORTBY[0])

  const { t } = useTranslation()

  const nfts = useNFTs()

  const loadtime = useLoadTime()

  const getNFTs = useGetNFTs()

  const getAuctionNFT = useGetAuctionNFT()

  const auctionNFT = useAuctionNFT()

  useEffect(()=>{
    if (auctionNFT) history.push('/nft')
  },[auctionNFT, history])



  return (
    <NFTS>
      <NFTsHeader />
      <Padding>
        <Header>
          <Results>
            {nfts.length} {t('NFTSResults')} {loadtime}ms
          </Results>
          <DropDownSort
            boxshadow
            name='sort'
            options={SORTBY}
            value={sort}
            onChange={(e: any) => {
              setSort(e.target.value)
              getNFTs({ sort: e.target.value })
            }}
          />
        </Header>
        <LinkBase to='/inventory' onClick={useGetInventory()}>
          Inventory
        </LinkBase>
        <NFTList>
          {nfts.map((nft: NFT) => (
            <Nft key={nft.id}>
              <NTFCard
                cardContent={nft}
                navigateToCard={(Nft: NFT) => getAuctionNFT(Nft)}
                placeBid={(Nft: NFT) => getAuctionNFT(Nft)}
              ></NTFCard>
            </Nft>
          ))}
        </NFTList>
      </Padding>
    </NFTS>
  )
}

export default NFTs
