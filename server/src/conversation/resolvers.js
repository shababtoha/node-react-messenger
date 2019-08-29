const Conversation = require('./data');
const {AuthenticationError} = require('apollo-server');

module.exports = {
    Query: {
        getConversations: (_,__,context)=>{
            if(!context.id)
                throw new AuthenticationError("Authentication Credentials was not provided");
            console.log(context.id);
            return Conversation.getConversations(context.id);
        },
    },
};
