const conversation = require('../../models').conversation;
const participant = require('../../models').participant;
const user = require('../../models').user;

const Op = require("sequelize").Op;

module.exports = {
    getConversations : (id)=>{
        return participant.findAll({
            attributes: ['conversationId'],
            where: {
                userId: id
            },
        }).then(res=>{
            const ids = res.map(item=>item.dataValues.conversationId);
            console.log(ids);
            return conversation.findAll({
                where: {
                    id: {
                        [Op.in]: ids
                    }
                },
                include: [{
                    model: participant,
                    include: [
                        {
                            model: user
                        }
                    ]
                }]
            }).then(result=>{
                return result;
            })
        })
    }
};