import React from 'react';
import { useTranslation } from 'react-i18next';
import {  Container,Header,Text} from './mintingCongrats.styles'
function MintingCongrats() {

    const { t } = useTranslation()

    return (
        <Container>
            <Header>   {t('congratulations')}</Header>
           <Text> {t('nftReviewedBy')} <span>Startfi</span> {t('nftPublishing')}</Text>

        </Container>
    );
}

export default MintingCongrats;