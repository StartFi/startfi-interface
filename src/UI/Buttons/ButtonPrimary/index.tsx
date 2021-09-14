import styled from 'styled-components'
import { ButtonBase } from '../ButtonBase'

export const ButtonPrimary = styled(ButtonBase)`
  background-color: ${({ theme }) => theme.black};
  color: ${({ theme }) => theme.white};
  :hover {
    background-color: ${({ theme }) => theme.black};
    color: ${({ theme }) => theme.white};
  }
`
