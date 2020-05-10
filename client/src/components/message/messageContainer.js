import React, { useState, useContext } from "react";
import { withRouter } from "react-router-dom";
import { Query } from "react-apollo";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import MessageContainerView from "./messageContainerView";
import MessageComponent from "../presentational/message";
import { ConversationContext } from "../../contexts/ConversationContext";
import { GET_MESSAGE_QUERY } from "./queries";

const useStyles = makeStyles((theme) => ({
    loader: {
        position: "relative",
        top: "45%",
        left: "43%",
    },
}));

const MessageContainer = (props) => {
    const [message, setMessage] = useState("");
    const id = props.match.params.id;
    const { title } = useContext(ConversationContext);
    const classes = useStyles();

    //load more message on scroll up. fetchMore is a callback function
    const loadMoreMessage = (fetchMore, data) => {
        fetchMore({
            variables: {
                offset: data.getMessages.length,
            },
            updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prev;
                return Object.assign({}, prev, {
                    getMessages: [
                        ...prev.getMessages,
                        ...fetchMoreResult.getMessages,
                    ],
                });
            },
        })
    };

    return (
        !id ? null :
        <Query
            query={GET_MESSAGE_QUERY}
            variables={{
                conversationId: id,
                offset: parseInt(process.env.REACT_APP_MESSAGE_OFFSET),
                limit: parseInt(process.env.REACT_APP_MESSAGE_LIMIT),
            }}
        >
            {({ loading, data, error, fetchMore }) => {
                if (loading)
                    return <CircularProgress className={classes.loader} />;
                const messages = error
                    ? []
                    : data.getMessages.map(({ id, message, user }) => {
                          return (
                              <MessageComponent
                                  key={id}
                                  text={message}
                                  me={user.username === props.user.username}
                              />
                          );
                      });
                return (
                    <MessageContainerView
                        messages={messages}
                        onChange={(v) => setMessage(v)}
                        value={message}
                        conversationId={id}
                        title={title ? title : ""}
                        onLoadMore={() => loadMoreMessage(fetchMore, data) }
                    />
                );
            }}
        </Query>
    );
};

export default withRouter(MessageContainer);
