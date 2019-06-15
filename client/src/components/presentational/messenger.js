import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MessageContainer from '../container/messageContainer';
import ConversationContainer from '../container/conversationContainer';

const styles =  theme => ({
    container : {
        display : 'flex',
        flexDirection : 'column',
        width : '100%',
        height : '100vh',
    },
    conversation : {
        minWidth : 350,
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
    },
    toolbar : theme.mixins.toolbar
});

const messenger  = (props)=> {
    const {classes} = props;
    return (
        <div className={classes.container}>
            <div className={classes.toolbar}/>
            <div className={classes.messenger} >
                <div className={classes.conversation}>
                    <ConversationContainer/>
                </div>
                <div className={classes.message}>
                    <MessageContainer/>
                </div>
            </div>
        </div>
    )
};

export default withStyles(styles)(messenger);