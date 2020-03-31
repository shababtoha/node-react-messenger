import React from 'react';
import { withStyles } from '@material-ui/core/styles/index';
import MessageContainer from '../message/messageContainer';
import Conversation from '../conversation/conversation';
import { withRouter } from "react-router-dom";
import { styles } from './styles'
import { Query } from "react-apollo";
import { GET_ME_QUERY } from './queries';
import { Redirect } from 'react-router-dom'
import { UserProvider } from '../../contexts/UserContext';

const messenger  = (props)=> {
    const {classes} = props;
    const token = localStorage.getItem("authToken");
    if(!token) {
        props.history.push('/login');
        return null;
    }
    return (
        <Query query={GET_ME_QUERY}>
            {({loading, error, data, subscribeToMore}) => {
                if(loading) return <p>loading</p>;
                if(error) {
                    console.log("GET ME ERROR "+ error);
                    return <Redirect to="/login" />
                }
                const user = data.user;
                return (
                    <UserProvider value={user}>
                        <div className={classes.container}>
                            {/*<div className={classes.toolbar}/>*/}
                            <div className={classes.messenger} >
                                <div className={classes.conversation}>
                                    <Conversation
                                        subscribeToNewMessage={subscribeToMore}
                                    />
                                </div>
                                <div className={classes.message}>
                                    <MessageContainer user={user} />
                                </div>
                            </div>
                        </div>
                    </UserProvider>
                )
            }}
        </Query>

    )
};

export default withRouter(withStyles(styles)(messenger));