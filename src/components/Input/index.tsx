import React from 'react'
import { TextField, styled, makeStyles } from '@material-ui/core'
import { COLORS } from 'theme'

export const InputBase = styled(TextField)({
  backgroundColor: COLORS.white,
  color: COLORS.placeholder,
  boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.135216)'
})

const useStyles = makeStyles({
  textfield: {
    width: '44vw',
    height: '6vh',
    backgroundColor: COLORS.white,
    borderRadius: '4px 0px 0px 4px',
    fontSize: '0.875rem'
  },
  placeholder: {
    fontSize: '0.875rem',
    color: COLORS.placeholder
  }
})

interface InputSearchProps {
  value: string
  onChange: (event: React.ChangeEvent<{}>) => void
}

export const InputSearch = (props: InputSearchProps) => {
  const classes = useStyles()
  return (
    <InputBase
      {...props}
      label="what are you looking for?"
      variant="filled"
      InputProps={{
        className: classes.textfield,
        disableUnderline: true
      }}
      InputLabelProps={{ className: classes.placeholder }}
    />
  )
}
