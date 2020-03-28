const Message = require('./data');
const Conversation = require('../conversation/data');
const {AuthenticationError, withFilter} = require('apollo-server');
const  User  = require('../user/data');
const {pubsub} = require('../../pubsub');
const MESSAGE_ADDED = 'MESSAGE_ADDED';

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
            return Message.createMessage(message).then(result => {
                const user = User.get(context.id);
                result.user = user;
                Conversation.getUsers(message.conversationId).then( users => {
                    pubsub.publish(MESSAGE_ADDED, { messageAdded: result, users });
                });
                return result;
            });
        }
    },

    Subscription: {
        messageAdded: {
            subscribe: withFilter(
                ()=> pubsub.asyncIterator(MESSAGE_ADDED),
                (payload, variables, context) => {
                    //console.log(context);
                    const user = payload.users.find( item => item.userId === context.id );
                    return !!user;
                }
            )
        }
    }
};

