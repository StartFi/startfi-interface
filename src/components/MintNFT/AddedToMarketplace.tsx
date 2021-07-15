import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Center, Row } from 'theme'

const Container = styled(Center)`
  width: 60%;
  text-align: center;
`

const Header = styled.p`
  font-weight: 900;
  font-size: 36px;
  text-transform: uppercase;
`

const Text = styled.p`
  font-weight: 400;
  font-size: 16px;
  margin-bottom: 12vh;
  color: #5b5b5b;
`

const PageLink = styled(Link)`
  font-weight: bold;
  font-size: 40px;
  position: relative;
  text-decoration: none;
  color: #000000;
  &:hover {
    &:hover:after {
      content: '';
      position: absolute;
      top: 120%;
      right: 70%;
      width: 30%;
      height: 3px;
      background: #000000;
    }
  }
`

const AddedToMarketplace: React.FC = () => {
  const { t } = useTranslation()

  return (
    <Container>
      <Header>{t('congratulations')}</Header>
      <Text> {t('nftReviewedBySTFI')}</Text>
      <Row>
        <PageLink to="/marketplace/nfts">{t('exploreMarketplace')}</PageLink>
        <PageLink to="/mint/steps">{t('createNFT')}</PageLink>
      </Row>
    </Container>
  )
}

export default AddedToMarketplace
