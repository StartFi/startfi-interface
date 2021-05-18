import { Select, styled } from '@material-ui/core'

export const DropDownBase = styled(Select)({
  color: '#2C2C2C',
  padding: '0 1vw',
  borderRadius: '8px',
  boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.135216)',
  fontSize: '14px'
})

export const DropDownSort = styled(DropDownBase)({
  width: '9.5vw',
  height: '5vh'
})
