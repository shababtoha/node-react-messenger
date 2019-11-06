const { gql } = require('apollo-server');

const  typeDefs = gql`
    extend type Query {
        getMessages(conversationId: String!): [Message]!
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
    }
    
    input MessageInput {
        message: String
        conversationId: String!
        attachment_url: String
    }
`;

module.exports = typeDefs;