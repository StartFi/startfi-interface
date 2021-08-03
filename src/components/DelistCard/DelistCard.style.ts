import { Modal } from 'components/WaitingConfirmation'

import styled from 'styled-components'


interface DelistCardProps {
  readonly minHeight: string
}

export const Container = styled.div<DelistCardProps>`
  width: 30vw;
  padding: 3vh 2vw;
  background-color: #fafafa;
  border-radius: 8px;
  min-height: ${({ minHeight }) => minHeight};
  display: flex;
  flex-flow: column nowrap;
  /* justify-content: space-between; */
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
export const DelistModal = styled(Modal)`
  background: #fafafa;
  border: 1px solid #d8d8d8;
`
// export const Info = styled.div`
//   line-height: 28px;
//   letter-spacing: 0.04em;
// `

export const DelistCardHeader = styled.div`
  /* height:76.4px; */
  width: 100%;
`

export const DelistingDuration = styled.div`
  display: flex;
  justify-content: center;
`

export const CounterContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 14px;
  & div {
    &:not(:first-child) {
      margin-left: 16px;
    }
  }
`
export const CounterSegment = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70px;
  height: 122.23px;
  background: #ffffff;
  border: 1px solid #e2e2e2;
  box-sizing: border-box;
  border-radius: 4px;
`

export const CheckContainer = styled.div`
  display: flex;
  align-items: center;

  margin-top: 22px;
  & input {
    margin-right: 8px;
    &:checked {
      background-color: #000000;

    }
  }
`
export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: space-between;
  margin-top: 20px;
  & :first-child {
    margin-bottom: 20px;
  }
`
export const DelistButton = styled('button')<{ backgroundColor?: string; color?: string; border?: string }>`
  cursor: pointer;
  box-sizing: border-box;
  border: none;
  border-radius: 4px;
  height: 50px;

  background-color: ${({ backgroundColor }) => backgroundColor};
  color: ${({ color }) => color};
  border: ${({ border }) => border};
  &:disabled{
    background-color:#c2c2c2;
    /* cursor:none; */
    /* opacity:50%; */

  }
`
