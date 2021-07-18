import Card from 'components/Card'
import { InventoryCard, TagContainer } from 'components/invHome/InvHome.styles'
import Row from 'components/Row'
import Text from '../Text'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { NFT } from 'services/models/NFT'
import { useAuctionItem, useOnMarketItem } from 'state/user/hooks'
import uriToHttp from 'utils/uriToHttp'
import { Divider, ImageContainer, TextContainer, TagRow } from './InMarket.styles'
import { Auction } from 'services/models/Auction'

interface onMarketParams {
  id: string
}

const InMarket = () => {
  const { id }: onMarketParams = useParams()
  const nft: NFT = useOnMarketItem(parseInt(id))
  const auction: Auction = useAuctionItem(parseInt(id))
  const imgUrl = uriToHttp(`${nft.dataHash}`)[1]
  const [tagsState, setTagsState] = useState(false)


  useEffect(() => {
    if (nft?.tags) {
      if (nft.tags.length > 0) setTagsState(true)
    }
  }, [])



  return (
    <InventoryCard borderRadius='8px' marginTop='54px'>
      <Row padding='20px' align='start'>
        <Text fontFamily='Roboto' FontWeight='500' fontSize='1rem' color='#000000' margin='0 0 3px 8px'>
          {nft.name}
        </Text>
        {/* 1 */}
        <Card height='142px' border='1px solid #F4F4F4' borderRadius='6px' background='#FBFBFB'>
          <ImageContainer>
            <img src={imgUrl} />
            <TextContainer marginLeft='1.438rem'>
              <div>
                <Text fontFamily='Roboto' fontSize='1rem' color='#444444' spanWeight='500' marginLeft='3.75rem'>
                  Category
                  <span>{nft.category}</span>
                </Text>
              </div>

              <Divider width='29.938rem '></Divider>
              <div>
                <Text fontFamily='Roboto' fontSize='1rem' color='#444444' spanWeight='500' marginLeft='3.40rem'>
                  File Name
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
                Asset Name
                <span>{nft.name}</span>
              </Text>
            </div>
            <Divider width='95%'></Divider>
            <TagRow>
              <Text fontFamily='Roboto' fontSize='1rem' color='#444444' spanWeight='500' marginLeft='7.0rem'>
                Tags
              </Text>

              {tagsState ? (
                <TagContainer marginLeft='6.8rem'>
                  {nft.tags?.map(e => (
                    <div key={e}>{e}</div>
                  ))}
                </TagContainer>
              ) : (
                <span>No Tags Added</span>
              )}
            </TagRow>

            <Divider width='95%'></Divider>
            <div>
              <Text fontFamily='Roboto' fontSize='1rem' color='#444444' spanWeight='500' marginLeft='4.0rem'>
                Description
                <span>{nft.description}</span>
              </Text>
            </div>
          </TextContainer>
        </Card>

        {/* 3 */}
        <Card height='63px' border='1px solid #F4F4F4' borderRadius='6px' background='#FBFBFB' marginTop='20px'>
          <TextContainer marginLeft='1.438rem' width='100%'>
            <Text fontFamily='Roboto' fontSize='1rem' color='#444444' spanWeight='500' marginLeft='3.40rem'>
              Issue Royalty Share<span>{nft.royalty} % ~ ( 250 STFI / 25 USD )</span>
            </Text>
          </TextContainer>
        </Card>

        {/* 4 */}
        {auction.isForBid ? (
          <Card height='229px' border='1px solid #F4F4F4' borderRadius='6px' background='#FBFBFB' marginTop='20px'>
            <TextContainer marginLeft='1.438rem' width='100%'>
              <div>
                <Text fontFamily='Roboto' fontSize='1rem' color='#444444' spanWeight='500' marginLeft='9.75rem'>
                  Pricing
                  <span>{auction.listingPrice} STFI ~ 253 USD</span>
                </Text>
              </div>
              <Divider width='95%'></Divider>

              <div>
                <Text fontFamily='Roboto' fontSize='1rem' color='#444444' spanWeight='500' marginLeft='5.0rem'>
                  Minimum Bidding
                  <span>800 STFI ~ 253 USD</span>
                </Text>
              </div>

              <Divider width='95%'></Divider>
              <div>
                <Text fontFamily='Roboto' fontSize='1rem' color='#444444' spanWeight='500' marginLeft='6.7rem'>
                  Auction Time
                  <span> opened for 4 days</span>
                </Text>
              </div>
              <Divider width='95%'></Divider>
              <div>
                <Text fontFamily='Roboto' fontSize='1rem' color='#444444' spanWeight='500' marginLeft='6.2rem'>
                  Qualify Amount
                  <span>40 STFI ~ 253 USD</span>
                </Text>
              </div>
            </TextContainer>
          </Card>
        ) : (
          <Card height='71px' border='1px solid #F4F4F4' borderRadius='6px' background='#FBFBFB' marginTop='20px'>
            <TextContainer marginLeft='1.438rem' width='100%'>
              <div>
                <Text fontFamily='Roboto' fontSize='1rem' color='#444444' spanWeight='500' marginLeft='9.75rem'>
                  Pricing
                  <span>{auction.listingPrice} STFI ~ 253 USD</span>
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
                Token ID
                <span>{nft.id}</span>
              </Text>
            </div>
            <Divider width='95%'></Divider>
            <div>
              <Text fontFamily='Roboto' fontSize='1rem' color='#444444' spanWeight='500' marginLeft='5.0rem'>
                Contact address attribute
                <span></span>
              </Text>
            </div>
          </TextContainer>
        </Card>
      </Row>
    </InventoryCard>
  )
}

export default InMarket
