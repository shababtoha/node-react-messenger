const jwt = require('jsonwebtoken');
const secret = "holyHera";

const subscriptions = {
    onConnect: (connectionParams, webSocket) => {
        if(connectionParams.authToken) {
            const token = connectionParams.token;
            console.log("\n\n\nNew Connection\n\n\n");
            return jwt.verify(token, secret);
        }
        throw new Error("Missing Auth Token");
    },
    onDisconnect: (webSocket, context) => {
       // console.log("disconnect");
    }
};

module.exports = subscriptions;