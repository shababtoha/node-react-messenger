import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Message from '../container/message';


const styles =  theme => ({
    container : {
        display : 'flex',
        flexDirection : 'row',
        width : '100%',
        height : '100vh',
    },
    conversation : {
        minWidth : 350,
        borderRight : '1px solid #B0B3AF',
        overflowY: 'scroll',
        [theme.breakpoints.between('xs','sm')]: {
            minWidth: 240
        },
        [theme.breakpoints.down('xs')]: {
            display :'none'
        }
    },

    message : {
        width: '100%',
        overflowY : 'scroll',
    }


});


const messenger  = (props)=> {
    const {classes} = props;

    return (
        <div className={classes.container}>
            <div className={classes.conversation}>

            </div>
            <div className={classes.message}>
                <Message/>
            </div>
        </div>
    )
};

export default withStyles(styles)(messenger);