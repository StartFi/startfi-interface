import styled from 'styled-components'
import { ButtonMint } from '../ButtonMint'

export const ButtonDraft = styled(ButtonMint)<{ width?: string }>`
  background-color: ${({ theme }) => theme.white};
  background-color: white;
  color: #929292;
  margin-right: 2vw;
  border: none;
  box-shadow: none;
  width: ${({ width }) => width};
  :hover {
    background-color: ${({ theme }) => theme.white};
    color: #929292;
  }
`
