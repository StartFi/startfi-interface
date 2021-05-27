import { styled } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { COLORS } from 'theme'

export const LinkBase = styled(Link)({
  color: COLORS.black,
  textDecoration: 'none'
})

export const LinkCreateNFT = styled(LinkBase)({
  fontSize: '1.125rem',
  fontWeight: 500
})

export const LinkMarketplace = styled(LinkBase)({
  display: 'block',
})
