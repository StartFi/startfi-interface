import React from 'react'
import Wallet from 'components/Wallet'
import Logo from './../../assets/icons/logo.svg'
import Arrow from './../../assets/icons/backarrow.svg'
import { LinkMarketplace } from 'components/Link'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router'
import { useLocation } from 'react-router-dom'
import { Row } from 'theme'
import { HeaderContainer, HeaderRight, LeftContainer } from './styles'

const Left = () => {
  const history = useHistory()

  return (
    <LeftContainer onClick={() => history.push('/')}>
      <img src={Logo} alt="Logo" />
      <div>Startfi</div>
    </LeftContainer>
  )
}

const Header: React.FC = () => {
  const { t } = useTranslation()

  if (
    useLocation()
      .pathname.split('/')
      .pop() !== 'steps'
  )
    return (
      <Row>
        <Left />
        <Wallet />
      </Row>
    )
  return (
    <HeaderContainer>
      <Left />
      <HeaderRight>
        <div>
          <LinkMarketplace to="/marketplace/nfts">{t('backToMarketplace')}</LinkMarketplace>
          <img src={Arrow} alt="Back" />
        </div>
        <Wallet />
      </HeaderRight>
    </HeaderContainer>
  )
}

export default Header
