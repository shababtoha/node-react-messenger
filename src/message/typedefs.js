const { gql } = require('apollo-server');

const  typeDefs = gql` 
    scalar Date
    
    extend type Query {
        getMessages(conversationId: String!, offset: Int, limit: Int): [Message]!
    }
    
    extend type Mutation {
        createMessage(message: MessageInput!): Message!
    }
     
    type Message {
        id: String!
        message: String
        conversationId: String!
        attachment_url: String
        user: User
        createdAt: Date!
    }
    
    input MessageInput {
        message: String
        conversationId: String
        attachment_url: String
    }
`;

module.exports = typeDefs;