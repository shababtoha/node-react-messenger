import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Query } from "react-apollo";
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import MessageContainerView from './messageContainerView';
import MessageComponent from '../presentational/message';
import {
    GET_MESSAGE_QUERY,
    GET_CONVERSATION_QUERY,
}  from './queries'

const useStyles = makeStyles(theme => ({
    loader: {
        position: 'relative',
        top: '45%',
        left: '43%'
    }
}));

const RenderMessage = (props) => {
    return (
        <Query
            query={GET_MESSAGE_QUERY}
            variables={{
                conversationId: props.conversationId,
                offset: 0,
                limit: 20
            }}
        >
            {({loading, error, data, fetchMore}) => {
                if(loading) return null;
                if(error)   return <p>error</p>;
                const messages = data.getMessages.map((item, key)=>{
                    return <MessageComponent
                        me={item.user.username === props.username}
                        text={item.message}
                        key={item.id}
                    />
                });
                return <MessageContainerView
                        messages={messages}
                        onChange={props.handleInputChange}
                        value={props.value}
                        conversationId={props.conversationId }
                        title={props.title}
                        onLoadMore={() => fetchMore({
                            variables: {
                                offset: data.getMessages.length
                            },
                            updateQuery: (prev, { fetchMoreResult }) => {
                                if (!fetchMoreResult) return prev;
                                return Object.assign({}, prev, {
                                    getMessages: [...prev.getMessages, ...fetchMoreResult.getMessages]
                                });
                            }
                        })}
                    />
            }}
        </Query>
    )
};


const MessageContainer = props => {
    const [message, setMessage] = useState('');
    const conversationId = props.match.params.id;
    const classes = useStyles();

    return (
        !conversationId ? null : (
            <Query query={GET_CONVERSATION_QUERY} variables={{ id: conversationId }} >
                {({loading, error, data}) => {
                    if(loading)
                        return <CircularProgress className={classes.loader} size={80} />;
                    if(error) {
                        return <p> error </p>
                    }
                    return <RenderMessage
                        title={data.getConversation.title}
                        conversationId={conversationId}
                        username={props.user.username}
                        handleInputChange={v => setMessage(v)}
                        value={message}
                    />
                }}
            </Query>
        )
    );

};

export default withRouter(MessageContainer);