import styled from 'styled-components'
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

export const Container = styled.div`
  padding: 4vh 3.2vw;
  width: 100%;
  display: flex;
  flex-direction: column;
`
export const Grid = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 130px;
`

export const LeftGrid = styled.div`
  width: 50%;
`

export const RightGrid = styled.div`
  width: 50%;
`
export const ImgCard = styled.div`
  width: 444px;
  height: 500px;
  margin-top: 30px;
  position: relative;
  border-radius: 8px;

  & img {
    width: 100%;
    height: 100%;
    position: absolute;
  }

  & p {
    height: 50px;
    width: 147px;
    background-color: #2e2e2e;
    color: #ffffff;
    position: absolute;
    top: -16px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

export const LeftTextCard = styled.div`
  height: 223px;
  width: 444px;
  margin-top: 20px;
  border-radius: 8px;
  background-color: #fbfbfb;
`

export const CreatedTitle = styled.div`
  height: 57px;
  border-bottom: 1px solid #eeeeee;
  display: flex;
  align-items: center;
  justify-content: center;
  & p {
    font-family: Roboto;
    font-weight: 400;
    font-size: 1rem;
    color: #323232;

    & span {
      font-weight: 500;
      font-size: 1.125rem;
      color: #000000;
      margin-left: 7px;
    }
  }
`

export const CreatedText = styled.div`
  padding-right: 27px;
  padding-left: 27px;
  & p {
    font-family: Roboto;
    font-weight: 400;
    font-size: 1rem;
    line-height: 1.75rem;
    color: #000000;
    text-align: justify;
  }
`

export const RightTitle = styled.div`
  margin-top: 30px;
  margin-bottom: 12px;
  font-family: Roboto;
  font-weight: 700;
  font-size: 1.125rem;
  line-height: 1.1875rem;
`

export const RightSubTitle = styled.div`
  width: 445px;
  font-family: Roboto;
  font-weight: 400;
  font-size: 1rem;
  margin-bottom: 17px;
`

export const PublisherCard = styled('div')<{height?:string}>`
  height:${({ height }) => height};
  width: 445px;
  border-radius: 8px;
  margin-bottom: 30px;
  background-color: #fbfbfb;
  display:flex;
  align-items:center;
  & p {
    padding-left: 22px;
    font-family: Roboto;
    font-weight: 400;
    font-size: 1rem;
    color: #323232;
    & span {
      font-weight: 500;
      font-size: 1.125rem;
      color: #000000;
      margin-left: 7px;
    }
  }
`
