import React, { useState } from 'react'

import { DropDownSort } from 'components/DropDown'
import NTFCard from '../components/NFTcard/nftcard'
import { useHistory } from 'react-router'

import { useGetInventory } from 'state/user/hooks'
// import NFTsHeader from 'components/Header/NFTsHeader'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { useGetNFTs, useLoadTime, useMarketplace } from 'state/marketplace/hooks'
import { Row } from 'theme/components'
import { LinkBase } from '../components/Link/index'
import { AuctionNFT } from 'services/models/AuctionNFT'
import { LinkBase } from 'components/Link'

// const NFTS = styled.div`
//   padding: 4vh 3.2vw;
//   width: 100%;
//   z-index: 1;
// `

const Header = styled(Row)`
  padding-bottom: 6vh;
`

const Results = styled.div`
  color: #2c2c2c;
`

const NFTList = styled(Row)`
  justify-content: space-evenly;
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
  const history = useHistory()

  const [sort, setSort] = useState(SORTBY[0])

  const { t } = useTranslation()

  const onMarket = useMarketplace()

  const loadtime = useLoadTime()

  const getNFTs = useGetNFTs()

  return (
    <Padding>
      <Header>

        <Results>
          {onMarket.length} {t('NFTSResults')} {loadtime}ms
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

       <LinkBase to='/marketplace/wishList'>
        Wish List
      </LinkBase>

      {onMarket.length > 0 ? <NFTList>
        {onMarket.map((auctionNFT: AuctionNFT) => (
          <Nft key={auctionNFT.nft.id}>
            <NTFCard
              auctionNFT={auctionNFT}
              navigateToCard={(auctionNFT: AuctionNFT) =>
                history.push(`/marketplace/nft/${auctionNFT.nft.id}/${auctionNFT.auction.id}`)
              }
              placeBid={(auctionNFT: AuctionNFT) =>
                history.push(`/marketplace/nft/${auctionNFT.nft.id}/${auctionNFT.auction.id}`)
              }
            ></NTFCard>
          </Nft>
        ))}
      </NFTList> :

    </Padding>
  )
}

export default NFTs
