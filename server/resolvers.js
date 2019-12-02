const User = require('./src/user/resolvers');
const Conversation = require('./src/conversation/resolvers');
const Message = require('./src/message/resolvers');
const { merge } = require("lodash");
const { pubsub } = require('./pubsub');
const MESSAGE_ADDED = 'MESSAGE_ADDED';
const { withFilter } = require('apollo-server');

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
     },
};


module.exports = merge(
    emptyResolver,
    User,
    Conversation,
    Message,
);