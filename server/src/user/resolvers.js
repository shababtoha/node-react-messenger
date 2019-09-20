const User = require('./data');
const { AuthenticationError } = require('apollo-server');

module.exports = {
    Query: {
        users: ()=>{
          return User.getAll();
        },
        user: (_,{id}, context) => {
            if(!context.id) {
                throw new AuthenticationError("User Credentials has not provided");
            }
            if(id === 'me') id =context.id;
            return User.get(id);
        },
        login: (_,{username, password})=>{
            return User.login(username, password);
        }
    },
    Mutation: {
        register: (_,{user})=>{
            return User.register(user);
        },

    }
};
