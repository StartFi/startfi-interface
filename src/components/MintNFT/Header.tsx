import React from 'react'
import styled from 'styled-components'
import Wallet from 'components/Wallet'
import Logo from './../../assets/icons/logo.svg'
import Arrow from './../../assets/icons/backarrow.svg'
import { LinkMarketplace } from 'components/Link'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router'
import { useLocation } from 'react-router-dom'
import { Row } from 'theme'

const Container = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-end;
`

const LeftContainer = styled.div`
  width: 40%;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  font-weight: 500;
  font-size: 1.125rem;
  cursor: pointer;
  img {
    margin-right: 1vw;
  }
`

const Right = styled.div`
  width: 60%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: flex-end;
`

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
    <Container>
      <Left />
      <Right>
        <div>
          <LinkMarketplace to="/marketplace/nfts">{t('backToMarketplace')}</LinkMarketplace>
          <img src={Arrow} alt="Back" />
        </div>
        <Wallet />
      </Right>
    </Container>
  )
}

export default Header
