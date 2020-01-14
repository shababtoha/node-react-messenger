import gql from "graphql-tag";

export const GET_MESSAGE_QUERY = gql`
    query GetMessages($conversationId: String!) {
        getMessages(conversationId: $conversationId) {
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

export const MESSAGE_SUBSCIPTION = gql`
    subscription messageAdded {
        id
        message
        conversationId
        user {
          username
          id
        }
    }  
`;