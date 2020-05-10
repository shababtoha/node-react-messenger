const jwt = require('jsonwebtoken');
const secret = "holyHera";
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
const subscriptions = require('./subscriptions');
const express = require('express');
const path = require("path");
const app = express();

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

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', (req, res) => {
    console.log("getting");
    res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

server.applyMiddleware({ app });


app.listen({ port: process.env.PORT || 4000 }).then(({ url,  subscriptionsUrl }) => {
   console.log(`🚀 Server ready at ${url}`);
   console.log(`🚀 Subscriptions ready at ${subscriptionsUrl}`)
});