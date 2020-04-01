import React from 'react';
import { Query } from "react-apollo";
import { makeStyles } from '@material-ui/core/styles';
import Conversation from '../conversation';
import MessageContainer from '../message/messageContainer';
import { GET_ME_QUERY } from './queries';
import { UserProvider } from '../../contexts/UserContext';
import styles from './styles'

const useStyles = makeStyles(styles);

const Messenger  = props => {
    const classes = useStyles();
    const token = localStorage.getItem("authToken");
    if(!token) {
        props.history.push('/login');
    }
    return (
        <Query query={GET_ME_QUERY}>
            {({loading, error, data, subscribeToMore}) => {
                if (loading)    return null;
                if (error) {
                    console.log("GET ME ERROR "+ error);
                    props.history.push('/login');
                }
                const user = data.user;
                return (
                    <UserProvider value={user}>
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
                    </UserProvider>
                )
            }}
        </Query>
    );
};

export default Messenger;