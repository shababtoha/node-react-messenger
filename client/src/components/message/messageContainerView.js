import React  from 'react';
import { Mutation } from "react-apollo";
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import TopBar from './TopBar';
import { CREATE_MESSAGE_QUERY } from './queries';

const useStyles = makeStyles(theme => ({
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
}));

function onMessageContainerDivScroll(loadMoreMessage) {
    let messageDiv = document.getElementById("messageContainer");
    if(messageDiv.scrollTop === 0) {
        loadMoreMessage();
    }
}

const MessageContainer = (props) => {
    const classes = useStyles();
    
    return (
        <div className={classes.container}>
            <TopBar
                title={props.title ? props.title : "Conversation Title"}
            />
            <div
                className={classes.messages}
                id="messageContainer"
                onScroll={()=> onMessageContainerDivScroll(props.onLoadMore)}
            >
                {props.messages}
                <div style={{ margin : "5px 5px"}} />
            </div>
            <div className={classes.inputDiv}>
                <Mutation mutation={CREATE_MESSAGE_QUERY}
                    update={(cache, { data : { createMessage } }) => {
                    }}
                >
                    {(sendMessage) => (
                        <TextField
                            id="newText"
                            multiline
                            rowsMax="4"
                            fullWidth
                            onKeyUp={e => {
                                const key = e.keyCode;
                                if(key === 13 && !e.shiftKey) {
                                    sendMessage({
                                        variables: {
                                            MessageInput: {
                                                message: props.value,
                                                conversationId: props.conversationId
                                            }
                                        }
                                    });
                                    e.target.value = "";
                                    props.onChange("");
                                } else {
                                    props.onChange(e.target.value);
                                }
                            }}
                        />
                        )}
                </Mutation>
            </div>
        </div>
    )
};

export default MessageContainer;