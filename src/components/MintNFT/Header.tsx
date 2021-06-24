import React from 'react'
import styled from 'styled-components'
import Wallet from 'components/Wallet'
import Logo from './../../assets/icons/logo.svg'
import Arrow from './../../assets/icons/backarrow.svg'
import { LinkMarketplace } from 'components/Link'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router'

const Container = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-end;
`

const Left = styled.div`
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

const Header: React.FC = () => {
  const { t } = useTranslation()

  const history = useHistory()

  return (
    <Container>
      <Left onClick={() => history.push('/')}>
        <img src={Logo} alt="Logo" />
        <div>Startfi</div>
      </Left>
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
