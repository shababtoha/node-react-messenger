const Conversation = require('./data');
const {AuthenticationError} = require('apollo-server');
const {publishMessage} = require('../message/messageService');

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
            return Conversation.getConversation(id, context.id);
        },

        checkExistingConversation: (_, {userIds}, context) => {
            if (!context.id)
                throw new AuthenticationError("Authentication Credentials was not provided");
            userIds.push(context.id);
            return Conversation.getExistingConversation(userIds)
                .then(conversationIds => {
                    if(conversationIds.length === 0) {
                        return null
                    } else {
                        return  conversationIds[0].conversationId;
                    }
                })
        }
    },
    Mutation: {
        createConversation: (_, {userIds, title, message}, context) => {
            if (!context.id)
                throw new AuthenticationError("Authentication Credentials was not provided");
            userIds.push(context.id);
            message.sentBy = context.id;
            return Conversation.createConversation(userIds, title, message)
                .then(data => {
                    publishMessage(data);
                    return Conversation.getConversation(data.conversationId, context.id);
                });
        }
    },
};
