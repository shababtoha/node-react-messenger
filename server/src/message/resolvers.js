const Message = require('./data');
const { AuthenticationError } = require('apollo-server');

module.exports = {
    Query: {
        getMessages: (_,{conversationId}, context) => {
            if(!context.id)
                throw new AuthenticationError("User Credentials has not provided");
            return Message.getMessages(conversationId)
                .then(data=>{
                    console.log(data);
                    return data;
                })
        }
    },

};