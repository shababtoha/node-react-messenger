const Conversation = require('../../models').conversation;
const Participant = require('../../models').participant;
const User = require('../../models').user;
const Message = require('../../models').message;
const Sequelize = require('../../models').sequelize;

const Op = require("sequelize").Op;

function getConversation(id) {
    return Conversation.findByPk(id, {
        include: [{
            model: Participant,
            include: [
                {
                    model: User
                }
            ]
        }]
    });
}

module.exports = {
    getConversations: (userId) => {
        return Conversation.findAll({
            include: [
                {
                    model: Participant,
                    where: {
                        userId
                    }
                },
                {
                    model: Message,
                    limit: 1,
                    include: [
                        {
                            model: User
                        }
                    ],
                    order: [
                        ['createdAt', 'DESC']
                    ]
                }
            ]
        })
    },

    getConversation,

    createConversation: (userIds, title) => {
        return Sequelize.transaction(t => {
            return Conversation.create({title}, {transaction: t})
                .then(conversation => {
                    let newParticipants = userIds.map(userId => {
                        return {'conversationId': conversation.id, 'userId': userId}
                    });
                    return Participant.bulkCreate(newParticipants, {
                        transaction: t,
                    }).then( ()=>{
                        return { conversationId: conversation.id};
                    });
                });
        });
    },

    getUsers: (conversationId) => {
        return Participant.findAll({
            attributes: ['userId'],
            where: {
                conversationId
            }
        });
    }
};