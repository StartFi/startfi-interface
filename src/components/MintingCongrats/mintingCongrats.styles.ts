import { makeStyles } from '@material-ui/core/styles'


export const useStyles = makeStyles({
    container:{
        textAlign:'center',
        fontFamily: 'Roboto',
        letterSpacing:'0.04em',

    },
    header:{
        textTransform:'uppercase',
        fontWeight: 900,
        fontSize: '2.25rem',

        color:'#000000'
    },
    text:{
        fontWeight: 400,
        fontSize: '1rem',
        lineHeight:1.7,
        '& span':{
            fontWeight: 500,
            fontSize: '1.125rem',
            borderBottom:"1.5px solid #000000",
        }
    }
})