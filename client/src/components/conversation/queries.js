import gql from "graphql-tag";

export const CONVERSATION_QUERY = gql`
    query {
        getConversations {
            id
            title
            createdAt
            updatedAt
        }
    }
`;