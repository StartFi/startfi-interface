import React from 'react'
import { Media, CardImg, Card, Price, Text, Actions, Bid } from './nftcard.styles'
import { useTranslation } from 'react-i18next'
import ButtonWishlist from 'UI/Buttons/ButtonWishlist'
import { NftButton } from 'UI/Buttons/NftButton'
import { AuctionNFT } from 'state/types/AuctionNFT'
import uriToHttp from 'utils/uriToHttp'
import DisplayBalance from 'components/NFTSummary/DisplayBalance'
import Timer from 'UI/Timer/Timer'
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

  const nftId = parseInt(cardContent.tokenId)
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
            <DisplayBalance amount={listPrice}></DisplayBalance>
            <Text fontFamily="Roboto" FontWight="400" fontSize="1.0rem" margin="15px 0px 5px 0px">
              {cardContent.name}
            </Text>
            <div>
              <Timer timeStamp={auctionNFT.auction.expireTimestamp} helperString="Auction"></Timer>
              {expired > 1 ? <Text> LEFT</Text> : null}
            </div>
          </Price>
        </div>
      </div>
      <Actions>
        <ButtonWishlist nftId={nftId} type="NFTCard" disabled={expiredAuction} />

        <Bid>
          <NftButton disabled={expiredAuction} onClick={() => placeBid(auctionNFT)} color="#ffffff">
            {t('placeBid')}
          </NftButton>
        </Bid>
      </Actions>
    </Card>
  )
}

export default NTFCard
