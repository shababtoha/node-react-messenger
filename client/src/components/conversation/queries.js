import gql from "graphql-tag";

export const CONVERSATION_QUERY = gql`
    query {
        getConversations {
            id
            title
            createdAt
            updatedAt
            messages {
                id
                message
                conversationId
                createdAt
                user {
                    username
                    id
                }
            }
        }
    }
`;

export const GET_USERS_QUERY = gql`
    query Users($username: String!) {
        users(username: $username) {
            id
            username
            email
        }
    }
`;

export const CHECK_EXISTING_CONVERSATION_QUERY = gql`
    query CheckExistingConversation($userIds: [String!]!) {
        checkExistingConversation(userIds: $userIds)
    }
`

export const CREATE_CONVERSATION_QUERY = gql`
    mutation CreateConversation($userIds: [String!]!, $title : String!) {
        createConversation(userIds: $userIds, title: $title) {
            id
            title
            createdAt
            updatedAt
        }
    }
`;

export const MESSAGE_SUBSCRIPTION = gql`
    subscription {
        messageAdded {
            id
            message
            conversationId
            createdAt
            user {
                username
                id
            }
        }
    }
`;