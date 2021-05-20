import { Link, styled } from '@material-ui/core'
import { COLORS } from 'theme'

export const LinkBase = styled(Link)({
  color: COLORS.black
})

export const LinkCreateNFT = styled(LinkBase)({
  fontSize: '1.125rem',
  fontWeight: 500
})
