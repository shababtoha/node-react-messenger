const User = require('./src/user/resolvers');
const Conversation = require('./src/conversation/resolvers');
const { merge } = require("lodash");

const emptyResolver = {
     Query: {
          empty: ()=>{
               return "empty query";
          }
     },
     Mutation: {
          empty: ()=>{
               return "empty mutation"
          }
     }
};

module.exports = merge(
    emptyResolver,
    User,
    Conversation,
);