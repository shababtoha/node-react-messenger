const Conversation = require('./data');
const {AuthenticationError} = require('apollo-server');

module.exports = {
    Query: {
        getConversations: (_, __, context) => {
            if (!context.id)
                throw new AuthenticationError("Authentication Credentials was not provided");
            return Conversation.getConversations(context.id);
        },
        getConversation: (_, {id}, context) => {
            if (!context.id)
                throw new AuthenticationError("Authentication Credentials was not provided");
            return Conversation.getConversation(id);
        }
    },
    Mutation: {
        createConversation: (_, {userIds, title}, context) => {
            if (!context.id)
                throw new AuthenticationError("Authentication Credentials was not provided");
            userIds.push(context.id);
            return Conversation.createConversation(userIds, title)
                .then(data => {
                    return Conversation.getConversation(data.conversationId);
                });
        }
    },
};
