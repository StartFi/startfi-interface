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
  useGetApproverAddress,
  useRoyaltyInfo,
  useApproveNft,
  useChangeFeesNftPayment,
  useChangeTokenContractNftPayment,
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
  const getRoyalityInfo = useRoyaltyInfo()
  const approveNft = useApproveNft()
  const changeFees = useChangeFeesNftPayment()
  const changeNftContract = useChangeNftContractNftPayment()
  const changeTokenContract = useChangeTokenContractNftPayment()
  const getNftPaymentInfo = useNftPaymentInfo()
  const grantRole = useGrantRoleNft()

  /*End NFT tests */
  /*Start Token tests */
  const transfer = useTransfer()
  const getTokenInfo = useTokenInfo()
  const getTokenBalance = useTokenBalance()
  const approveToken = useApproveToken()
  const getAllowance = useGetAllowance()
  const increaseAllowance = useIncreaseAllowance()
  const decreaeAllowance = useDecreaseAllowance()
  //useTransferLogs()
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

  /*end Marketplace tests */

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
          approveToken('marketplace', '9000000000').then((result: any) => {
            console.log('approve token', result)
          })
          increaseAllowance('payment', '3000000').then((result: any) => {
            console.log('increase token allowance', result)
          })
          getAllowance('0xe092b1fa25DF5786D151246E492Eed3d15EA4dAA', '0x5Dcb54E7F22E8f46d2026FE080f74426D5841c08').then(
            (result: any) => {
              console.log('get token allowance', result)
            }
          )
          getNftPaymentInfo().then((result: any) => {
            console.log('nft paymentinfo', result)
          })

          mint('0xe092b1fa25DF5786D151246E492Eed3d15EA4dAA', 'ipfsHash').then(mintTransaction => {
            console.log('mint without royality', mintTransaction)
          })
          mint('0xe092b1fa25DF5786D151246E492Eed3d15EA4dAA', 'ipfsHash', '1', '10').then(mintTransaction => {
            console.log('mint with royality', mintTransaction)
          })

          getAllowance('0xe092b1fa25DF5786D151246E492Eed3d15EA4dAA', '0x24f9F55D4A20f94bA04c709A257c790fd1327b94').then(
            (result: any) => {
              console.log('get token allowance', result)
            }
          )
          getTokenBalance('0xe092b1fa25DF5786D151246E492Eed3d15EA4dAA').then((result: any) => {
            console.log('token balance', result)
          })

          approveNft('marketplace', '001').then((result: any) => {
            console.log('approve nft', result)
          })

          changeFees('0').then((result: any) => {
            console.log('change fees', result)
          })

          changeNftContract('0x1697c0505d48B21a0Ce519BBafCfC42cEc4eFAEC').then((result: any) => {
            console.log('change NFT', result)
          })
          changeTokenContract('0x2f0378Ca5fcCEF61cD4A71a21982E9C91D3aFEBE').then((result: any) => {
            console.log('changes token', result)
          })
          getNftPaymentInfo().then((result: any) => {
            console.log('nft paymentinfo', result)
          })

          nftInfo().then(info => {
            console.log('info', info)
          })
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
          getRoyalityInfo('001', '1').then((result: any) => {
            console.log('royality info', result)
          })
          approveNft('0xAE28A0663785F20f43dAa79599110560C8dEfb19', '001').then((result: any) => {
            console.log('approve nft', result)
          })
          //==================Token==================
          transfer('0xe092b1fa25DF5786D151246E492Eed3d15EA4dAA', '1').then(transferTransaction => {
            console.log('transferTransaction', transferTransaction)
          })
          getTokenInfo().then(result => {
            console.log('token info', result)
          })
          getTokenBalance('0xe092b1fa25DF5786D151246E492Eed3d15EA4dAA').then((result: any) => {
            console.log('token balance', result)
          })
          approveToken('0xe092b1fa25DF5786D151246E492Eed3d15EA4dAA', '001').then((result: any) => {
            console.log('approve token', result)
          })
          getAllowance('0xe092b1fa25DF5786D151246E492Eed3d15EA4dAA', '0xe092b1fa25DF5786D151246E492Eed3d15EA4dAA').then(
            (result: any) => {
              console.log('get token allowance', result)
            }
          )
          decreaeAllowance('payment', '0xe092b1fa25DF5786D151246E492Eed3d15EA4dAA').then((result: any) => {
            console.log('decrease token allowance', result)
          })
          /* End example never merge to the main  branch*/
          /*=======================MARKETPLACE=======================*/
          listMarketplace('0x5364640aDAfe4266c29816733BD8E926DF8F9cF2', '001', '1').then((result: any) => {
            console.log('listMarketplace', result)
          })
          createAuction(
            '0x5364640aDAfe4266c29816733BD8E926DF8F9cF2',
            '001',
            '1',
            '1',
            'true',
            '1',
            '10000000000000'
          ).then((result: any) => {
            console.log('createAuction', result)
          })
          bid('001', '0xFc2c66E1b6151D4282A94f17847f2aE1702A0785', '001', '1').then((result: any) => {
            console.log('create Bid', result)
          })
          fullfilBid('001').then((result: any) => {
            console.log('fullfilBid', result)
          })
          delist('001').then((result: any) => {
            console.log('delist', result)
          })
          buyNow('0xe092b1fa25DF5786D151246E492Eed3d15EA4dAA', '1').then((result: any) => {
            console.log('buy now', result)
          })
          disputeAuction('1').then((result: any) => {
            console.log('disputeAuction', result)
          })
          freeReserves('1').then((result: any) => {
            console.log('freeReserves', result)
          })
          winnerBid('001').then((result: any) => {
            console.log('winner bid', result)
          })
          serviceFee().then((result: any) => {
            console.log('service fee', result)
          })
          getuserReserved('0xe092b1fa25DF5786D151246E492Eed3d15EA4dAA').then((result: any) => {
            console.log('user reserved', result)
          })
          getListingDetails('0xe092b1fa25DF5786D151246E492Eed3d15EA4dAA').then((result: any) => {
            console.log('getListingDetails', result)
          })
          getAuctionBidDetails('001', '0xe092b1fa25DF5786D151246E492Eed3d15EA4dAA').then((result: any) => {
            console.log('getAuctionBidDetails', result)
          })

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
