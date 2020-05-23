const jwt = require('jsonwebtoken');
require("dotenv").config();
const secret = process.env.APP_SECRET;

const subscriptions = {
    onConnect: (connectionParams, webSocket) => {
        if(connectionParams.authToken) {
            const token = connectionParams.authToken;
            // console.log("\n\n\nNew Connection\n\n\n");
            try {
                return jwt.verify(token, secret);
            }catch (e) {
                console.log(e);
            }
        }
        throw new Error("Missing Auth Token");
    },
    onDisconnect: (webSocket, context) => {
       // console.log("disconnect");
    }
};

module.exports = subscriptions;