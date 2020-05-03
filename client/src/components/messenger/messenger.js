import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { Query } from "react-apollo";
import { makeStyles } from '@material-ui/core/styles';
import Conversation from '../conversation';
import MessageContainer from '../message/messageContainer';
import { GET_ME_QUERY } from './queries';
import { UserProvider } from '../../contexts/UserContext';
import { NewConversationProvider } from '../../contexts/NewConversationContext';
import styles from './styles'

const useStyles = makeStyles(styles);

const Messenger  = props => {
    const classes = useStyles();
    const token = localStorage.getItem("authToken");
    if(!token) {
        return <Redirect to="/login" />;
    }
    return (
        <Query query={GET_ME_QUERY}>
            {({loading, error, data, subscribeToMore}) => {
                if (loading)    return null;
                if (error) {
                    console.log("GET ME ERROR "+ error);
                    return <Redirect to="/login" />;
                }
                const user = data.user;
                return (
                    <UserProvider value={user}>
                        <NewConversationProvider>
                            <div className={classes.container}>
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
                        </NewConversationProvider>
                    </UserProvider>
                )
            }}
        </Query>
    );
};

export default withRouter(Messenger);