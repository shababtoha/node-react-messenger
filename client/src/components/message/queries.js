import gql from "graphql-tag";

export const GET_MESSAGE_QUERY = gql`
    query GetMessages($conversationId: String!, $offset: Int, $limit: Int) {
        getMessages(conversationId: $conversationId, offset: $offset, limit: $limit) {
            id  
            conversationId
            message
            user {
                id
                username
            }
        }
    }
`;

export const GET_CONVERSATION_QUERY = gql`
    query GetConversation($id: String!) {
        getConversation(id: $id) {
            title
            participants {
                id
                user {
                    id
                    username
                }
            }
        }
    }
`;

export const CREATE_MESSAGE_QUERY = gql`
    mutation CreateMessage($MessageInput: MessageInput!) {
        createMessage(message: $MessageInput) {
            id
            message
            conversationId
            user {
                username
                id
            }
        }
    }
`;
