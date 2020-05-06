const Conversation = require('../../models').conversation;
const Participant = require('../../models').participant;
const User = require('../../models').user;
const Message = require('../../models').message;
const Sequelize = require('../../models').sequelize;
const { QueryTypes, Op } = require('sequelize');
const {createMessage} = require('../message/data');

const conversationQueryCondition = (userId) => {
    return {
            include: [
                {
                    model: Participant,
                    where: {
                        userId
                    }
                },
                {
                    model: Message,
                    where: {
                        [Op.and]: Sequelize.literal(
                            '"messages"."createdAt" = ( SELECT MAX("createdAt") FROM "messages" ' +
                            'WHERE "conversation".id = "messages"."conversationId") '
                        )
                    },
                    include: [
                        {
                            model: User
                        }
                    ],
                }
            ],
            order: [
                [Sequelize.col('messages.createdAt'), 'DESC']
            ]
    }
};

module.exports = {
    getConversations: (userId) => {
        return Conversation.findAll(conversationQueryCondition(userId))
    },

    getConversation: (conversationId, userId) => {
        return Conversation.findByPk(conversationId, conversationQueryCondition(userId));
    },

    createConversation: (userIds, title, message) => {
        return Sequelize.transaction(t => {
            return Conversation.create({title}, {transaction: t})
                .then(conversation => {
                    let newParticipants = userIds.map(userId => {
                        return {'conversationId': conversation.id, 'userId': userId}
                    });
                    return Participant.bulkCreate(newParticipants, {
                        transaction: t,
                    }).then( ()=>{
                        message.conversationId = conversation.id;
                        return Message.create(message, {
                            transaction: t
                        }).then( message => {
                            return message.dataValues;
                        });
                    });
                });
        });
    },

    getExistingConversation: (userIds) => {
        return Sequelize.query(
            'SELECT "conversationId" FROM participants A ' +
            'WHERE "userId" in (:userIds) '+
            'group by "conversationId" ' +
            'having count("conversationId") = :userCount ' +
            'AND ( '+
            '   SELECT count(*) FROM participants B WHERE A."conversationId" = B."conversationId" '+
            ') =  :userCount'
            ,
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