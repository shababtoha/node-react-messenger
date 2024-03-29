import React, { useContext } from "react";
import { Mutation, withApollo } from "react-apollo";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import TopBar from "./TopBar";
import { CREATE_CONVERSATION_QUERY, CREATE_MESSAGE_QUERY } from "./queries";
import { NewConversationContext } from "../../contexts/NewConversationContext";
import history from "../../history";

const useStyles = makeStyles((theme) => ({
    inputDiv: {
        borderTop: "1px solid #bbbbbf",
        paddingLeft: 5,
        overflowWrap: "break-word",
        marginTop: "auto",
        height: 35,
        flex: "0 1",
    },
    messages: {
        flex: "1 1 auto",
        display: "flex",
        flexDirection: "column-reverse",
        overflowY: "scroll",
        paddingBottom: 10,
    },
    container: {
        display: "flex",
        flexDirection: "column",
        height: "100vh",
    },
}));

function onMessageContainerDivScroll(loadMoreMessage) {
    let messageDiv = document.getElementById("messageContainer");
    if (messageDiv.scrollTop === 0) {
        loadMoreMessage();
    }
}

const MessageContainer = (props) => {
    const { conversationId, title, value, onChange, client } = props;
    const { users, removeNewConversation } = useContext(NewConversationContext);
    const classes = useStyles();


    const handleEnterKeyPress = (event, createMessage) => {
        const key = event.keyCode;
        if (key === 13 && !event.shiftKey) {
            if (conversationId === "new") {
               createConversation();
            } else {
                sendMessage(conversationId, value, createMessage);
            }
            event.target.value = "";
            onChange("");
        } else {
            onChange(event.target.value);
        }

    };

    const createConversation = () => {
        client
            .mutate({
                mutation: CREATE_CONVERSATION_QUERY,
                variables: {
                    userIds: JSON.parse(users),
                    title,
                    MessageInput: {
                        message: value
                    },
                },
            })
            .then(({ data }) => {
                removeNewConversation();
                data.createConversation.messages = [];
                history.push(`/message/${data.createConversation.id}`);
            });
    };

    const sendMessage = (conversationId, value, createMessage) => {
        createMessage({
            variables: {
                MessageInput: {
                    message: value,
                    conversationId: conversationId,
                },
            },
        });
    };

    return (
        <div className={classes.container}>
            <TopBar title={title ? title : "Messages"} />
            <div
                className={classes.messages}
                id="messageContainer"
                onScroll={() => onMessageContainerDivScroll(props.onLoadMore)}
            >
                {props.messages}
                <div style={{ margin: "5px 5px" }} />
            </div>
            <div className={classes.inputDiv}>
                <Mutation
                    mutation={CREATE_MESSAGE_QUERY}
                    update={(cache, { data: { createMessage } }) => {}}
                >
                    {(createMessage) => (
                        <TextField
                            id="newText"
                            multiline
                            rowsMax="4"
                            fullWidth
                            onKeyUp={(e) => handleEnterKeyPress(e, createMessage)}
                        />
                    )}
                </Mutation>
            </div>
        </div>
    );
};

export default withApollo(MessageContainer);
