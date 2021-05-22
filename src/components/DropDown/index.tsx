import React from 'react'
import { FormControl, makeStyles, MenuItem, Select } from '@material-ui/core'
import { COLORS } from 'theme'
import SelectIcon from './../../assets/icons/select.svg'

interface DropDownProps {
  name: string
  options: string[]
  value: string
  onChange: (
    event: React.ChangeEvent<{
      name?: string | undefined
      value: unknown
    }>,
    child: React.ReactNode
  ) => void
  width?: string
  label?: string
}

const useStyles = makeStyles({
  selected: {
    color: COLORS.white
  },
  focus: {
    '&:focus': {
      backgroundColor: 'white'
    }
  },
  select: {
    color: COLORS.black2,
    border: '1px solid #DDDDDD',
    borderRadius: '8px',
    background: '#FFFFFF',
    fontSize: '0.875rem',
    height: '7vh'
    // boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.135216)'
  },
  menu: {
    borderRadius: '8px',
    marginTop: '3vh',
    '& *': {
      paddingTop: '0',
      paddingBottom: '0'
    }
  },
  input: {
    paddingLeft: '1vw'
  },
  item: {
    height: '7.5vh',
    fontSize: '1rem',
    borderBottom: '1px solid #DDDDDD',
    '&:hover': {
      color: COLORS.white,
      backgroundColor: COLORS.black
    },
    '&$selected': {
      backgroundColor: COLORS.black,
      '&:hover': {
        backgroundColor: COLORS.black
      }
    }
  }
})

export const DropDown: React.FunctionComponent<DropDownProps> = ({
  name,
  options,
  value,
  onChange,
  width,
  label
}: DropDownProps) => {
  const classes = useStyles()

  return (
    <FormControl style={{ minWidth: width }}>
      <Select
        disableUnderline
        displayEmpty
        name={name}
        value={value}
        onChange={onChange}
        defaultValue={options[0]}
        className={classes.select}
        inputProps={{ className: classes.input }}
        classes={{ root: classes.focus, filled: classes.input }}
        renderValue={value !== '' ? undefined : () => <div style={{ color: 'black' }}>{label}</div>}
        IconComponent={() => <img src={SelectIcon} alt="Sort by" style={{ marginLeft: '-2vw', paddingRight: '1vw' }} />}
        MenuProps={{
          className: classes.menu,
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left'
          },
          transformOrigin: {
            vertical: 'top',
            horizontal: 'left'
          },
          getContentAnchorEl: null
        }}
      >
        {options.map(o => (
          <MenuItem key={o} value={o} classes={{ root: classes.item, selected: classes.selected }}>
            {o}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export const DropDownSort = (props: DropDownProps) => <DropDown {...props} width="10vw" />

export const DropDownDateType = (props: DropDownProps) => <DropDown {...props} width="8vw" />

export const DropDownCategory = (props: DropDownProps) => <DropDown {...props} width="30vw" />
