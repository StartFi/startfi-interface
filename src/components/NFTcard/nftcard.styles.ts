import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles({
  card: {
    height: 378,
    width: '23vw',
    borderRadius: 8
  },
  media: {
    height: 176,
    marginTop: 30,
    marginBottom: 30,

    paddingLeft: 27,
    paddingRight: 27,

    '& img': {
      width: '100%',
      height: '100%'
    }
  },
  price: {
    height: 21,
    marginBottom: 19,
    paddingLeft: 27,
    paddingRight: 27,

    '& p': {
      fontFamily: 'Roboto',
      fontWeight: 700,
      fontSize: '1.125rem'
    }
  },

  title: {
    height: 19,
    marginBottom: 10,
    paddingLeft: 27,
    paddingRight: 27,
    fontFamily: 'Roboto',
    fontWeight: 400,
    fontSize: '1rem'
  },
  description: {
    paddingLeft: 27,
    paddingRight: 27,
    height: 14,
    fontFamily: 'Roboto',
    fontWeight: 400,
    fontSize: '0.74rem',
    lineHeight: '0.875rem',
    marginBottom: 16
  },
  action: {
    display: 'flex',
    height: 45
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
