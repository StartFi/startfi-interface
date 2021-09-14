import styled from 'styled-components'
import { ButtonPrimary } from '../ButtonPrimary'
export interface ButtonMintProps {
  readonly disabled?: boolean
}

export const ButtonMint = styled(ButtonPrimary)<ButtonMintProps>`
  min-width: 10vw;
  width: fit-content;
  padding: 0 2vw;
  height: 6vh;
  font-size: 1rem;
  background-color: ${({ disabled }) => (disabled ? '#C2C2C2' : 'black')};
  :hover {
    background-color: ${({ disabled }) => (disabled ? '#C2C2C2' : 'black')};
  }
`
