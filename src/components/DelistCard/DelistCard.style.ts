import { Modal } from 'components/WaitingConfirmation'
import styled from 'styled-components'
import { Row } from 'theme'

interface PaymentCardProps {
  readonly minHeight: string
}

export const Container = styled.div<PaymentCardProps>`
  width: 30vw;
  padding: 3vh 2vw;
  background-color: #fafafa;
  border-radius: 8px;
  min-height: ${({ minHeight }) => minHeight};
  display: flex;
   flex-flow: column nowrap;
  /* justify-content: space-between; */
`

export const SpaceBetween = styled(Row)`
  justify-content: space-between;
  align-items: baseline;
`
export const Bold = styled.div`
  font-weight: bold;
  letter-spacing: 0.04em;
  font-size: 1.125rem;
  color: #000000;
  text-transform: capitalize;
`

export const SemiBold = styled.div`
  font-weight: 500;
  font-size: 1rem;
  letter-spacing: 0.04em;
  color: #000000;
  text-transform: capitalize;
`

export const Border = styled.div`
  border-bottom: 1px solid #eeeeee;
  width: 100%;
`
export const Shadow = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
`
export const PaymentModal = styled(Modal)`
  background: #fafafa;
  border: 1px solid #d8d8d8;
`
export const Info = styled.div`
  line-height: 28px;
  letter-spacing: 0.04em;
`

export const DelistCardHeader =styled.div`
/* height:76.4px; */
width:100%;
`