import React, { Component, Fragment } from 'react';
import ConversationView from './conversationView';
import ConversationComponent from '../presentational/conversation';
import { Query } from "react-apollo";
import { CONVERSATION_QUERY } from './queries'
import { withRouter } from "react-router-dom";
import { Redirect } from 'react-router-dom'
import ConversationModal from './newConversationModal';



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
        console.log(newConversation);
    }

    render() {
        console.log( typeof this.state.conversationId);
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
                    console.log(data.getConversations);
                    const conversation = data.getConversations.map((item,key)=>{
                        return <ConversationComponent
                            key={key}
                            avatar="http://maestroselectronics.com/wp-content/uploads/bfi_thumb/blank-user-355ba8nijgtrgca9vdzuv4.jpg"
                            title={item.title}
                            text={ item.messages.length > 0 ?
                                    item.messages[0].message : ""
                            }
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

export default withRouter(Conversation);