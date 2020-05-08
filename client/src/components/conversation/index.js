import React, { useContext, useState, useEffect } from "react";
import { Query, withApollo } from "react-apollo";
import { withRouter, Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Toolbar from "./Toolbar";
import ConversationDialog from "./ConversationDialog";
import ConversationComponent from "./Conversation";
import { MESSAGE_SUBSCRIPTION, CONVERSATION_QUERY } from "./queries";
import { useDebounce } from "../../hooks/useDebounce";
import { ConversationContext } from "../../contexts/ConversationContext";
import { NewConversationContext } from "../../contexts/NewConversationContext";
import conversationIcon from "../../assets/conversation-icon.png";
import {
    getConversationFromServer,
    updateConversationMessages,
    updateMessages,
} from "../../Cache/cache";

const useStyles = makeStyles((theme) => ({
    loader: {
        position: "relative",
        top: "45%",
        left: "42%",
    },
    container: {
        display: "flex",
        flexDirection: "column",
        height: "100vh",
    },
    avatar: {
        width: 40,
        height: 40,
    },
    conversationWrapper: {
        overflowY: "scroll",
    },
}));

const Conversation = (props) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [searchText, setSearchText] = useState("");
    const debouncedText = useDebounce(searchText, 500);
    const { setConversation, changeConversation } = useContext(
        ConversationContext
    );
    const { title, setNewConversation, removeNewConversation } = useContext(
        NewConversationContext
    );
    const classes = useStyles();


    useEffect(() => {
        // called only once after render
        let unsubscribe = props.subscribeToNewMessage({
            document: MESSAGE_SUBSCRIPTION,
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev;
                let isUpdated = updateConversationMessages(
                    props.client,
                    subscriptionData.data
                );
                if (!isUpdated) {
                    getConversationFromServer(
                        props.client,
                        subscriptionData.data.messageAdded.conversationId
                    );
                } else {
                    updateMessages(props.client, subscriptionData.data);
                }
            },
        });

        // function to be called before unmounting
        return () => {
            unsubscribe();
        };
    }, []);

    useEffect(() => {}, [debouncedText]);

    const changeModalOpenState = () => {
        setModalOpen((open) => !open);
    };

    const sortConversation = (conversationList) => {
        conversationList.getConversations.sort((a, b) => {
            if (!a.messages.length && !b.messages.length) return 0;
            if (!a.messages.length) return -1;
            if (!b.messages.length) return 1;
            if (b.messages[0].createdAt > a.messages[0].createdAt) return 1;
            else return -1;
        });
    };

    return (
        <>
            {modalOpen && (
                <ConversationDialog
                    open={modalOpen}
                    onClose={changeModalOpenState}
                    addConversation={setNewConversation}
                />
            )}
            <Query query={CONVERSATION_QUERY}>
                {({ loading, error, data }) => {
                    if (loading)
                        return (
                            <CircularProgress
                                className={classes.loader}
                                size={50}
                            />
                        );
                    if (error) {
                        console.log(error);
                        return error.graphQLErrors.map(({ message }, i) => {
                            if (
                                message ===
                                "Authentication Credentials was not provided"
                            ) {
                                localStorage.removeItem("authToken");
                                return <Redirect to="/login" />;
                            } else {
                                return <p> error </p>;
                            }
                        });
                    }
                    if (
                        props.match.params.id === undefined &&
                        data.getConversations &&
                        data.getConversations.length
                    ) {
                        const { id, title } = data.getConversations[0];
                        setConversation(id, title);
                        return <Redirect to={`/message/${id}`} />;
                    }
                    sortConversation(data);
                    return (
                        <div className={classes.container}>
                            <Toolbar
                                handleAddButtonClick={changeModalOpenState}
                                searchText={searchText}
                                setSearchText={setSearchText}
                            />
                            <div className={classes.conversationWrapper}>
                                <ConversationComponent
                                    key={0}
                                    avatar={conversationIcon}
                                    title={title}
                                    text=""
                                    conversationId="new"
                                    onDelete={removeNewConversation}
                                    changeConversation={changeConversation}
                                />
                                {data.getConversations.map((item, index) => (
                                    <ConversationComponent
                                        key={index + 1}
                                        avatar={conversationIcon}
                                        title={item.title}
                                        text={
                                            item.messages.length
                                                ? item.messages[0].message
                                                : ""
                                        }
                                        conversationId={item.id}
                                        changeConversation={changeConversation}
                                    />
                                ))}
                            </div>
                        </div>
                    );
                }}
            </Query>
        </>
    );
};

export default withApollo(withRouter(Conversation));
