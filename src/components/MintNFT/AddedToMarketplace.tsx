import React from 'react'
import { useTranslation } from 'react-i18next'
import { Row } from 'theme'
import { AddedToMarketplaceContainer, AddedToMarketplaceText, Header, PageLink } from './styles'

const AddedToMarketplace: React.FC = () => {
  const { t } = useTranslation()

  return (
    <AddedToMarketplaceContainer>
      <Header>{t('congratulations')}</Header>
      <AddedToMarketplaceText> {t('nftReviewedBySTFI')}</AddedToMarketplaceText>
      <Row>
        <PageLink to="/marketplace/nfts">{t('exploreMarketplace')}</PageLink>
        <PageLink to="/mint/steps">{t('createNFT')}</PageLink>
      </Row>
    </AddedToMarketplaceContainer>
  )
}

export default AddedToMarketplace
