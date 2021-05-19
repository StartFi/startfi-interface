import { TextField, styled } from '@material-ui/core'

export const InputBase = styled(TextField)({
  backgroundColor: '#FFFFFF',
  color: '#AFAFAF',
  boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.135216)',
})

export const InputSearch = styled(InputBase)({
  width: '44vw',
  height: '6vh',
  borderRadius: '4px 0px 0px 4px',
  fontSize: '14px'
})
