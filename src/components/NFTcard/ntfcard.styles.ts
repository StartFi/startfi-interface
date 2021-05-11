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
    action:{
      display: 'flex',
      margin:0,
      padding:0,

    },
    whiteList:{
      display: 'flex',
      alignItems:'center',
      backgroundColor:'#EDEDED',
      boxSizing:'border-box'
    },
    icon:{
        position:'relative',
        left:29

    }
  })
