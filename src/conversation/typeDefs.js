const {gql} = require('apollo-server');

const typeDefs = gql`
    extend type Query {
        getConversations: [Conversation]!
        getConversation(id: String!): Conversation
        checkExistingConversation(userIds: [String!]!): String
    }
    
     extend type Mutation {
        createConversation(userIds: [String!]!, title: String!, message: MessageInput!): Conversation!
    }
    
    type Conversation {
        id: String!
        title: String!
        createdAt: String!
        updatedAt: String!
        participants: [Participant]
        messages: [Message]
    }
    
    type Participant {
        id: String!
        user: User
    }
`;

module.exports = typeDefs;