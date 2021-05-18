import React from 'react'
import { styled, Tab, Tabs, withStyles } from '@material-ui/core'

export const CategoryTab = styled(Tab)({
  fontSize: '16px',
  color: '#616161',
  textTransform: 'none'
})

interface CategoryTabsProps {
  value: number
  onChange: (event: React.ChangeEvent<{}>, newValue: number) => void
}

export const CategoryTabs = withStyles({
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
      backgroundColor: 'black'
    }
  }
})((props: CategoryTabsProps) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />)
