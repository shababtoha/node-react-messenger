import React, { Component, Fragment } from 'react';
import ConversationView from './conversationView';
import ConversationComponent from '../presentational/conversation';
import { Query, withApollo } from "react-apollo";
import { CONVERSATION_QUERY } from './queries'
import { withRouter, Redirect } from "react-router-dom";
import ConversationModal from './newConversationModal';
import {GET_MESSAGE_QUERY} from "../message/queries";
import {MESSAGE_SUBSCRIPTION} from "./queries";

//@TODO : Refactor this function
function updateConversation  (client, data) {
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



class Conversation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: {

            },
            conversationId: props.match.params.id,
            newConversation: false
        };
        this.addConversation = this.addConversation.bind(this);
        this.conversationStateChange = this.conversationStateChange.bind(this);
        this.changeConversation = this.changeConversation.bind(this);
    }

    changeConversation(conversationId) {
        this.props.history.push('/message/'+conversationId);
    }

    conversationStateChange() {
        this.setState({
            newConversation: !this.state.newConversation
        })
    }

    addConversation(client, newConversation) {
        let {getConversations} = client.readQuery({
            query: CONVERSATION_QUERY
        });
        client.writeQuery({
            query: CONVERSATION_QUERY,
            data: {
                 getConversations: [newConversation.data.createConversation, ...getConversations]
            }
        });
        this.conversationStateChange();
    }

    componentDidMount() {
        //subscribing for new message
        let unsubscribeMessage = this.props.subscribeToNewMessage({
            document: MESSAGE_SUBSCRIPTION,
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev;
                updateConversation(this.props.client, subscriptionData.data)
            }
        });
        this.setState({
            unsubscribeMessage
        })
    }

    componentWillUnmount() {
        //un-subscribing the subscription
        if(this.state.unsubscribeMessage) {
            this.state.unsubscribeMessage();
        }
    }

    render() {
        return (
            <Fragment>
                { this.state.newConversation &&
                    <ConversationModal
                        addConversation={this.addConversation}
                        onCancel={this.conversationStateChange}
                    />
                }
                <Query query={CONVERSATION_QUERY}>
                {({ loading, error, data }) => {
                    if(loading) return <div> loading </div>;
                    if(error) {
                        console.log(error);
                        return  error.graphQLErrors.map(({ message }, i) => {
                            if (message === "Authentication Credentials was not provided") {
                                localStorage.removeItem("authToken");
                                //this.props.history.push('/login');
                                return <Redirect to={'/login'+this.state.conversationId } />
                            } else {
                                return <p> error </p>
                            }
                        });
                    }
                    if(this.state.conversationId === undefined &&  data.getConversations && data.getConversations.length > 0) {
                        this.state.conversationId =  data.getConversations[0].id;
                        //this.props.history.push('/message/'+  this.state.conversationId);
                        return <Redirect to={'/message/'+this.state.conversationId } />
                    }
                    const conversation = data.getConversations.map((item,key)=>{
                        return <ConversationComponent
                            key={key}
                            avatar="http://maestroselectronics.com/wp-content/uploads/bfi_thumb/blank-user-355ba8nijgtrgca9vdzuv4.jpg"
                            title={item.title}
                            text={ item.messages.length > 0 ?
                                    item.messages[0].message : ""
                            }
                            conversationId={item.id}
                            onClick={this.changeConversation}
                        />
                    });
                    return (
                        <ConversationView
                            conversation={conversation}
                            addConversationButtonClick={this.conversationStateChange}
                        />
                    );
                }}
                </Query>
            </Fragment>
        )
    }
}

export default withApollo(withRouter(Conversation));