import { Select, styled } from '@material-ui/core'
import { COLORS } from 'theme'

export const DropDownBase = styled(Select)({
  color: COLORS.black2,
  padding: '0 1vw',
  borderRadius: '8px',
  boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.135216)',
  fontSize: '0.875rem'
})

export const DropDownSort = styled(DropDownBase)({
  width: '9.5vw',
  height: '5vh'
})
