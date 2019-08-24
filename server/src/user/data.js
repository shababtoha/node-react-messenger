const {
    GraphQLList,
    GraphQLString
} = require('graphql');
const { UserType } = require('./types') ;
const UserQueries = require('./queries');

module.exports = {
    users: {
        type: new GraphQLList(UserType),
        resolve(parent, args) {
            return UserQueries.getAll();
        }
    },
    user: {
        type: UserType,
        args: {
          id: { type: GraphQLString }
        },
        resolve(parent, args) {
            return UserQueries.get(args.id);
        }
    }
};