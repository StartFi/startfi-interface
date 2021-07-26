import { InventoryCard, TagContainer } from 'components/invHome/InvHome.styles'
import React, { useEffect, useState } from 'react'
import Row from 'components/Row'
import Text from '../Text'
import { useHistory, useParams } from 'react-router-dom'
import { NFT } from 'services/models/NFT'
import uriToHttp from 'utils/uriToHttp'
import { useOffMarketItem } from 'state/user/hooks'
import Card from 'components/Card'
import { ImageContainer, Divider, TextContainer, TagRow } from 'components/InMarketAsset/InMarket.styles'
import { Footer, TopTitle } from './OffMarket.styles'
import { ButtonDraft, ButtonMint, ButtonMintBack } from 'components/Button'
import { useTranslation } from 'react-i18next'
import Vector from '../../assets/images/Vector.png'
import StringModifier from 'utils/StringSplice'

interface offMarketParams {
  id: string
}

const OffMarket = () => {
  const { t } = useTranslation()
  const { id }: offMarketParams = useParams()
  const history = useHistory()
  const nft: NFT = useOffMarketItem(parseInt(id))
  const imgUrl = uriToHttp(`${nft.dataHash}`)[1]

  const [tagsState, setTagsState] = useState(false)


  useEffect(() => {
    if (nft?.tags) {
      if (nft.tags.length > 0) setTagsState(true)
    }
  }, [])
  return (

    <InventoryCard borderRadius='8px' marginTop='54px'>
        <TopTitle>
            <span>{t('inventory')}</span>
            <img src={Vector}/>
            <span>{t('offMarketPlace')}</span>
            <img src={Vector}/>
            <span>{StringModifier(nft.owner)}</span>
            </TopTitle>
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
                 {t('category')}
                  <span>{nft.category}</span>
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
                {t('assetName')}
                <span>{nft.name}</span>
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
        <Card height='123px' border='1px solid #F4F4F4' borderRadius='6px' background='#FBFBFB' marginTop='20px'>
          <TextContainer marginLeft='1.438rem' width='100%'>
            <div>
              <Text fontFamily='Roboto' fontSize='1rem' color='#444444' spanWeight='500' marginLeft='9.75rem'>
               {t('tokenId')}
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
      <Footer>
        <ButtonMintBack onClick={()=>history.push('/inventory/home/offMarket')}>{t('back')}</ButtonMintBack>
        <ButtonDraft width="15vw">Save at off Marketplace</ButtonDraft>
        <ButtonMint width="16vw">Add to marketplace</ButtonMint>
      </Footer>
    </InventoryCard>
  )
}

export default OffMarket
