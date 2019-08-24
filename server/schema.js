const {
    GraphQLObjectType,
    GraphQLSchema
} = require('graphql');
const users = require('./src/user/data');

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        ...users
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});