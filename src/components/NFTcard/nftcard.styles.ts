import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles({
  // root: {
  //   maxWidth: 810
  // },
  card:{
    height:378,
    width:310,

  },
  media: {
    height: 176,
    marginTop:30,
    marginLeft:27,
    marginRight:27,
   '& img':{
     width:'100%',
     height:'100%'
   }
  },
  price: {
    display: 'flex',
    justifyContent: 'flex-start',
    '& p':{
    



    }
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
