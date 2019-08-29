const { gql } = require('apollo-server');

const typeDefs = gql`
    extend type Query {
        users: [User]!
        user(id: String!): User
        login(username: String!, password: String!): Token! 
    }
      
    type User {
        id: String!
        username: String!
        name: String!
        email: String!
        phone: String
        image_url: String
        createdAt: String!
        updatedAt: String!
    }
    
    extend type Mutation {
        register(user: UserInput!): Token!
    }
    
    input UserInput {
        username: String!
        password: String!
        name: String!
        email: String!
        phone: String
        image_url: String
    }
    
    type Token {
        token: String
    }
`;

module.exports = typeDefs;