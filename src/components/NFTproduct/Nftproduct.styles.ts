import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles({
  container: {
    marginTop: 30
  },
  img: {
    height: 500,
    width: 444,
    borderRadius: 8,
    marginBottom: 22,
    marginRight: 30,
    '& div': {
      height: 50,
      width: 147,
      backgroundColor: '#2E2E2E',
      color: '#ffffff',
      position: 'absolute',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      '& p': {
        color: '#ffffff',
        fontSize: '0.875rem',
        marginLeft: 14
      }
    }
  },

  created: {
    height: 223,
    width: 444,
    borderRadius: 8,
    backgroundColor: '#FBFBFB'
  },
  created_title: {
    height: 57,
    borderBottom: '1px solid #EEEEEE',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& p': {
      fontFamily: 'Roboto',
      fontWeight: 400,
      fontSize: '1rem',
      color: '#323232',
      '& span': {
        fontWeight: 500,
        fontSize: '1.125rem',
        color: '#000000',
        marginLeft: 7
      }
    }
  },

  created_text: {
    paddingRight: 27,
    paddingLeft: 27,
    '& p': {
      fontFamily: 'Roboto',
      fontWeight: 400,
      fontSize: '1rem',
      lineHeight: '1.75rem',
      color: '#000000',
      textAlign: 'justify'
    }
  },
  title: {
    marginTop: -16,
    marginBottom: 12,
    fontFamily: 'Roboto',
    fontWeight: 700,
    fontSize: '1.125rem',
    lineHeight: '1.1875rem'
  },
  subtitle: {
    width: 445,
    fontFamily: 'Roboto',
    fontWeight: 400,
    fontSize: '1rem',
    marginBottom: 17
  },
  owner: {
    height: 60,
    width: 445,
    borderRadius: 8,
    marginBottom: 30,
    backgroundColor: '#FBFBFB',
    '& p': {
      paddingLeft: 22,
      fontFamily: 'Roboto',
      fontWeight: 400,
      fontSize: '1rem',
      color: '#323232'
    },
    '& span': {
      fontWeight: 500,
      fontSize: '1.125rem',
      color: '#000000',
      marginLeft: 7
    }
  },
  buy: {
    height: 223,
    width: 445,
    paddingLeft: 23,
    borderRadius: 8,
    marginBottom: 30,
    backgroundColor: '#FBFBFB'
  },
  buy__cost: {
    marginTop: 16,
    fontFamily: 'Roboto',
    '& p': {
      fontWeight: 400,
      fontSize: '1rem',
      color: '#323232'
    },
    '& span': {
      fontWeight: 900,
      fontSize: '1.375rem',
      color: '#000000'
    }
  },
  buy__buttons: {
    display: 'flex',
    position: 'relative',

    '& button': {
      width: 175,
      height: 50,
      background: '#FBFBFB',
      border: '1px solid #ECECEC',
      borderRadius: 8,
      cursor: 'pointer',
      marginRight: 28
    }
  },
  icon: {
    position: 'absolute',
    top: '37%',
    left: '30px'
  },
  buy__now: {
    width: 378,
    height: 50,
    marginTop: 30,
    borderRadius: 4,
    backgroundColor: '#000000',
    border: '1px solid #000000',
    color: '#ffffff',
    fontSize: '1rem',
    fontFamily: 'Roboto',
    letterSpacing: '0.04em',
    cursor: 'pointer'
  },

  description: {
    height: 317,
    width: 445,
    borderRadius: 8,
    marginBottom: 30,

    backgroundColor: '#FBFBFB'
  },
  description__title: {
    height: 57,
    borderBottom: '1px solid #EEEEEE',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    '& p': {
      paddingLeft: 19,
      fontFamily: 'Roboto',
      fontWeight: 500,
      fontSize: '1.125rem',
      lineHeight: '1.1875rem',
      color: '#000000'
    }
  },
  description__text: {
    paddingRight: 27,
    paddingLeft: 27,
    // height:225,

    '& p': {
      fontFamily: 'Roboto',
      fontWeight: 400,
      fontSize: '1rem',
      lineHeight: '1.75rem',
      color: '#000000',
      textAlign: 'justify',
      letterSpacing: '0.04em'
    }
  },
  description__Scroll: {
    height: 317,
    width: 445,
    borderRadius: 8,
    marginBottom: 30,
    overflowY: 'scroll',
    backgroundColor: '#FBFBFB'
  }
})
