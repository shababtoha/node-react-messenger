const Conversation = require('../../models').conversation;
const Participant = require('../../models').participant;
const User = require('../../models').user;
const Message = require('../../models').message;
const Sequelize = require('../../models').sequelize;
const { QueryTypes } = require('sequelize');

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

    getConversation: (conversationId) => {
        return Conversation.findByPk(conversationId, {
            include: [{
                model: Participant,
                include: [
                    {
                        model: User
                    }
                ]
            }]
        });
    },

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

    getExistingConversation: (userIds) => {
        return Sequelize.query(
            'SELECT "conversationId" FROM participants ' +
            'WHERE "userId" in (:userIds) '+
            'group by "conversationId" ' +
            'having count("conversationId") = :userCount',
            {
                replacements: { userIds: userIds, userCount: userIds.length },
                type: QueryTypes.SELECT
            }
        );
    },

    //TODO : need to move it from here.
    getUsers: (conversationId) => {
        return Participant.findAll({
            attributes: ['userId'],
            where: {
                conversationId
            }
        });
    }
};