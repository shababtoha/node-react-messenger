const user = require('./src/user/typeDefs');
const conversation = require('./src/conversation/typeDefs');
const message = require('./src/message/typedefs');
const { gql } = require('apollo-server');

const Query = gql`
    type Subscription {
        messageAdded: Message
    }    

    type Query {
        empty: String!
    }
    
    type Mutation {
        empty: String!
    }
`;


module.exports = [
    Query,
    user,
    conversation,
    message,
];