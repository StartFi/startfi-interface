import React from 'react'
import { styled, Tab, Tabs, withStyles } from '@material-ui/core'
import { COLORS } from 'theme'

export const TabCategory = styled(Tab)({
  fontSize: '1rem',
  color: '#616161',
  textTransform: 'none'
})

interface CategoryTabsProps {
  value: number
  onChange: (event: React.ChangeEvent<{}>, newValue: number) => void
}

export const TabsCategory = withStyles({
  root: {
    paddingBottom: '2vh',
    margin: '4vh 0',
    borderBottom: '1px solid #EFEFEF'
  },
  indicator: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    '& > span': {
      maxWidth: 80,
      width: '100%',
      backgroundColor: COLORS.black
    }
  }
})((props: CategoryTabsProps) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />)
