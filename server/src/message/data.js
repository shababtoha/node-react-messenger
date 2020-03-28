const Message = require('../../models').message;
const user = require('../../models').user;

module.exports = {
    getMessages: (conversationId, offset, limit) => {
        return Message.findAll({
            where: {
                "conversationId": conversationId
            },
            order: [
                ['createdAt','DESC']
            ],
            include :[
                {
                    model: user
                }
            ],
            offset,
            limit
        });
    },

    createMessage: (message) => {
        return Message.create(message);
    }
};