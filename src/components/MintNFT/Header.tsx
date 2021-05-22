import { Box } from '@material-ui/core'
import React from 'react'
import styled from 'styled-components'
import Wallet from 'components/Wallet'
import Logo from './../../assets/icons/logo.svg'
import Arrow from './../../assets/icons/backarrow.svg'
import { LinkMarketplace } from 'components/Link'

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
  return (
    <Container>
      <Left>
        <img src={Logo} alt="Logo" />
        <Box>Startfi</Box>
      </Left>
      <Right>
        <Box>
          <LinkMarketplace to="nfts">Back to Marketplace</LinkMarketplace>
          <img src={Arrow} alt="Back" />
        </Box>
        <Wallet />
      </Right>
    </Container>
  )
}

export default Header
