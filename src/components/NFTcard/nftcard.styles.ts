import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles({
  root: {
    maxWidth: 345
  },
  media: {
    height: 175
  },
  price: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  action: {
    display: 'flex',
    padding: 0
  },
  whiteList: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#EDEDED',
    boxSizing: 'border-box',
    width: '50%'
  },
  icon: {
    position: 'relative',
    left: 29
  },
  bid: {
    backgroundColor: '#000000',
    display: 'flex',
    boxSizing: 'border-box',
    width: '50%'
  }
})
