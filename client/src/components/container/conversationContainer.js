import React, { Component } from 'react';
import ConversationContainerPresentational from '../presentational/conversationContainer'

class ConversationContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <ConversationContainerPresentational/>
    }
}

export default ConversationContainer;