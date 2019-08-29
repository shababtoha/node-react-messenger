const {gql} = require('apollo-server');

const typeDefs = gql`
    extend type Query {
        getConversations: [Conversation]
    }
    
    type Conversation {
        id: String!
        title: String!
        createdAt: String!
        updatedAt: String!
        participants: [Participant]
    }
    
    type Participant {
        id: String!
        user: User
    }
`;

module.exports = typeDefs;