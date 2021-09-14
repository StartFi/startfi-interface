import styled from 'styled-components'
import { Base } from '../Base'

export const ButtonOutlined = styled(Base)`
  border: 1px solid ${({ theme }) => theme.black};
  background-color: transparent;
  color: ${({ theme }) => theme.text1};
  width: 189px;
  height: 50px;
  border-radius: 8px;

  &:focus {
    box-shadow: 0 0 0 1px ${({ theme }) => theme.bg4};
  }
  &:hover {
    box-shadow: 0 0 0 1px ${({ theme }) => theme.bg4};
  }
  &:active {
    box-shadow: 0 0 0 1px ${({ theme }) => theme.bg4};
  }
  &:disabled {
    opacity: 50%;
    cursor: auto;
  }
`
