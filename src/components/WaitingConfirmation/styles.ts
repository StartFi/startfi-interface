import styled from 'styled-components'
import { Center } from 'theme'

export const WhiteShadow = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.82);
  z-index: 999;
`

export const Modal = styled(Center)`
  z-index: 9999;
  border-radius: 8px;
`

export const WalletConfirmationContainer = styled(Modal)`
  width: 32vw;
  background: #ffffff;
  border: 1px solid #f2f2f2;
  box-shadow: 0px 4px 30px 3px rgba(0, 0, 0, 0.21);
  text-align: center;
  padding: 3vh 0;
`

export const TopPadding = styled.div`
  padding-top: 8vh;
`

export const SidePadding = styled.div`
  padding: 0 3vw;
`

export const LoadingIcon = styled.img`
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;

  /* Safari */
  @-webkit-keyframes spin {
    0% {
      -webkit-transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
    }
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`

export const Text = styled.div`
  font-weight: 500;
  font-size: 18px;
  letter-spacing: 0.04em;
  color: #000000;
  padding: 4vh 0 8vh 0;
`

export const Footer = styled.div`
  font-size: 16px;
  letter-spacing: 0.04em;
  color: #000000;
`
