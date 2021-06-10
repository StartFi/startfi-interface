import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import Loading from './../../assets/icons/loading.svg'
interface WaitingConfirmationProps {
  isOpen: boolean
  bidOrBuy: boolean
  ownername: string
  owner: string
}

const WhiteShadow = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.82);
`

const Container = styled.div`
  width: 32vw;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #ffffff;
  border: 1px solid #f2f2f2;
  box-shadow: 0px 4px 30px 3px rgba(0, 0, 0, 0.21);
  border-radius: 8px;
  z-index: 9;
  text-align: center;
  padding: 11vh 4vw 3vh 4vw;
`

const LoadingIcon = styled.img`
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;
}

/* Safari */
@-webkit-keyframes spin {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`

const Text = styled.div`
  font-weight: 500;
  font-size: 18px;
  letter-spacing: 0.04em;
  color: #000000;
  padding: 4vh 0 8vh 0;
`

const Footer = styled.div`
  font-size: 16px;
  letter-spacing: 0.04em;
  color: #000000;
`

const WaitingConfirmation: React.FunctionComponent<WaitingConfirmationProps> = ({ isOpen, bidOrBuy, ownername, owner }) => {
  const { t } = useTranslation()

  if (!isOpen) return null

  const bidorbuy = bidOrBuy ? 'Bidding' : 'Payment'

  return (
    <React.Fragment>
      <WhiteShadow />
      <Container>
        <LoadingIcon src={Loading} alt="Loading" />
        <Text>{t(`waitingConfirmation`, { bidorbuy, ownername, owner })}</Text>
        <Footer>{t('confirmTransactionInWallet')}</Footer>
      </Container>
    </React.Fragment>
  )
}

export default WaitingConfirmation
