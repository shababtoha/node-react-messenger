import React  from 'react';
import Toolbar from '../presentational/toolbar'
import PhoneIcon from '@material-ui/icons/Phone';
import VideoIcon from '@material-ui/icons/Videocam'
import TextField from "@material-ui/core/TextField/index";
import { withStyles } from '@material-ui/core/styles/index';
import { Mutation } from "react-apollo";
import { CREATE_MESSAGE_QUERY , GET_MESSAGE_QUERY } from './queries';



const styles = theme => ({
    inputDiv : {
        borderTop : "1px solid #bbbbbf",
        paddingLeft : 5,
        overflowWrap: "break-word",
        marginTop : "auto",
        height : 35,
        flex : "0 1",
    },
    messages : {
        flex : "1 1 auto",
        display : 'flex',
        flexDirection: 'column-reverse',
        overflowY : "scroll",
        paddingBottom : 10
    },
    container : {
        display : "flex",
        flexDirection : "column",
        height : '100vh',

    },
});


const messageContainer = (props) => {
    const {classes} = props;
    return (
        <div className={classes.container}>
            <Toolbar
                title={ "Conversation Title" }
                rightItems = {[
                    <VideoIcon color="primary" style={{ fontSize: 25 }}/>,
                    <PhoneIcon color="primary" style={{ fontSize : 25 }}/> ,
                ]}
            />
            <div className={classes.messages}>
                {props.messages}
                <div style={{ margin : "5px 5px"}} />
            </div>
            <div className={classes.inputDiv}>
                <Mutation mutation={CREATE_MESSAGE_QUERY}
                    update={(cache, { data : { createMessage } }) => {
                        const { getMessages } =  cache.readQuery({
                            query: GET_MESSAGE_QUERY,
                            variables : {
                                conversationId: props.conversationId
                            }
                        });
                        cache.writeQuery({
                            query: GET_MESSAGE_QUERY,
                            variables : {
                                conversationId: props.conversationId
                            },
                            data: {
                                getMessages: [createMessage].concat(getMessages)
                            }
                        })
                    }}
                >
                    {(sendMessage) => (
                         <form onSubmit={event => {
                            event.preventDefault();
                            sendMessage({
                                variables: {
                                    MessageInput: {
                                        message: props.value,
                                        conversationId: props.conversationId
                                    }
                                }
                            })
                        }} id="inputForm">
                            <input
                                id="newText"
                                placeholder="type to chat"
                                onKeyPress={props.onChange}
                            />
                        </form>
                        )}
                </Mutation>
            </div>
        </div>
    )
};

export default withStyles(styles)(messageContainer);