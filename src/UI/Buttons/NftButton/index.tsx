import styled from 'styled-components'
import { Base } from '../Base'

export const NftButton = styled(Base)<{ color?: string; border?: string; fontSize?: string }>`
  color: black;
  background-color: transparent;
  margin: 1em;
  padding: 0.25em 1em;
  border: none;

  font-size: ${({ fontSize }) => fontSize || '0.75rem'};
  border: ${({ border }) => border};
  color: ${({ color }) => color};
`
