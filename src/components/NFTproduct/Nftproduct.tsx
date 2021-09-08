import React, { useState } from 'react'
import {
  Grid,
  LeftGrid,
  RightGrid,
  ImgCard,
  LeftTextCard,
  CreatedTitle,
  CreatedText,
  RightTitle,
  BuyCard,
  PlaceBid,
  BuyButtons,
  LastBiddingContainer,
  BuyNow,
  DescriptionCard,
  DescriptionTitle,
  DescriptionText,
  OwnerText,
  NoStakes,
  GetNow,
  Name,
  Stakes,
  TagContainer,
  TimerContainer,
  PublisherCard
} from './Nftproduct.styles'
import ReadMore from '../ReadMore/readmore'
import { useTranslation } from 'react-i18next'
import BidOrBuy from 'components/BidOrBuy'
import ButtonWishlist from 'components/Button/ButtonWishlist'
import { usePopup } from 'state/application/hooks'
import { useHistory, useParams } from 'react-router-dom'
import { useAuctionNFT, useGetAuctionNFT, useSetBidOrBuy, useIsExpiredAuction } from 'state/marketplace/hooks'
import uriToHttp from 'utils/uriToHttp'
import { AuctionNFT } from 'services/models/AuctionNFT'
import { useUserBalance } from 'state/user/hooks'
import Timer from 'components/Timer/Timer'
import Amount from 'components/NFTSummary/Amount'
import StringModifier from 'utils/StringSplice'
import Text from '../Text'
import StartfiLoader from 'components/Loader/startfi'

interface NFTParams {
  nft: string
  auction: string
}

