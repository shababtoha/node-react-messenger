const {pubsub} = require('../../pubsub');
const Conversation = require('../conversation/data');
const MESSAGE_ADDED = 'MESSAGE_ADDED';

function publishMessage(message) {
    Conversation.getUsers(message.conversationId).then( users => {
        pubsub.publish(MESSAGE_ADDED, { messageAdded: message, users });
    });
}

module.exports = { publishMessage };