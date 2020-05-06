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

export const CREATE_CONVERSATION_QUERY = gql`
    mutation CreateConversation($userIds: [String!]!, $title : String!,$MessageInput: MessageInput!) {
        createConversation(userIds: $userIds, title: $title, message: $MessageInput) {
            id
            title
            createdAt
            updatedAt
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
