const styles = theme => ({
    container : {
        display : 'flex',
        flexDirection : 'column',
        width : '100%',
        height : '100vh',
    },
    conversation : {
        minWidth : 400,
        width: '40%',
        borderRight : '1px solid #B0B3AF',
        overflow: 'hidden',
        height : '100%',
        [theme.breakpoints.between('xs','sm')]: {
            minWidth: 240
        },
        [theme.breakpoints.down('xs')]: {
            display :'none'
        }
    },
    messenger: {
        display : 'flex',
        flexDirection: "row",
        flex : 1
    },
    message : {
        width: '100%',
        overflow : 'hidden',
        height : '100%',
    }
});

export default styles;