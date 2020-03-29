import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles/index';
import MessageContainer from '../message/messageContainer';
import Conversation from '../conversation/conversation';
import { withRouter } from "react-router-dom";
import { styles } from './styles'
import { Query, Subscription } from "react-apollo";
import { GET_ME_QUERY } from './queries';
import { Redirect } from 'react-router-dom'
import {MESSAGE_SUBSCRIPTION} from "./queries";
import { ApolloConsumer } from 'react-apollo/lib/index';
import  {GET_MESSAGE_QUERY} from '../message/queries'

function  updateConversation  (client, data) {
    console.log("insubscriptions");
    let conversationId = data.messageAdded.conversationId;
    let queryData = client.readQuery({
        query : GET_MESSAGE_QUERY,
        variables: {
            conversationId,
            offset: 0,
            limit: 20
        }
    });

    client.writeQuery({
        query: GET_MESSAGE_QUERY,
        variables: {
            conversationId,
            offset: 0,
            limit: 20
        },
        data: {
            getMessages : [data.messageAdded,...queryData.getMessages]
        }
    });

}


const messenger  = (props)=> {
    const {classes} = props;
    const token = localStorage.getItem("authToken");
    // console.log(token);
    if(!token) {
        props.history.push('/login');
        return null;
    }
    return (
        <Fragment>
            <ApolloConsumer >
                { client =>
                    <Subscription subscription={MESSAGE_SUBSCRIPTION}>
                        {({data, loading }) => {
                            if(loading) console.log("loading");
                            if(data) {
                               updateConversation(client, data);
                            }
                            return "";
                        }}
                    </Subscription>
                }
            </ApolloConsumer>
            <Query query={GET_ME_QUERY}>
                {({loading, error, data}) => {
                    if(loading) return <p>loading</p>;
                    if(error) {
                        console.log("GET ME ERROR "+ error);
                        return <Redirect to="/login" />
                    }
                    const user = data.user;
                    return (
                        <div className={classes.container}>
                            {/*<div className={classes.toolbar}/>*/}
                            <div className={classes.messenger} >
                                <div className={classes.conversation}>
                                    <Conversation/>
                                </div>
                                <div className={classes.message}>
                                    <MessageContainer user={user} />
                                </div>
                            </div>
                        </div>
                    )
                }}
            </Query>
        </Fragment>
    )
};

export default withRouter(withStyles(styles)(messenger));