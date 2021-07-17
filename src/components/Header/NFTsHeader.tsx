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
import { address as STARTFI_NFT_PAYMENT_ADDRESS } from '../../constants/abis/StartFiNFTPayment.json'
import { address as STARTFI_STAKES_ADDRESS } from '../../constants/abis/StartfiStakes.json'
import { address as STARTFI_NFT_ADDRESS } from '../../constants/abis/StartfiRoyaltyNFT.json'

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

import { useDeposit, useGetReserves } from 'hooks/startfiStakes'
import { useActiveWeb3React } from 'hooks'
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
  const depositTokenStakes = useDeposit()
  const getReserveStakes = useGetReserves()
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
          /* Beign example never merge to the main  branch*/
          //==================NFT PAYMENT==================
          const stfiToken = await getTokenInfo()
          console.log('stfi token is', stfiToken)
          const balance = await getTokenBalance(account as string)
          if (balance === '0x00') {
            new Error('User need some STFI token')
          }

          // check if user allowed the smart contract to spend token
          const allowedAmountOfToken = await getAllowance(account as string, STARTFI_NFT_PAYMENT_ADDRESS)
          if (allowedAmountOfToken === '0x00') {
            await approveToken(STARTFI_NFT_PAYMENT_ADDRESS, 9000000000)
          }
          // If you need to add more token
          await increaseAllowance(STARTFI_NFT_PAYMENT_ADDRESS, 3000000)
          // If you need to withdraw some
          await decreaseAllowance(STARTFI_NFT_PAYMENT_ADDRESS, 3000000)

          // mint nft using STFI Token
          const mintNftWithoutRoyaltyId = await mint(account as string, 'ipfsHash')
          const mintNftWithRoyaltyId = await mint(account as string, 'ipfsHash', 1, 10)
          const getPaymentInfo = await getNftPaymentInfo()
          console.log('minted nft without royalty with tokenId =', mintNftWithoutRoyaltyId)
          console.log('minted nft with royalty with tokenId =', mintNftWithRoyaltyId)
          console.log('all fees and payment info are', getPaymentInfo)
          console.log('Get the owner of the created NFT')
          const getOwnerOfNftWithIdZero = await getNftOwner(0)
          console.log('Owner of NFT with ID 0', getOwnerOfNftWithIdZero)
          const getOwnerOfNftWithIdOne = await getNftOwner(1)
          console.log('Owner of NFT with ID 1', getOwnerOfNftWithIdOne)

          console.log('check user how can use my nft token')
          const approver = await getApproverAddress(0) // return '0x0000000000000000000000000000000000000000' mean empty
          if (STARTFI_NFT_PAYMENT_ADDRESS !== approver) {
            approveNft(STARTFI_NFT_PAYMENT_ADDRESS, 0)
          }

          console.log('All NFT token Info')
          const infoNft = await nftInfo()
          const tokenUri = await getTokenUri(0)
          const nftBalance = await getNftBalance(account as string)
          const royaltyInfo = await getRoyaltyInfo(0, 10)
          console.log('NFT info', infoNft, tokenUri, nftBalance, royaltyInfo)
          //==================Staking==================
          const depositStake = await depositTokenStakes(account as string, '22')
          console.log('deposit stakes', depositStake)
          const stakeReserve = getReserveStakes(account as string)
          console.log('stakeReserve', stakeReserve)

          //==================Marketplace==================

          /***************************** adding to marketplace include the following steps
           *
           *  @dev
           * 1- if it's an list for sale " not auction", check users stakes if it's not enough, user has to stake. if it's auction skip this step
           * 2-allow marketplace to spend the NFT
           */

          // check to see how much stakes user has , user has to stake more to list on marketplace if his stakes is not enough
          const currentStakes = await getReserveStakes(account as string)
          console.log(currentStakes)
          const balance2 = await getTokenBalance(account as string)
          console.log(balance2, 'balance')
          console.log(`user stakes is ********${currentStakes}******`)
          //=================================if user has to stake more token, follow these steps ==========================

          //  check if user allowed the smart contract to spend token
          const allowedAmountOfStakedToken = await getAllowance(account as string, STARTFI_STAKES_ADDRESS)
          console.log(' staking contract is allowed to transfer', allowedAmountOfStakedToken)

          if (allowedAmountOfStakedToken === '0x00') {
            await approveToken(STARTFI_STAKES_ADDRESS, 9000000000)
            console.log('deposit some token for staking, you need to stack token for Listing nft to marketplace')
            const deposit = await depositTokenStakes(account as string, 1000)
            console.log('deposit', deposit)
          } else {
            console.log('deposit some token for staking, you need to stack token for Listing nft to marketplace')
            const deposit = await depositTokenStakes(account as string, 1000)
            console.log('deposit', deposit)
          }

          /***************************** end ******************************************* */

          /*****************************2 let marketplace contract to transfer user NFT ******************************************* */
          /**@dev if the returned address is not the  STARTFI_MARKET_PLACE_ADDRESS, that  means it is not approved to spend the NFT token*/
          const approverFirst = await getApproverAddress(11)
          console.log('approver', approverFirst)
          if (STARTFI_MARKET_PLACE_ADDRESS !== approverFirst) {
            await approveNft(STARTFI_MARKET_PLACE_ADDRESS, 11)
          }
          const approverSecond = await getApproverAddress(12) // return '0x0000000000000000000000000000000000000000' mean empty
          console.log('approver', approverSecond)
          if (STARTFI_MARKET_PLACE_ADDRESS !== approverSecond) {
            await approveNft(STARTFI_MARKET_PLACE_ADDRESS, 12)
          }
          const approverThird = await getApproverAddress(13) // return '0x0000000000000000000000000000000000000000' mean empty
          console.log('approver', approverThird)
          if (STARTFI_MARKET_PLACE_ADDRESS !== approverThird) {
            await approveNft(STARTFI_MARKET_PLACE_ADDRESS, 14)
          }
          const approverFourth = await getApproverAddress(15) // return '0x0000000000000000000000000000000000000000' mean empty
          console.log('approver', approverFourth)
          if (STARTFI_MARKET_PLACE_ADDRESS !== approverFourth) {
            await approveNft(STARTFI_MARKET_PLACE_ADDRESS, 15)
          }

          const listOnMarketplaceFirst = await listMarketplace(STARTFI_NFT_ADDRESS, 18, 123)
          const listOnMarketplaceSecond = await listMarketplace(STARTFI_NFT_ADDRESS, 19, 123)

          console.log('listed item to the marketplace', listOnMarketplaceFirst)
          console.log('listed item to the marketplace', listOnMarketplaceSecond)

          const auction = await createAuction(STARTFI_NFT_ADDRESS, 20, 11, 111, true, 100, 100000)

          console.log('auction', auction)
          /******************** user wants to bid on auction********************************* */
          /** @dev
           * on bidding , user has to stake first and his stake be >= the required qualify amount so as developer you need to check the auction required qualify amount and get user stakes to check if it matches the condition, let him bid
           *
           */
          const bidOnFirstItem = await bid(listOnMarketplaceFirst[0]?.value, 1220) // the listing id
          console.log('bid on item', bidOnFirstItem)
          /**@dev
           *  this transaction will revert, so as a dev you need to check in the front-end to get the latest bid as well as the listing price, if the latest bid is more than 0, make sure that the user doesn't add price less than the last bid else , the bid should be more than the listing price
           *
           */

          const bidOnSecondItem = await bid(listOnMarketplaceSecond[0]?.value, 1220) // will not fullfil that bid
          console.log('bid on item', bidOnSecondItem)
          // if the caller is not the winner( highest bid and auction is ended), it will revert
          /** @dev : check that the caller is the winner for better user experience */

          const fullfilBidOnItem = await fullfilBid(listOnMarketplaceFirst[0]?.value) // or bidOnFirstItem[0].value
          console.log('fullfil bid on item', fullfilBidOnItem)

          console.log('auction,marketplace and user info')
          const userReserved = await getuserReserved(account as string)
          console.log('user', userReserved)
          const listingDetails = await getListingDetails(listOnMarketplaceSecond[0]?.value)
          console.log('listingDetails', listingDetails)
          const auctionDetails = await getAuctionBidDetails(listOnMarketplaceFirst[0]?.value, account as string)
          console.log('auctionDetails', auctionDetails)
          const bidWinner = await winnerBid(listOnMarketplaceFirst[0]?.value)
          console.log('bid winner', bidWinner)
          const freeReserve = await freeReserves()
          console.log('freeReserve', freeReserve)

          console.log("if user didn't fullfil a bid")
          const disputeAuctionOnBider = await disputeAuction(listOnMarketplaceSecond[0]?.value)
          console.log('dispute auction on bider', disputeAuctionOnBider)

          console.log('remove item from marketplace')
          const delistNft = await delist(listOnMarketplaceSecond[0]?.value)
          console.log('delist item from marketplace', delistNft)

          console.log('Buy item')
          const buyNft = buyNow(listOnMarketplaceFirst[0]?.value, 1)
          console.log('buy now', buyNft)

          const marketPlaceServiceFee = await serviceFee()
          console.log('marketPlaceServiceFee', marketPlaceServiceFee)
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
