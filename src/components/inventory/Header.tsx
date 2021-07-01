import React from 'react'
import Logo from './../../assets/icons/logo.svg'
import Wallet from 'components/Wallet'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'

const Container = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-end;
`

const Left = styled.div`
  width: 60%;
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
  width: 40%;
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-end;
  justify-content: flex-end;
`

const Header = () => {
  const history = useHistory()
  return (
    <Container>
      <Left onClick={() => history.push('/')} >
        <img src={Logo} alt='Logo' />
        <div>Startfi</div>
      </Left>

      <Right>
        <Wallet />
      </Right>
    </Container>
  )
}

export default Header
