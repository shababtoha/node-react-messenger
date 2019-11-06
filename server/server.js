const jwt = require('jsonwebtoken');
const secret = "holyHera";
const { ApolloServer } = require('apollo-server');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

const context = function({req}){
    const token = req.headers.token;
    console.log( new Date() + " Token :"+ token );
    try {
       return jwt.verify(token, secret);
    } catch (e) {
       return {id: null}
    }
};

const server = new ApolloServer({
   typeDefs,
   resolvers,
   context
});

server.listen().then(({ url }) => {
   console.log(`🚀 Server ready at ${url}`);
});