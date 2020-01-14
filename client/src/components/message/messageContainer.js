import React, { Component } from 'react';
import MessageContainerView from './messageContainerView';
import MessageComponent from '../presentational/message';
import { withRouter } from "react-router-dom";
import { Query, Mutation, Subscription } from "react-apollo";
import {
    GET_MESSAGE_QUERY,
    GET_CONVERSATION_QUERY,
    MESSAGE_SUBSCIPTION
}  from './queries'

const RenderMessage = (props) => {
    return (
        <Query query={GET_MESSAGE_QUERY} variables={{ conversationId: props.conversationId }}>
            {({loading, error, data}) => {
                if(loading) return <p>loading</p>;
                if(error) {
                    return <p>error</p>
                }
                const messages = data.getMessages.map((item, key)=>{
                    return <MessageComponent
                        me={item.user.username === props.username}
                        text={item.message}
                        key={item.id}
                    />
                });
                return <MessageContainerView
                        title={props.title}
                        messages={messages}
                        onChange={props.handleInputChange}
                        value={props.value}
                        conversationId={props.conversationId }
                        title={props.title}
                    />
            }}
        </Query>
    )
};


class MessageContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user,
            message: "",
        };
        console.log(props);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(value) {
            this.setState({
                message: value,
            });
    }

    render() {
        const conversationId = this.props.match.params.id;
        if(!conversationId) return null;
        return (
            <Query query={GET_CONVERSATION_QUERY} variables={{ id: conversationId }} >
                {({loading, error, data}) => {
                    if(loading) return <p> loading </p>;
                    if(error) {
                        return <p> error </p>
                    }
                    return <RenderMessage
                        title={data.getConversation.title}
                        conversationId={conversationId}
                        username={this.state.user.username}
                        handleInputChange={this.handleInputChange}
                        value={this.state.message}
                    />
                }}
            </Query>
        )
    }
}

export default withRouter(MessageContainer);