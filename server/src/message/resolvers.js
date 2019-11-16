const Message = require('./data');
const {AuthenticationError} = require('apollo-server');
const  User  = require('../user/data');

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
            //console.log(message);
            return Message.createMessage(message).then(result => {
                const user = User.get(context.id);
                result.user = user;
                return result;
            });
        }
    }
};