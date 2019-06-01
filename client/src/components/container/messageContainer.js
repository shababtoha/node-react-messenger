import React, { Component } from 'react';
import MessageContainerPresentational from '../presentational/messageContainer';
import Message from '../presentational/message';


function getM() {
    return  [
        {
            id: 1,
            author: 'apple',
            message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
            timestamp: new Date().getTime()
        },
        {
            id: 2,
            author: 'orange',
            message: 'It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!',
            timestamp: new Date().getTime()
        },
        {
            id: 3,
            author: 'orange',
            message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
            timestamp: new Date().getTime()
        },
        {
            id: 4,
            author: 'apple',
            message: 'It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!',
            timestamp: new Date().getTime()
        },
        {
            id: 5,
            author: 'apple',
            message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
            timestamp: new Date().getTime()
        },
        {
            id: 6,
            author: 'apple',
            message: 'It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!',
            timestamp: new Date().getTime()
        },
        {
            id: 7,
            author: 'orange',
            message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
            timestamp: new Date().getTime()
        },
        {
            id: 8,
            author: 'orange',
            message: 'It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!',
            timestamp: new Date().getTime()
        },
        {
            id: 9,
            author: 'apple',
            message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component',
            timestamp: new Date().getTime()
        },
        {
            id: 10,
            author: 'orange',
            message: 'It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!',
            timestamp: new Date().getTime()
        },
        {
            id: 9,
            author: 'orange',
            message: 'Microstrip patch antenna is a popular antenna widely used due to its compact size. They are used in a variety of fields. In this project, the antenna was designed for WLAN application, particularly in IEEE 802.11a standard. The target resonant frequency was selected to be 5.2 GHz. The antenna parameters were calculated after setting this frequency. The antenna was designed by the simulation software.  After a lot of simulations, the best possible values were chosen by trial-and-error method.',
            timestamp: new Date().getTime()
        },
    ];
}


class MessageContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            messages : null,
            author : 'apple',
        }
    }



    componentDidMount() {
        let messages = getM();
        let rendered = messages.map( (item,key) => {
            return <Message me={this.state.author === item.author} key={key}  text={item.message} />
        });

        this.setState({
            messages : rendered
        })
    }

    render() {
        return <MessageContainerPresentational  messages={this.state.messages} />
    }
}

export default MessageContainer;