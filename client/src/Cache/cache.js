import {CONVERSATION_QUERY, GET_CONVERSATION_QUERY} from "../components/conversation/queries";
import {GET_MESSAGE_QUERY} from "../components/message/queries";

function getExistingConversationFromCache (client) {
    let { getConversations } = client.readQuery({
        query: CONVERSATION_QUERY
    });
    return getConversations;
}

export function updateMessages(client, data) {
    let conversationId = data.messageAdded.conversationId;
    let queryData = client.readQuery({
        query: GET_MESSAGE_QUERY,
        variables: {
            conversationId,
            offset: parseInt(process.env.REACT_APP_MESSAGE_OFFSET),
            limit: parseInt(process.env.REACT_APP_MESSAGE_LIMIT)
        },
    });

    client.writeQuery({
        query: GET_MESSAGE_QUERY,
        variables: {
            conversationId,
            offset: parseInt(process.env.REACT_APP_MESSAGE_OFFSET),
            limit: parseInt(process.env.REACT_APP_MESSAGE_LIMIT)
        },
        data: {
            getMessages: [data.messageAdded, ...queryData.getMessages],
        },
    });
}

export function updateConversationMessages(client, data) {
    let getConversations = getExistingConversationFromCache(client);
    let index = getConversations.findIndex(conversation => conversation.id === data.messageAdded.conversationId);
    if(index === -1) {
        return false;
    }
    let updatedConversations = [...getConversations];
    updatedConversations[index].messages[0] = data.messageAdded;
    getConversations.push(getConversations[0]);
    client.writeQuery({
        query: CONVERSATION_QUERY,
        data: {
            getConversations: [...updatedConversations],
        },
    });
    return true;
}

function updateConversation(client, newConversation) {
    let getConversations = getExistingConversationFromCache(client);
    client.writeQuery({
        query: CONVERSATION_QUERY,
        data: {
            getConversations: [...getConversations, newConversation]
        }
    })

}

export function getConversationFromServer(client, conversationId) {
    client.query({
        query: GET_CONVERSATION_QUERY,
        variables: {
            id: conversationId
        }
    }).then(data => {
        updateConversation(client, data.data.getConversation);
    }).catch(error => {
        console.log(error);
    })
}
