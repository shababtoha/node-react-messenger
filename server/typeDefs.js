const user = require('./src/user/typeDefs');
const conversation = require('./src/conversation/typeDefs');
const { gql } = require('apollo-server');

const Query = gql`
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
];