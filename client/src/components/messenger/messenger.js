import React from 'react';
import { withStyles } from '@material-ui/core/styles/index';
import MessageContainer from '../container/messageContainer';
import Conversation from '../conversation/conversation';
import { withRouter } from "react-router-dom";
import { styles } from './styles'

const messenger  = (props)=> {
    const {classes} = props;
    const token = localStorage.getItem("authToken");
    console.log(token);
    if(!token) {
        props.history.push('/login');
        return null;
    }
    return (
        <div className={classes.container}>
            {/*<div className={classes.toolbar}/>*/}
            <div className={classes.messenger} >
                <div className={classes.conversation}>
                    <Conversation/>
                </div>
                <div className={classes.message}>
                    <MessageContainer/>
                </div>
            </div>
        </div>
    )
};

export default withRouter(withStyles(styles)(messenger));