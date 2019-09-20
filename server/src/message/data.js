const Message = require('../../models').message;
const User = require('../../models').user;

module.exports = {
    getMessages: (conversationId) => {
        return Message.findAll({
            where: {
                "conversationId": conversationId
            }
        });
    }
};