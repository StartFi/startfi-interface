import styled from 'styled-components'
import { ButtonMint } from '../ButtonMint'

export const RemoveWishList = styled(ButtonMint)`
  background-color: white;
  width: 18vw;
  color: #000000;
  font-weight: 500;
  font-size: 16px;
  cursor: pointer;
  border: none;
  box-shadow: none;
  &:hover {
    background-color: white;
    color: #000000;
  }
  &:disabled {
    opacity: 50%;
    cursor: auto;
  }
`
