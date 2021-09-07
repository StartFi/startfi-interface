import Card from 'components/Card'
import { InventoryCard, TagContainer } from 'components/invHome/InvHome.styles'
import Row from 'components/Row'
import Text from '../Text'
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { NFT } from 'services/models/NFT'
import { useAuctionItem, useOnMarketItem } from 'state/user/hooks'
import uriToHttp from 'utils/uriToHttp'
import {
  Divider,
  ImageContainer,
  TextContainer,
  TagRow,
  DeListingContainer,
  AuctionTimer,
  AmountContainer
} from './InMarket.styles'
import { Auction } from 'services/models/Auction'
import { ButtonMintBack, DelistButton } from 'components/Button'
import { useTranslation } from 'react-i18next'
import DelistCard from 'components/DelistCard/DelistCard'

import { Footer } from 'components/OffMarket/OffMarket.styles'
import Amount from 'components/NFTSummary/Amount'

import Timer from 'components/Timer/Timer'

interface onMarketParams {
  id: string
}

const InMarket = () => {
  const { t } = useTranslation()
  const { id }: onMarketParams = useParams()
  const nft: NFT = useOnMarketItem(id)
  const auction: Auction = useAuctionItem(id)
  const imgUrl = uriToHttp(`${nft?.dataHash}`)[1]
  const [tagsState, setTagsState] = useState(false)
  const history = useHistory()

  const [displayBidWarning, setDisplayBidWarning] = useState<string>('none')
  const [displayWarning, setDisplayWarning] = useState<string>('none')
  const [delistCardHeight, setDelistCardHeight] = useState<string>('129px')
  const [delistContainerHeight, setDelistContainerHeight] = useState<string>('120px')
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [disabled, setDisabled] = useState<boolean>(false)
  const expired = auction.expireTimestamp - Date.now()

  useEffect(() => {
    if (nft?.tags) {
      if (nft.tags.length > 0) setTagsState(true)
    }
  }, [])

  const delist = () => {
    if (expired > 0 && !(auction?.bids.length > 0)) {
      setDisplayWarning('block')
      setDelistCardHeight('161px')
      setDelistContainerHeight('145px')
      setDisabled(true)
    }
    if (expired > 0 && auction?.bids.length > 0) {
      setDisplayBidWarning('block')
      setDelistCardHeight('161px')
      setDelistContainerHeight('145px')
    }

    if (expired < 1) {
      setOpenModal(true)
    }
  }

  const closeCard = () => {
    setOpenModal(false)
  }

  return (
    <React.Fragment>
      <DelistCard isOpen={openModal} close={closeCard} nft={nft} auction={auction}></DelistCard>
      <div>
        <Text
          fontFamily='Roboto'
          fontSize='1rem'
          color='#444444'
          textTransform='capitalize'
          margin='25px 0px -45px 50px'
        >
          {t('monetizingAssets')}
        </Text>

        <InventoryCard borderRadius='8px' marginTop='54px'>
          <Row padding='20px' align='start'>
            <Text fontFamily='Roboto' FontWeight='500' fontSize='1rem' color='#000000' margin='0 0 3px 8px'>
              {nft?.name}
            </Text>
            {/* 1 */}
            <Card height='142px' border='1px solid #F4F4F4' borderRadius='6px' background='#FBFBFB'>
              <ImageContainer>
                <img src={imgUrl} />
                <TextContainer marginLeft='1.438rem'>
                  <div>
                    <Text fontFamily='Roboto' fontSize='1rem' color='#444444' spanWeight='500' marginLeft='3.75rem'>
                      {t('category')}
                      <span>{nft?.category}</span>
                    </Text>
                  </div>

                  <Divider width='29.938rem '></Divider>
                  <div>
                    <Text fontFamily='Roboto' fontSize='1rem' color='#444444' spanWeight='500' marginLeft='3.40rem'>
                      {t('fileName')}
                      <span></span>
                    </Text>
                  </div>
                </TextContainer>
              </ImageContainer>
            </Card>

            {/* 2 */}
            <Card height='226px' border='1px solid #F4F4F4' borderRadius='6px' background='#FBFBFB' marginTop='20px'>
              <TextContainer marginLeft='1.438rem' width='100%'>
                <div>
                  <Text fontFamily='Roboto' fontSize='1rem' color='#444444' spanWeight='500' marginLeft='3.75rem'>
                    {t('asstName')}
                    <span>{nft?.name}</span>
                  </Text>
                </div>
                <Divider width='95%'></Divider>
                <TagRow>
                  <Text fontFamily='Roboto' fontSize='1rem' color='#444444' spanWeight='500' marginLeft='7.0rem'>
                    {t('tags')}
                  </Text>

                  {tagsState ? (
                    <TagContainer marginLeft='6.8rem'>
                      {nft.tags?.map(e => (
                        <div key={e}>{e}</div>
                      ))}
                    </TagContainer>
                  ) : (
                    <span>{t('noTags')}</span>
                  )}
                </TagRow>

                <Divider width='95%'></Divider>
                <div>
                  <Text fontFamily='Roboto' fontSize='1rem' color='#444444' spanWeight='500' marginLeft='4.0rem'>
                    {t('description')}
                    <span>{nft?.description}</span>
                  </Text>
                </div>
              </TextContainer>
            </Card>

            {/* 3 */}
            <Card height='63px' border='1px solid #F4F4F4' borderRadius='6px' background='#FBFBFB' marginTop='20px'>
              <TextContainer marginLeft='1.438rem' width='100%'>
                <AmountContainer>
                  <Text fontFamily='Roboto' fontSize='1rem' color='#444444' spanWeight='500' marginLeft='3.40rem'>
                    {t('IssueRoyaltyShare')}
                  </Text>
                  <Amount amount={nft?.royalty}></Amount>
                </AmountContainer>
              </TextContainer>
            </Card>

            {/* 4 */}
            {auction?.isForBid ? (
              <Card height='229px' border='1px solid #F4F4F4' borderRadius='6px' background='#FBFBFB' marginTop='20px'>
                <TextContainer marginLeft='1.438rem' width='100%'>
                  <AmountContainer>
                    <Text
                      fontFamily='Roboto'
                      fontSize='1rem'
                      color='#444444'
                      spanWeight='500'
                      margin='0px 88px 10px 0px'
                    >
                      {t('pricing')}
                    </Text>
                    <Amount amount={auction?.listingPrice || 0}></Amount>
                  </AmountContainer>
                  <Divider width='95%'></Divider>

                  <div>
                    <AmountContainer>
                      <Text fontFamily='Roboto' fontSize='1rem' color='#444444' margin='15px 13px 15px 0px'>
                        {t('minBiding')}
                      </Text>
                      {auction?.minBid ? <Amount amount={auction?.minBid}></Amount> : null}
                    </AmountContainer>
                  </div>

                  <Divider width='95%'></Divider>
                  <AuctionTimer>
                    <Text
                      fontFamily='Roboto'
                      fontSize='1rem'
                      color='#444444'
                      spanWeight='500'
                      margin='0px 111px 0px 0px'
                    >
                      {t('auctionTime')}
                    </Text>
                    <Timer timeStamp={auction.expireTimestamp} helperString='Auction'></Timer>

                  </AuctionTimer>
                  <Divider width='95%'></Divider>
                  <div>
                    <AmountContainer>
                      <Text fontFamily='Roboto' fontSize='1rem' color='#444444' margin='15px 30px 15px 0px'>
                        {t('qualifyAmount')}
                      </Text>
                      {auction?.qualifyAmount ? <Amount amount={auction?.qualifyAmount}></Amount> : null}
                    </AmountContainer>
                  </div>
                </TextContainer>
              </Card>
            ) : (
              <Card height='71px' border='1px solid #F4F4F4' borderRadius='6px' background='#FBFBFB' marginTop='20px'>
                <TextContainer marginLeft='1.438rem' width='100%'>
                  <div>
                    <Text fontFamily='Roboto' fontSize='1rem' color='#444444' spanWeight='500' marginLeft='9.75rem'>
                      {t('pricing')}
                      <span>{auction?.listingPrice} STFI ~ 253 USD</span>
                    </Text>
                  </div>
                </TextContainer>
              </Card>
            )}

            {/* 5 */}
            <Card height='123px' border='1px solid #F4F4F4' borderRadius='6px' background='#FBFBFB' marginTop='20px'>
              <TextContainer marginLeft='1.438rem' width='100%'>
                <div>
                  <Text fontFamily='Roboto' fontSize='1rem' color='#444444' spanWeight='500' marginLeft='9.75rem'>
                    {t('tokenId')}
                    <span>{nft?.id}</span>
                  </Text>
                </div>
                <Divider width='95%'></Divider>
                <div>
                  <Text fontFamily='Roboto' fontSize='1rem' color='#444444' spanWeight='500' marginLeft='5.0rem'>
                    {t('contactAddress')}
                    <span></span>
                  </Text>
                </div>
              </TextContainer>
            </Card>
          </Row>
          <Footer>
            <ButtonMintBack onClick={() => history.push('/inventory/home/onMarketPlace')}>{t('back')}</ButtonMintBack>
          </Footer>
        </InventoryCard>

        <InventoryCard height={delistCardHeight} borderRadius='8px' marginTop='30px'>
          <DeListingContainer height={delistContainerHeight}>
            <div>
              <Text FontWeight='500' color='#000000' fontFamily='Roboto' fontSize='1rem'>
                {t('deListingAsset')}?
              </Text>
              <Text fontFamily='Roboto' fontSize='1rem' color='#444444'>
                {t('removeAsset')}?
              </Text>
              <Text fontFamily='Roboto' fontSize='1rem' color='#CA0000' display={displayBidWarning}>
                {t('DelistBidWarning')}
              </Text>
              <Text fontFamily='Roboto' fontSize='1rem' color='#CA0000' display={displayWarning}>
                {t('DelistWarning')}
              </Text>
            </div>
            <DelistButton disabled={disabled} onClick={delist}>
              {t('deListAsset')}
            </DelistButton>
          </DeListingContainer>
        </InventoryCard>
      </div>
    </React.Fragment>
  )
}

export default InMarket
