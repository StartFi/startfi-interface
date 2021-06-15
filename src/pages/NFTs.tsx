import React, { useEffect, useState } from 'react'
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
import { useUserDoc, useUserError, useWishListAddingSuccess, useWishListLoading } from 'state/user/hooks'
import { NFT } from 'state/nfts/reducer'
import NFTsHeader from 'components/Header/NFTsHeader'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { clearError, clearSuccess, getUserDocs, updateUserWishList } from 'state/user/actions'
import ErrorDialogue from 'components/Error'
import SuccessDialogue from 'components/Success'
import Modal from 'components/Modal'
import Loader from 'components/Loader'

const LoadingDiv = styled('div')<{ $display?: boolean }>`
  position: fixed;
  left: 50%;
  top: 50%;
  z-index: 100;

  display: ${({ $display }) => ($display ? 'block' : 'none')};
  opacity: 1;
`
const NFTS = styled.div`
  padding: 4vh 3.2vw;
  width: 100%;
  z-index: 1;
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
  const [loading, setIsLoading] = useState(false)
  // const [wishListItem, setWhishListItem] = useState(false)
  const [open, setOpen] = useState(false)

  useLoadNFTs()
  const { t } = useTranslation()

  const nfts = useNFTs()

  const loadtime = useLoadTime()

  const getNFTs = useGetNFTs()

  const userId = useUserDoc()?.ethAddress

  const error = useUserError()

  // adding wishList Item
  const wishListAdding = useWishListLoading()
  // wishList Item adding success
  const wishListAddingSuccess = useWishListAddingSuccess()
  useEffect(() => {
    error?.hasError || wishListAddingSuccess?.success ? setOpen(true) : setOpen(false)
    setIsLoading(wishListAdding)

    dispatch(getUserDocs(userId))
  }, [wishListAdding, wishListAddingSuccess, error])
  // add Nft Id Tto user white list
  const addToWishList = (nftId: number, accountId: any) => {
    let payLoad = {
      accountId,
      nftId
    }
    dispatch(updateUserWishList(payLoad))
  }

  // clear error state + close Error dialogue
  const onDismiss = () => {
    if (error) {
      dispatch(clearError())
    }
    if (wishListAddingSuccess && wishListAddingSuccess.success) {
      dispatch(clearSuccess())
    }
  }

  // clear any dialogue if user leave the page with out closing
  setTimeout(() => {
    onDismiss()
  }, 1500)

  let dialogue
  if (error) {
    dialogue = <ErrorDialogue message={error?.message} />
  }

  if (wishListAddingSuccess?.success) {
    dialogue = <SuccessDialogue dismiss={onDismiss} message={wishListAddingSuccess?.message} />
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
            name='sort'
            options={SORTBY}
            value={sort}
            onChange={(e: any) => {
              setSort(e.target.value)
              getNFTs({ sort: e.target.value })
            }}
          />
        </Header>

        <Modal isOpen={open} onDismiss={onDismiss} maxHeight={150}>
          {dialogue}
        </Modal>
        <NFTList>
          <LoadingDiv $display={loading}>
            <Loader size='40px'></Loader>
          </LoadingDiv>
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
