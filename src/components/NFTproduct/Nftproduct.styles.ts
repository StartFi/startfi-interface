import { makeStyles } from '@material-ui/core/styles'


export const useStyles = makeStyles({
    container: {
        marginTop: 30,


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
                marginLeft: 14,

            }


        },




    },

    created: {
        height: 223,
        width: 444,
        borderRadius: 8,
        backgroundColor: '#FBFBFB',
        '& div': {
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
                    marginLeft: 7,
                }
            },






        }


    },
    title: {
        marginTop: -16,
        marginBottom: 12,
        fontFamily: 'Roboto',
        fontWeight: 700,
        fontSize: 18,
        lineHeight: '19px',
        // lineHeight:19,
    },
    subtitle: {
        width: 445,
        fontFamily: 'Roboto',
        fontWeight: 400,
        fontSize: 16,
        marginBottom: 17,

    },
    owner: {
        height: 60,
        width: 445,
        borderRadius: 8,
        marginBottom: 30,
        backgroundColor: '#FBFBFB'
    },
    buy: {
        height: 223,
        width: 445,
        borderRadius: 8,
        marginBottom: 30,
        backgroundColor: '#FBFBFB'

    },
    description: {
        height: 317,
        width: 445,
        borderRadius: 8,
        marginBottom: 30,
        backgroundColor: '#FBFBFB'

    }





})