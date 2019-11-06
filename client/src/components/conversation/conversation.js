import React, { Component } from 'react';
import ConversationView from './conversationView';
import ConversationComponent from '../presentational/conversation';
import { Query } from "react-apollo";
import { CONVERSATION_QUERY } from './queries'
import { withRouter } from "react-router-dom";


class Conversation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            conversation : [],
        };
    }

    // componentDidMount() {
    //     // fetch("https://randomuser.me/api/?results=20")
    //     //     .then(res=>res.json())
    //     //     .then(
    //     //         (result)=>{
    //     //             this.setState({
    //     //                 conversation : result.results
    //     //             })
    //     //         },
    //     //         (error)=>{
    //     //             console.log(error);
    //     //          }
    //     //     )
    // }
    //
    // render() {
    //     const conversation = this.state.conversation.map((item,key)=>{
    //         return <ConversationComponent
    //             key={key}
    //             avatar={item.picture.large}
    //             title={item.name.first+" "+item.name.last}
    //             text={ 'Hello world! This is a long message that needs to be truncated.' }
    //         />
    //     });
    //     return (
    //         <ConversationView
    //             conversation={conversation} />
    //     )
    // }

    render() {
        return (
            <Query query={CONVERSATION_QUERY}>
            {({ loading, error, data }) => {
                if(loading) return <div> loading </div>;
                if(error) {
                    console.log(error);
                    return <div>error</div>;
                }
                //console.log(data);
                const conversation = data.getConversations.map((item,key)=>{
                    return <ConversationComponent
                        key={key}
                        avatar="http://maestroselectronics.com/wp-content/uploads/bfi_thumb/blank-user-355ba8nijgtrgca9vdzuv4.jpg"
                        title={item.title}
                        text={ 'Hello world! This is a long message that needs to be truncated.' }
                    />
                });
                return (
                    <ConversationView conversation={conversation} />
                );
            }}
            </Query>
        )
    }
}

export default withRouter(Conversation);