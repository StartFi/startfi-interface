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
import { address as STARTFI_NFT_PAYMENT_ADDRESS } from '../../constants/abis/StartFiNFTPayment.json'
import { address as STARTFI_NFT_ADDRESS } from '../../constants/abis/StartfiRoyaltyNFT.json'
import { useDeposit, useGetReserves } from 'hooks/startfiStakes'
import { useActiveWeb3React } from 'hooks'
/* End example never merge to the main  branch*/

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
  /* Begin example never merge to the main  branch*/
  const { account } = useActiveWeb3React() // get user address from metamask wallet
  /*Start NFT tests */
  const mint = useMint()
  const nftInfo = useNftInfo()
  const getTokenUri = useGetTokenURI()
  const getNftOwner = useGetNftOwner()
  const getNftBalance = useNftBalance()
  const getApproverAddress = useGetApproverAddress()
  const getRoyaltyInfo = useRoyaltyInfo()
  const approveNft = useApproveNft()
  const changeFees = useChangeFeesNftPayment()
  const changeNftContract = useChangeNftContractNftPayment()
  const getNftPaymentInfo = useNftPaymentInfo()
  const grantRole = useGrantRoleNft()
  const changePaymentContract = useChangeNftContractNftPayment()
  /* Beign example never merge to the main  branch*/
  /*Start Stakes tests */
  const depositStakes = useDeposit()
  const getReserveStakes = useGetReserves()
  /*end Stakes tests */
  /*Start Marketplace tests */

  /*End NFT tests */
  /*Start Token tests */
  const transfer = useTransfer()
  const getTokenInfo = useTokenInfo()
  const getTokenBalance = useTokenBalance()
  const approveToken = useApproveToken()
  const getAllowance = useGetAllowance()
  const increaseAllowance = useIncreaseAllowance()
  const decreaseAllowance = useDecreaseAllowance()
  /*end Token tests */
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
          /* Begin example never merge to the main  branch*/
          //==================Token==================
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
          /*=======================Stakes=======================*/
          const depositToken = await depositStakes(account as string, '22')
          console.log('Deposit stakes', depositToken)

          const getReserve = await getReserveStakes(account as string)
          console.log('get reserves', getReserve)

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
