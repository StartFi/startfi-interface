import React, { useState } from 'react'
import { Media, CardImg, Card, Price, Text, Actions, Bid, Buy } from './nftcard.styles'
import { useTranslation } from 'react-i18next'
import ButtonWishlist from 'components/Button/ButtonWishlist'
import { NftButton } from 'components/Button'
import { AuctionNFT } from 'services/models/AuctionNFT'
import uriToHttp from 'utils/uriToHttp'
import Amount from 'components/NFTSummary/Amount'
import Timer from 'components/Timer/Timer'
import { ONE_DAY_MILLISECONDS } from '../../constants'
import { useIsExpiredAuction } from 'state/marketplace/hooks'

export interface NftCardProps {
  auctionNFT: AuctionNFT
  navigateToCard: (clickedCard: AuctionNFT) => void
  placeBid: (clickedCard: AuctionNFT) => void
}

const NTFCard: React.FC<NftCardProps> = ({ auctionNFT, navigateToCard, placeBid }) => {
  const { t } = useTranslation()
  const cardContent = auctionNFT.nft
  const expired = auctionNFT.auction.expireTimestamp - Date.now()
  const listPrice = auctionNFT?.auction?.listingPrice
  const [isBid] = useState<boolean>(auctionNFT ? auctionNFT.auction.isForBid : false)
  const expiredAuction = useIsExpiredAuction(auctionNFT)

  return (
    <Card
      boxShadow={
        expired < ONE_DAY_MILLISECONDS
          ? ' inset 0 0 10px 0 rgba(0, 0, 0, 0.25), 0 0 8px 0 rgba(0, 0, 0, 0.25)'
          : '0px 2px 8px rgba(0, 0, 0, 0.135216)'
      }
    >
      <div onClick={() => navigateToCard(auctionNFT)}>
        <Media>
          <CardImg src={uriToHttp(auctionNFT.nft.dataHash)[1]} />
        </Media>
        <div>
          <Price>
            <Amount amount={listPrice}></Amount>
            <Text fontFamily="Roboto" FontWight="400" fontSize="1.0rem" margin="15px 0px 5px 0px">
              {cardContent.name}
            </Text>
            {isBid ? (
              <div>
                <Timer timeStamp={auctionNFT.auction.expireTimestamp} helperString="Auction"></Timer>
                {expired > 1 ? <Text> LEFT</Text> : null}
              </div>
            ) : null}
          </Price>
        </div>
      </div>
      <Actions>
        {isBid && expiredAuction ? (
          <ButtonWishlist nftId={cardContent.id} type="NFTCard" disabled={expiredAuction} />
        ) : (
          <ButtonWishlist nftId={cardContent.id} type="NFTCard" />
        )}
        {isBid ? (
          <Bid>
            <NftButton disabled={expiredAuction} onClick={() => placeBid(auctionNFT)} color="#ffffff">
              {t('placeBid')}
            </NftButton>
          </Bid>
        ) : (
          <Buy onClick={() => navigateToCard(auctionNFT)}>
            <NftButton color="#ffffff">{t('buy')}</NftButton>
          </Buy>
        )}
      </Actions>
    </Card>
  )
}

export default NTFCard
