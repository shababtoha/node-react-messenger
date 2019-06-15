import React, { Component } from 'react';
import ConversationContainerPresentational from '../presentational/conversationContainer';
import Conversation from '../presentational/conversation';


class ConversationContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            conversation : [],
        };
    }

    componentDidMount() {
        fetch("https://randomuser.me/api/?results=20")
            .then(res=>res.json())
            .then(
                (result)=>{
                    this.setState({
                        conversation : result.results
                    })
                },
                (error)=>{
                    console.log(error);
                 }
            )
    }

    render() {
        const conversation = this.state.conversation.map((item,key)=>{
            return <Conversation
                key={key}
                avatar={item.picture.large}
                title={item.name.first+" "+item.name.last}
                text={ 'Hello world! This is a long message that needs to be truncated.' }
            />
        });
        return <ConversationContainerPresentational conversation={conversation} />
    }
}

export default ConversationContainer;