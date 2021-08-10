import styled from 'styled-components'
import { Row } from 'theme'

export const BalanceContainer = styled('div')<{ display?: string }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 20px;

  & div {
    display: flex;
    align-items: center;
  }
`

export const InputContainer = styled(Row)`
  background: #ffffff;
  border: 1px solid #dddddd;
  border-radius: 8px;
  width: 536px;
`

export const StokeTokenFooter = styled('div')<{ left?: string }>`
  width: 536px;
  margin-left: 302px;
  & button {
    position: relative;
    left:${({ left}) => left};
  }
`
