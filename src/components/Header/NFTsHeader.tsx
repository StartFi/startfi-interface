/* eslint-disable @typescript-eslint/camelcase */
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
/* Begin example never merge to the main  branch*/
import { address as STARTFI_MARKET_PLACE_ADDRESS } from '../../constants/abis/StartFiMarketPlace.json'
import { address as STARTFI_STAKES_ADDRESS } from '../../constants/abis/StartfiStakes.json'
import { address as STARTFI_NFT_ADDRESS } from '../../constants/abis/StartfiRoyaltyNFT.json'
import { address as STARTFI_NFT_PAYMENT_ADDRESS } from '../../constants/abis/StartFiNFTPayment.json'
import {
  useMint,
  useNftInfo,
  useGetTokenURI,
  useGetNftOwner,
  useNftBalance,
  useGetApproverAddress,
  useRoyaltyInfo,
  useApproveNft,
  useChangeFeesNftPayment,
  useChangeNftContractNftPayment,
  useNftPaymentInfo,
  useGrantRoleNft
} from 'hooks/startfiNft'
import {
  useTokenBalance,
  useTokenInfo,
  useTransfer,
  useApproveToken,
  useGetAllowance,
  useIncreaseAllowance,
  useDecreaseAllowance
} from 'hooks/startfiToken'
import {
  useBid,
  useBuyNow,
  useCreateAuction,
  useDeList,
  useDisputeAuction,
  useFreeReserves,
  useFullfilBid,
  useGetAuctionBidDetails,
  useGetListingDetails,
  useGetServiceFee,
  useGetUserReserved,
  useListOnMarketplace,
  useWinnerBid
} from 'hooks/startfiMarketPlace'

import { useActiveWeb3React } from 'hooks'
import { useDeposit, useGetReserves } from 'hooks/startfiStakes'
import { useNftPaymentEventListener } from 'hooks/startfiEventListener'
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
  useNftPaymentEventListener()
  const history = useHistory()
  /* Beign example never merge to the main  branch*/
  const { account } = useActiveWeb3React() // get user address from metamask wallet
  /*Start Token tests */
  const transfer = useTransfer()
  const getTokenInfo = useTokenInfo()
  const getTokenBalance = useTokenBalance()
  const approveToken = useApproveToken()
  const getAllowance = useGetAllowance()
  const increaseAllowance = useIncreaseAllowance()
  const decreaseAllowance = useDecreaseAllowance()
  /*end Token tests */
  /*Start NFT tests */
  const approveNft = useApproveNft()
  const mint = useMint()
  const nftInfo = useNftInfo()
  const getTokenUri = useGetTokenURI()
  const getNftOwner = useGetNftOwner()
  const getNftBalance = useNftBalance()
  const getApproverAddress = useGetApproverAddress()
  const getRoyaltyInfo = useRoyaltyInfo()
  const changeFees = useChangeFeesNftPayment()
  const changeNftContract = useChangeNftContractNftPayment()
  const getNftPaymentInfo = useNftPaymentInfo()
  const grantRole = useGrantRoleNft()
  const changePaymentContract = useChangeNftContractNftPayment()
  /*End NFT tests */

  /*end Token tests */
  /*Start Marketplace tests */
  const listMarketplace = useListOnMarketplace()
  const createAuction = useCreateAuction()
  const bid = useBid()
  const fullfilBid = useFullfilBid()
  const delist = useDeList()
  const buyNow = useBuyNow()
  const disputeAuction = useDisputeAuction()
  const freeReserves = useFreeReserves()
  const winnerBid = useWinnerBid()
  const serviceFee = useGetServiceFee()
  const getuserReserved = useGetUserReserved()
  const getListingDetails = useGetListingDetails()
  const getAuctionBidDetails = useGetAuctionBidDetails()

  /*End Marketplace tests */
  /*Start Staking tests */
  const depositStfiToken = useDeposit()
  const getReserves = useGetReserves()
  /*End Staking tests */

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
        onChange={async (e, category) => {
          /* const approve = await approveToken(STARTFI_NFT_PAYMENT_ADDRESS, 120000000)
          console.log('approve', approve) */
          //const noRoyalyt = await mint(account as string, 'ipfsHash')
          const royalty = await mint(account as string, 'ipfsHash', 1, 10)
          //console.log('noRoyalyt', noRoyalyt)
          console.log('royalty hnna', royalty)

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
