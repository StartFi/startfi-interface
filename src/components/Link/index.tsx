import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const LinkBase = styled(Link)`
  color: black;
  text-decoration: none;
`

export const LinkCreateNFT = styled(LinkBase)<{ width?: string }>`
  font-size: 1.125rem;
  font-weight: 500;
  width: ${({ width }) => width};
  padding: 0px 15px;
`

export const LinkMarketplace = styled(LinkBase)`
  display: block;
`