const Nftproduct = () => {
  const { t } = useTranslation()

  const [isReadMore, setIsReadMore] = useState('')

  const [isOpen, setIsOpen] = useState(false)

  const [bidOrBuy, setBidOrBuy] = useState(false)

  const { nft, auction }: NFTParams = useParams()

  useGetAuctionNFT(nft, auction)

  const auctionNFT: AuctionNFT | null = useAuctionNFT()

  const expiredAuction = useIsExpiredAuction(auctionNFT)

  const popup = usePopup()

  const history = useHistory()

  const balance = useUserBalance()
  const setValue = useSetBidOrBuy()

  if (!nft || !auction) {
    popup({ success: false, message: 'noNFT' })
    history.goBack()
    return null
  }

  if (auctionNFT == undefined)
    return (
      <div>
        <StartfiLoader></StartfiLoader>
      </div>
    )

  const nftId = parseInt(nft)

  const imgUrl = uriToHttp(`${auctionNFT?.nft?.dataHash}`)[1]

  const noStakes =
    balance &&
    auctionNFT &&
    ((auctionNFT.auction.listingPrice && parseFloat(balance) < auctionNFT.auction.listingPrice) ||
      (auctionNFT.auction.minBid && parseFloat(balance) < auctionNFT.auction.minBid))

  const showScroll = (readMore: boolean) => {
    readMore ? setIsReadMore('scroll') : setIsReadMore('')
  }

  const LastBidding = auctionNFT ? parseInt(auctionNFT?.auction?.bids[auctionNFT?.auction?.bids.length - 1]) : null
  let listingPrice: number = auctionNFT?.auction?.listingPrice as number
  return (
    <Grid>
      <BidOrBuy bidOrBuy={bidOrBuy} isOpen={isOpen} close={() => setIsOpen(false)} />
      <LeftGrid>
        <ImgCard>
          <img src={imgUrl} alt="NFT" />
        </ImgCard>
        <LeftTextCard>
          <CreatedTitle>
            <p>
              <span>About {auctionNFT?.nft.name}</span>
            </p>
          </CreatedTitle>
          <CreatedText>
            <ReadMore showScroll={showScroll}>
              <p>{auctionNFT?.nft?.description}</p>
            </ReadMore>
          </CreatedText>
        </LeftTextCard>
      </LeftGrid>
      <RightGrid>
        <RightTitle>
          <Name>
            <p>{auctionNFT?.nft.name}</p>
            {noStakes && (
              <Stakes>
                <NoStakes>{t('needsMoreStakes')}</NoStakes>
                <GetNow onClick={() => history.push('/marketplace/stakeTokens')}>{t('getNow')}</GetNow>
              </Stakes>
            )}
          </Name>
        </RightTitle>

        <TagContainer>
          {auctionNFT?.nft?.tags?.map(e => (
            <div key={e}>
              <p>{e}</p>
            </div>
          ))}
        </TagContainer>

        {auctionNFT ? (
          <TimerContainer>
            <Text fontFamily="Roboto" fontSize="1rem" color="#323232" margin="0 23px 0px 0px">
              {t('auctionsEndIn')} :
            </Text>
            <Timer timeStamp={auctionNFT.auction.expireTimestamp} helperString="Auction"></Timer>
          </TimerContainer>
        ) : null}

        <BuyCard>
          {LastBidding ? (
            <LastBiddingContainer>
              <Text fontFamily="Roboto" FontWeight="bold" fontSize="0.875rem" color="#323232" margin="0 23px 0px 0px">
                {t('lastBidding')} :
              </Text>
              <Amount amount={LastBidding}></Amount>
            </LastBiddingContainer>
          ) : (
            <LastBiddingContainer>
              <Text fontFamily="Roboto" FontWeight="bold" fontSize="1rem" color="#323232" margin="15px auto">
                {t('noBidding')}
              </Text>
            </LastBiddingContainer>
          )}

          <BuyButtons>
            <ButtonWishlist
              nftId={nftId}
              type="NFTProduct"
              width="70%"
              borderRadius="4px"
              fontSize="1rem"
              disabled={expiredAuction}
            />
            <PlaceBid>
              <button
                onClick={() => {
                  setBidOrBuy(true)
                  setIsOpen(true)
                }}
                disabled={expiredAuction}
              >
                {t('placeBid')}
              </button>
            </PlaceBid>
          </BuyButtons>
          <BuyNow>
            <button
              disabled={expiredAuction}
              onClick={() => {
                setValue(false, listingPrice)

                history.push('/marketplace/buyorbid')

                // setBidOrBuy(false)
                // setIsOpen(true)
              }}
            >
              {t('buy')}
            </button>
          </BuyNow>
        </BuyCard>

        <PublisherCard height="91px">
          <OwnerText>
            <Text fontFamily="Roboto" FontWeight="400" fontSize="1rem" color="#323232" margin="15px 0px 0px 22px">
              {t('Originally Crated By')} :
            </Text>
            {auctionNFT ? (
              <Text fontFamily="Roboto" FontWeight="600" fontSize="1rem" color="#323232" margin="15px 0px 0px 0px">
                {StringModifier(auctionNFT?.nft?.issuer)}
              </Text>
            ) : null}
          </OwnerText>
          <OwnerText>
            <Text fontFamily="Roboto" FontWeight="800" fontSize="1rem" color="#323232" margin="30px 0px 0px 22px ">
              {auctionNFT?.nft?.royalty} %
            </Text>

            <Text fontFamily="Roboto" FontWeight="400" fontSize="1rem" color="#323232" margin="30px 10px 0px 10px ">
              {t('PercentageResellingTransaction')}
            </Text>
          </OwnerText>
        </PublisherCard>

        <PublisherCard height="60px">
          <OwnerText>
            <Text fontFamily="Roboto" FontWeight="400" fontSize="1rem" color="#323232" margin="15px 0px 0px 22px">
              {t('seller')} :
            </Text>
            {auctionNFT ? (
              <Text fontFamily="Roboto" FontWeight="600" fontSize="1rem" color="#323232" margin="15px 0px 0px 22px">
                {StringModifier(auctionNFT?.nft?.owner)}
              </Text>
            ) : null}
          </OwnerText>
        </PublisherCard>

        <DescriptionCard overflowY={isReadMore}>
          <DescriptionTitle>
            <p> {t('DetailsCreatedBySeller')}</p>
          </DescriptionTitle>
          <DescriptionText>
            <ReadMore showScroll={showScroll}>
              <p>{auctionNFT?.ownerdetails}</p>
            </ReadMore>
          </DescriptionText>
        </DescriptionCard>
      </RightGrid>
    </Grid>
  )
}

export default Nftproduct
