const Message = require('../../models').message;
const user = require('../../models').user;

module.exports = {
    getMessages: (conversationId) => {
        return Message.findAll({
            where: {
                "conversationId": conversationId
            },
            include :[
                {
                    model: user
                }
            ]
        });
    },

    createMessage: (message) => {
        return Message.create(message);
    }
};