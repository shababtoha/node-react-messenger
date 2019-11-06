const Message = require('./data');
const {AuthenticationError} = require('apollo-server');

module.exports = {
    Query: {
        getMessages: (_, {conversationId}, context) => {
            if (!context.id)
                throw new AuthenticationError("User Credentials has not provided");
            return Message.getMessages(conversationId);
        }
    },
    Mutation: {
        createMessage: (_, {message}, context) => {
            if (!context.id)
                throw new AuthenticationError("User Credentials has not provided");
            message.sentBy = context.id;
            return Message.createMessage(message);
        }
    }
};