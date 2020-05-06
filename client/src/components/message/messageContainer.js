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

    return (
        <Query
            query={GET_MESSAGE_QUERY}
            variables={{
                conversationId: id,
                offset: 0,
                limit: 20,
            }}
        >
            {({ loading, data, fetchMore }) => {
                if (loading)
                    return <CircularProgress className={classes.loader} />;
                const messages = data
                    ? data.getMessages.map(({ id, message, user }) => {
                          return (
                              <MessageComponent
                                  key={id}
                                  text={message}
                                  me={user.username === props.user.username}
                              />
                          );
                      })
                    : [];
                return (
                    <MessageContainerView
                        messages={messages}
                        onChange={(v) => setMessage(v)}
                        value={message}
                        conversationId={id}
                        title={title ? title : ""}
                        onLoadMore={() =>
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
                        }
                    />
                );
            }}
        </Query>
    );
};

export default withRouter(MessageContainer);
