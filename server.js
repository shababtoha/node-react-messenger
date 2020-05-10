const jwt = require('jsonwebtoken');
const secret = "holyHera";
const { ApolloServer } = require('apollo-server');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
const subscriptions = require('./subscriptions');
const exress = require('express');
const path = require("path");
const app = exress();

const context = function({ req, connection  }){
    if(connection) {
       // console.log( "Connection" +   JSON.stringify(connection));
        //console.log(connection.context);
        return connection.context;
    } else {
        const token = req.headers.token;
        try {
            return jwt.verify(token, secret);
        } catch (e) {
            return {id: null}
        }
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
    subscriptions,
    context
});

app.use(exress.static("public"));

app.get("*", (req, res) => {
    res.sendFile(__dirname, "public", "index.html");
});


server.listen().then(({ url,  subscriptionsUrl }) => {
   console.log(`🚀 Server ready at ${url}`);
   console.log(`🚀 Subscriptions ready at ${subscriptionsUrl}`)
});