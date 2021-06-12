import React, { useState } from 'react'
import {
  useGetNFTs,
  useLoadNFTs,
  useLoadTime,
  useNFTs
  // useAddNFT
} from 'state/nfts/hooks'
import { DropDownSort } from 'components/DropDown'
import NTFCard from '../components/NFTcard/nftcard'
import { useHistory } from 'react-router'
import { useUserDoc,} from 'state/user/hooks'
import { NFT } from 'state/nfts/reducer'
import NFTsHeader from 'components/Header/NFTsHeader'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { updateUserWishList } from 'state/user/actions'

const NFTS = styled.div`
  padding: 4vh 3.2vw;
  width: 100%;
`

const Header = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 6vh;
`

const Results = styled.div`
  color: #2c2c2c;
`

const NFTList = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
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

  const dispatch = useDispatch()

  const [sort, setSort] = useState(SORTBY[0])

  useLoadNFTs()
  const {t}=useTranslation()

  const nfts = useNFTs()

  const loadtime = useLoadTime()

  const getNFTs = useGetNFTs()


  const userId = useUserDoc()?.ehAddress


  // add Nft Id Tto user white list
  const addToWishList = ( nftId:number, accountId: any) => {
   
    let payLoad = {
      accountId,
      nftId
    }
    dispatch(updateUserWishList(payLoad))
  }

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
            name="sort"
            options={SORTBY}
            value={sort}
            onChange={(e: any) => {
              setSort(e.target.value)
              getNFTs({ sort: e.target.value })
            }}
          />
        </Header>
        <NFTList>
          {nfts.map(nft => (
            <Nft key={nft.id}>
              <NTFCard
                cardContent={nft}
                navigateToCard={(Nft: NFT) => history.push(`NFT/${Nft.id}`)}
                addToWishList={(Nft: NFT) => addToWishList(Nft.id, userId)}
                placeBid={(Nft: NFT) => history.push('NFT', Nft)}
              ></NTFCard>
            </Nft>
          ))}
        </NFTList>
      </Padding>
    </NFTS>
  )
}

export default NFTs
