import React, { useState, useEffect } from 'react';
import { Query, withApollo } from 'react-apollo'
import { withRouter, Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Toolbar from './Toolbar';
import ConversationModal from './newConversationModal';
import ConversationComponent from './conversation';
import { MESSAGE_SUBSCRIPTION, CONVERSATION_QUERY } from './queries'
import {GET_MESSAGE_QUERY} from "../message/queries";
import { useDebounce } from '../../hooks/useDebounce';
import conversationIcon from '../../assets/conversation-icon.png';

//@TODO : Refactor this function
function updateConversation  (client, data) {
    let conversationId = data.messageAdded.conversationId;
    let queryData = client.readQuery({
        query : GET_MESSAGE_QUERY,
        variables: {
            conversationId,
            offset: 0,
            limit: 20
        }
    });

    client.writeQuery({
        query: GET_MESSAGE_QUERY,
        variables: {
            conversationId,
            offset: 0,
            limit: 20
        },
        data: {
            getMessages : [data.messageAdded,...queryData.getMessages]
        }
    });
}

const useStyles = makeStyles(theme => ({
    loader: {
        position: 'relative',
        top: '45%',
        left: '42%'
    },
    container: {
        display: "flex",
        flexDirection: "column",
        height: '100vh',
    },
    avatar: {
        width: 40,
        height: 40
    },
    conversationWrapper: {
        overflowY: 'scroll'
    }
}));

const Conversation = props => {
    const [conversationId, setConversationId] = useState(props.match.params.id);
    const [modalOpen, setModalOpen] = useState(false);
    const [searchText, setSearchText] = useState('');
    const debouncedText = useDebounce(searchText, 500);
    const classes = useStyles();

    useEffect(() => {
        // called only once after render
        let unsubscribe = props.subscribeToNewMessage({
            document: MESSAGE_SUBSCRIPTION,
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev;
                updateConversation(props.client, subscriptionData.data)
            }
        });

        // function to be called before unmounting
        return () => {
            unsubscribe();
        }
    }, []);

    useEffect(() => {
        console.log('---------', debouncedText);
    }, [debouncedText]);

    const changeConversation = conversationId => {
        props.history.push(`/message/${conversationId}`)
    };

    const changeModalOpenState = () => {
        setModalOpen(open => !open);
    };

    const addConversation = (client, newConversation) => {
        let {getConversations} = client.readQuery({
            query: CONVERSATION_QUERY
        });
        client.writeQuery({
            query: CONVERSATION_QUERY,
            data: {
                 getConversations: [newConversation.data.createConversation, ...getConversations]
            }
        });
        changeModalOpenState();
    };

    return (
        <>
            { modalOpen &&
                <ConversationModal
                    addConversation={addConversation}
                    onCancel={changeModalOpenState}
                />
            }
            <Query query={CONVERSATION_QUERY}>
                {({ loading, error, data }) => {
                    if(loading)
                        return <CircularProgress className={classes.loader} size={50} />;
                    if(error) {
                        console.log(error);
                        return  error.graphQLErrors.map(({ message }, i) => {
                            if (message === "Authentication Credentials was not provided") {
                                localStorage.removeItem("authToken");
                                return <Redirect to={`/login/${conversationId}`} />
                            } else {
                                return <p> error </p>
                            }
                        });
                    }
                    if(conversationId === undefined &&  data.getConversations && data.getConversations.length) {
                        setConversationId(data.getConversations[0].id);
                        return <Redirect to={`/message/${data.getConversations[0].id}`} />
                    }
                    return (
                        <div  className={classes.container}>
                            <Toolbar
                                handleAddButtonClick={changeModalOpenState}
                                searchText={searchText}
                                setSearchText={setSearchText}
                            />
                            <div className={classes.conversationWrapper}>
                                {
                                    data.getConversations.map((item, index) => (
                                        <ConversationComponent
											key={index}
                                            avatar={conversationIcon}
                                            title={item.title}
                                            text={ item.messages.length ? item.messages[0].message : "" }
                                            conversationId={item.id}
                                            onClick={changeConversation}
                                        />
                                    ))
                                }
                            </div>
                        </div>
                    );
                }}
            </Query>
        </>
    );
};

export default withApollo(withRouter(Conversation));